require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// DB connection
require('./config/db');

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: '✅ Backend is connected and running!' });
});

module.exports = app;
