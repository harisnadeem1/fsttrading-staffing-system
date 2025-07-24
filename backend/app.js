const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const path = require('path');
const requestRoutes = require('./routes/requestRoutes');
const contactRoutes = require('./routes/contactRoutes');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // serve files
app.use('/api/applications', applicationRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/contact', contactRoutes);

module.exports = app;
