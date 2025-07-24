const express = require('express');
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobsWithApplicationCounts
} = require('../controllers/jobController');

router.get('/with-applications', getJobsWithApplicationCounts);

// Public
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// Protected routes (you can later wrap with verifyAdminToken middleware)
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;
