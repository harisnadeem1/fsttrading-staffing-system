const express = require('express');
const router = express.Router();
const { submitContactForm ,getAllContacts,getContactById,deleteContact} = require('../controllers/contactController');

router.post('/', submitContactForm);

router.get('/', getAllContacts);           // GET /api/contact
router.get('/:id', getContactById);        // GET /api/contact/:id  
router.delete('/:id', deleteContact);      // DELETE /api/contact/:id

module.exports = router;
