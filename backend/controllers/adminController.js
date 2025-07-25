const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM admin_users WHERE email = $1', [email]);

    if (result.rows.length === 0)
      return res.status(400).json({ message: 'Invalid credentials.' });

    const admin = result.rows[0];

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign(
      { admin_id: admin.admin_id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, admin: { name: admin.name, email: admin.email, role: admin.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.createAdmin = async (req, res) => {
  const { admin_id, email: requesterEmail } = req.admin;

  try {
    const result = await pool.query('SELECT role FROM admin_users WHERE admin_id = $1', [admin_id]);
    const requester = result.rows[0];

    if (!requester || requester.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access denied: only super admins can create admins.' });
    }

    const { name, email, password } = req.body;

    // Check for existing user
    const exists = await pool.query('SELECT * FROM admin_users WHERE email = $1', [email]);
    if (exists.rows.length > 0) {
      return res.status(400).json({ message: 'Admin with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO admin_users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)',
      [name, email, hashedPassword, 'admin']
    );

    res.status(201).json({ message: 'New admin created successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};




// Enhanced Admin Dashboard Stats API
exports.getAdminStats = async (req, res) => {
  try {
    // Main stats query
    const statsResult = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM jobs) AS total_jobs,
        (SELECT COUNT(*) FROM job_applications) AS total_applications,
        (SELECT COUNT(*) FROM employer_requests) AS total_requests,
        (SELECT COUNT(*) FROM contact_messages) AS total_messages,
        (SELECT MAX(posting_date) FROM jobs) AS last_job_posted,
        (SELECT COUNT(*) FROM admin_users WHERE role = 'admin') AS total_admins,
        (SELECT COUNT(*) FROM admin_users WHERE role = 'super_admin') AS total_super_admins
    `);

    // Recent activity query (last 24 hours)
    const recentActivityResult = await pool.query(`
      SELECT 
        'application' as type,
        full_name as name,
        'New job application received' as description,
        submitted_at as timestamp
      FROM job_applications 
      WHERE submitted_at >= NOW() - INTERVAL '24 HOURS'
      
      UNION ALL
      
      SELECT 
        'request' as type,
        company_name as name,
        'Staff request submitted' as description,
        submitted_at as timestamp
      FROM employer_requests 
      WHERE submitted_at >= NOW() - INTERVAL '24 HOURS'
      
      UNION ALL
      
      SELECT 
        'job' as type,
        title as name,
        'New job posting published' as description,
        posting_date::timestamp as timestamp
      FROM jobs 
      WHERE posting_date >= CURRENT_DATE - INTERVAL '7 DAYS'
      
      UNION ALL
      
      SELECT 
        'message' as type,
        name as name,
        'New contact message received' as description,
        submitted_at as timestamp
      FROM contact_messages 
      WHERE submitted_at >= NOW() - INTERVAL '24 HOURS'
      
      ORDER BY timestamp DESC
      LIMIT 10
    `);

    // Monthly growth statistics
    const growthResult = await pool.query(`
      SELECT 
        -- Jobs growth
        (SELECT COUNT(*) FROM jobs WHERE posting_date >= DATE_TRUNC('month', CURRENT_DATE)) AS jobs_this_month,
        (SELECT COUNT(*) FROM jobs WHERE posting_date >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') 
         AND posting_date < DATE_TRUNC('month', CURRENT_DATE)) AS jobs_last_month,
        
        -- Applications growth
        (SELECT COUNT(*) FROM job_applications WHERE submitted_at >= DATE_TRUNC('month', CURRENT_DATE)) AS applications_this_month,
        (SELECT COUNT(*) FROM job_applications WHERE submitted_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') 
         AND submitted_at < DATE_TRUNC('month', CURRENT_DATE)) AS applications_last_month,
        
        -- Requests growth
        (SELECT COUNT(*) FROM employer_requests WHERE submitted_at >= DATE_TRUNC('month', CURRENT_DATE)) AS requests_this_month,
        (SELECT COUNT(*) FROM employer_requests WHERE submitted_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') 
         AND submitted_at < DATE_TRUNC('month', CURRENT_DATE)) AS requests_last_month,
        
        -- Messages growth
        (SELECT COUNT(*) FROM contact_messages WHERE submitted_at >= DATE_TRUNC('month', CURRENT_DATE)) AS messages_this_month,
        (SELECT COUNT(*) FROM contact_messages WHERE submitted_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') 
         AND submitted_at < DATE_TRUNC('month', CURRENT_DATE)) AS messages_last_month
    `);

    // Job type distribution
    const jobTypesResult = await pool.query(`
      SELECT 
        job_type,
        COUNT(*) as count
      FROM jobs 
      GROUP BY job_type
      ORDER BY count DESC
    `);

    // Application status by job
    const applicationStatsResult = await pool.query(`
      SELECT 
        j.title,
        COUNT(ja.application_id) as application_count
      FROM jobs j
      LEFT JOIN job_applications ja ON j.job_id = ja.job_id
      GROUP BY j.job_id, j.title
      ORDER BY application_count DESC
      LIMIT 5
    `);

    // Calculate growth percentages
    const mainStats = statsResult.rows[0];
    const growthStats = growthResult.rows[0];
    
    const calculateGrowth = (current, previous) => {
      if (!previous || previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    const jobsGrowth = calculateGrowth(
      parseInt(growthStats.jobs_this_month), 
      parseInt(growthStats.jobs_last_month)
    );
    
    const applicationsGrowth = calculateGrowth(
      parseInt(growthStats.applications_this_month), 
      parseInt(growthStats.applications_last_month)
    );
    
    const requestsGrowth = calculateGrowth(
      parseInt(growthStats.requests_this_month), 
      parseInt(growthStats.requests_last_month)
    );

    const messagesGrowth = calculateGrowth(
      parseInt(growthStats.messages_this_month), 
      parseInt(growthStats.messages_last_month)
    );

    // Format the response
    const response = {
      // Main statistics
      total_jobs: parseInt(mainStats.total_jobs),
      total_applications: parseInt(mainStats.total_applications),
      total_requests: parseInt(mainStats.total_requests),
      total_messages: parseInt(mainStats.total_messages),
      total_admins: parseInt(mainStats.total_admins),
      total_super_admins: parseInt(mainStats.total_super_admins),
      last_job_posted: mainStats.last_job_posted,
      
      // Growth statistics
      growth: {
        jobs: jobsGrowth,
        applications: applicationsGrowth,
        requests: requestsGrowth,
        messages: messagesGrowth
      },
      
      // Monthly data for detailed comparison
      monthly_stats: {
        jobs: {
          current: parseInt(growthStats.jobs_this_month),
          previous: parseInt(growthStats.jobs_last_month)
        },
        applications: {
          current: parseInt(growthStats.applications_this_month),
          previous: parseInt(growthStats.applications_last_month)
        },
        requests: {
          current: parseInt(growthStats.requests_this_month),
          previous: parseInt(growthStats.requests_last_month)
        },
        messages: {
          current: parseInt(growthStats.messages_this_month),
          previous: parseInt(growthStats.messages_last_month)
        }
      },
      
      // Recent activity
      recent_activity: recentActivityResult.rows.map(activity => ({
        type: activity.type,
        name: activity.name,
        description: activity.description,
        timestamp: activity.timestamp,
        timeAgo: getTimeAgo(activity.timestamp)
      })),
      
      // Additional insights
      job_types_distribution: jobTypesResult.rows,
      top_applications_by_job: applicationStatsResult.rows
    };

    res.status(200).json(response);
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Helper function to calculate time ago
function getTimeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInMs = now - past;
  
  const minutes = Math.floor(diffInMs / (1000 * 60));
  const hours = Math.floor(diffInMs / (1000 * 60 * 60));
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// Optional: Additional endpoint for detailed analytics
exports.getDetailedAnalytics = async (req, res) => {
  try {
    // Weekly trends
    const weeklyTrends = await pool.query(`
      SELECT 
        DATE_TRUNC('week', submitted_at) as week,
        COUNT(*) as applications_count
      FROM job_applications 
      WHERE submitted_at >= CURRENT_DATE - INTERVAL '8 weeks'
      GROUP BY week
      ORDER BY week
    `);

    // Popular job locations
    const popularLocations = await pool.query(`
      SELECT 
        location,
        COUNT(*) as job_count,
        COUNT(ja.application_id) as total_applications
      FROM jobs j
      LEFT JOIN job_applications ja ON j.job_id = ja.job_id
      WHERE location IS NOT NULL
      GROUP BY location
      ORDER BY job_count DESC
      LIMIT 10
    `);

    res.status(200).json({
      weekly_trends: weeklyTrends.rows,
      popular_locations: popularLocations.rows
    });
  } catch (err) {
    console.error('Error fetching detailed analytics:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};