const db = require('../config/db');
const fs = require('fs');
const path = require('path');



const submitApplication = async (req, res) => {
  try {
    const { job_id, full_name, email, phone, cover_letter } = req.body;
    const cvFile = req.file;

    if (!cvFile) {
      return res.status(400).json({ message: 'CV is required' });
    }

    // ✅ Check for duplicate application
    const existing = await db.query(
      'SELECT * FROM job_applications WHERE job_id = $1 AND email = $2',
      [job_id, email]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'You have already applied for this job with this email.' });
    }

    // ✅ Insert new application
    await db.query(
      `INSERT INTO job_applications (job_id, full_name, email, phone, message, cv_url)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [job_id, full_name, email, phone, cover_letter, cvFile.filename]
    );

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    console.error('Error submitting application:', err);
    res.status(500).json({ message: 'Server error while submitting application' });
  }
};



const checkDuplicateApplication = async (req, res) => {
  const { job_id, email } = req.body;

  try {
    const existing = await db.query(
      'SELECT 1 FROM job_applications WHERE job_id = $1 AND email = $2',
      [job_id, email]
    );

    if (existing.rows.length > 0) {
      return res.status(200).json({ alreadyApplied: true });
    }

    return res.status(200).json({ alreadyApplied: false });
  } catch (err) {
    console.error('Error checking duplicate:', err);
    res.status(500).json({ message: 'Internal error' });
  }
};


const getApplicationsByJobId = async (req, res) => {
  const { jobId } = req.params;

  try {
    const result = await db.query(
      `SELECT application_id, full_name, email, phone, submitted_at, cv_url 
       FROM job_applications 
       WHERE job_id = $1 
       ORDER BY submitted_at DESC`,
      [jobId]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const deleteApplication = async (req, res) => {
  const applicationId = req.params.id;

  try {
    // First get the application and its CV filename
    const result = await db.query(
      'SELECT cv_url FROM job_applications WHERE application_id = $1',
      [applicationId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const cvUrl = result.rows[0].cv_url;
    const cvFilename = path.basename(cvUrl); // Extract filename only

    // Delete file from disk
    const cvPath = path.join(__dirname, '..', 'uploads', cvFilename);

    if (fs.existsSync(cvPath)) {
      fs.unlinkSync(cvPath); // delete file
    }

    // Delete the application from DB
    await db.query('DELETE FROM job_applications WHERE application_id = $1', [applicationId]);

    res.status(200).json({ message: 'Application and CV deleted successfully' });

  } catch (err) {
    console.error('Error deleting application:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { submitApplication ,checkDuplicateApplication, getApplicationsByJobId , deleteApplication};
