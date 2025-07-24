const express = require('express');
const router = express.Router();
const { adminLogin, createAdmin } = require('../controllers/adminController');
const verifyAdminToken = require('../middleware/auth');

router.post('/login', adminLogin);

router.post('/create', verifyAdminToken, createAdmin);

module.exports = router;
