const pool = require('../config/db');

const createApplication = async ({
  job_id,
  full_name,
  email,
  phone,
  cover_letter,
  cv_path,
}) => {
  const query = `
    INSERT INTO job_applications (job_id, full_name, email, phone, message, cv_url)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
  `;
  const values = [job_id, full_name, email, phone, cover_letter, cv_path];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = { createApplication };
