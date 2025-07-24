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
