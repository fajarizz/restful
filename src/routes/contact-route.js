const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact-controller');
const contactMiddleware = require('../middlewares/contact-middleware');

// Create Contact
router.post('/', contactMiddleware.validateCreate, contactController.createContact);

// Get Contact by ID
router.get('/:id', contactController.getContact);

// Update Contact
router.put('/:id', contactMiddleware.validateUpdate, contactController.updateContact);

// Delete Contact
router.delete('/:id', contactController.deleteContact);

// List Contacts
router.get('/', contactController.listContacts);

module.exports = router;

