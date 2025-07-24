const pool = require('../config/db');

exports.submitRequest = async (req, res) => {
  const {
    companyName,
    contactName,
    email,
    phone,
    serviceNeeded,
    typeOfWorkers,
    duration,
    notes
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO employer_requests (
        company_name, contact_name, email, phone,
        service_needed, worker_type, duration, additional_notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        companyName,
        contactName,
        email,
        phone,
        serviceNeeded,
        typeOfWorkers,      // maps to `worker_type`
        duration,
        notes               // maps to `additional_notes`
      ]
    );

    res.status(201).json({
      message: 'Request submitted successfully',
      request: result.rows[0]
    });
  } catch (err) {
    console.error('Error inserting request:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.getAllRequests = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        request_id,
        company_name,
        contact_name,
        email,
        phone,
        service_needed,
        worker_type,
        duration,
        additional_notes,
        submitted_at
      FROM employer_requests
      ORDER BY submitted_at DESC
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching employer requests:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET single request by ID
exports.getRequestById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM employer_requests WHERE request_id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching single request:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.deleteEmployerRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM employer_requests WHERE request_id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json({ message: 'Request deleted successfully', deleted: result.rows[0] });
  } catch (err) {
    console.error('Error deleting request:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};