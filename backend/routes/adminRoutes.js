const express = require('express');
const router = express.Router();
const { adminLogin, createAdmin ,getAdminStats} = require('../controllers/adminController');
const verifyAdminToken = require('../middleware/auth');

router.post('/login', adminLogin);

router.post('/create', verifyAdminToken, createAdmin);

router.get('/stats', verifyAdminToken, getAdminStats); // secure stats

module.exports = router;
