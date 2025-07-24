const db = require('../config/db');

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

module.exports = { submitApplication ,checkDuplicateApplication};
