const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { submitApplication ,checkDuplicateApplication} = require('../controllers/applicationController');

router.post('/', upload.single('cv'), submitApplication);
router.post('/check-duplicate', checkDuplicateApplication);
module.exports = router;
