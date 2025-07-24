const express = require('express');
const router = express.Router();
const { submitRequest ,getAllRequests,getRequestById,deleteEmployerRequest} = require('../controllers/requestController');

router.post('/', submitRequest);

router.get('/', getAllRequests);            // GET all requests
router.get('/:id', getRequestById); 
router.delete('/:id', deleteEmployerRequest);
module.exports = router;
