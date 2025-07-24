const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { submitApplication ,checkDuplicateApplication,getApplicationsByJobId,deleteApplication} = require('../controllers/applicationController');

router.post('/', upload.single('cv'), submitApplication);
router.post('/check-duplicate', checkDuplicateApplication);
router.get('/job/:jobId', getApplicationsByJobId);
router.delete('/:id', deleteApplication);
module.exports = router;
