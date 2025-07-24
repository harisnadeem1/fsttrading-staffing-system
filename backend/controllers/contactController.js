const pool = require('../config/db');

exports.submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    await pool.query(
      `INSERT INTO contact_messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4)`,
      [name, email, subject, message]
    );
    res.status(201).json({ message: 'Message submitted successfully.' });
  } catch (err) {
    console.error('Error saving contact message:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};




// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM contact_messages ORDER BY submitted_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get contact by ID
exports.getContactById = async (req, res) => {
    console.log("--------------------");
    console.log(req.params);
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM contact_messages WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching contact:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete contact
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM contact_messages WHERE id = $1', [id]);
    res.json({ message: 'Contact message deleted successfully' });
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
