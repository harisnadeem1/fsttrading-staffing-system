const pool = require('../config/db');

// GET /api/jobs
exports.getAllJobs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs ORDER BY posting_date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};

// GET /api/jobs/:id
exports.getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM jobs WHERE job_id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Job not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch job' });
  }
};

// POST /api/jobs
exports.createJob = async (req, res) => {
  const {
    title,
    location,
    job_type,
    description,
    responsibilities,
    qualifications,
    posting_date,
    application_deadline,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO jobs (title, location, job_type, description, responsibilities, qualifications, posting_date, application_deadline)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        title,
        location,
        job_type,
        description,
        responsibilities,
        qualifications,
        posting_date,
        application_deadline,
      ]
    );

    res.status(201).json({ message: 'Job created successfully', job: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create job' });
  }
};

// PUT /api/jobs/:id
exports.updateJob = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    location,
    job_type,
    description,
    responsibilities,
    qualifications,
    posting_date,
    application_deadline,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE jobs
       SET title = $1,
           location = $2,
           job_type = $3,
           description = $4,
           responsibilities = $5,
           qualifications = $6,
           posting_date = $7,
           application_deadline = $8
       WHERE job_id = $9
       RETURNING *`,
      [
        title,
        location,
        job_type,
        description,
        responsibilities,
        qualifications,
        posting_date,
        application_deadline,
        id,
      ]
    );

    if (result.rows.length === 0) return res.status(404).json({ message: 'Job not found' });

    res.json({ message: 'Job updated successfully', job: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update job' });
  }
};



exports.deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM jobs WHERE job_id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete job' });
  }
};


exports.getJobsWithApplicationCounts = async (req, res) => {
  console.log("before query");
  try {
    const result = await pool.query(`
      SELECT 
        j.job_id,
        j.title,
        j.location,
        j.job_type,
        j.posting_date,
        COUNT(a.application_id) AS application_count
      FROM jobs j
      LEFT JOIN job_applications a ON j.job_id = a.job_id
      GROUP BY j.job_id
      ORDER BY j.posting_date DESC;
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching jobs with applications:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
