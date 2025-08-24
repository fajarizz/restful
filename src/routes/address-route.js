const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address-controller');
const addressMiddleware = require('../middlewares/address-middleware');

// Create Address
router.post('/', addressMiddleware.validateCreate, addressController.createAddress);

// Get Address by ID
router.get('/:id', addressController.getAddress);

// Update Address
router.put('/:id', addressMiddleware.validateUpdate, addressController.updateAddress);

// Delete Address
router.delete('/:id', addressController.deleteAddress);

// List Addresses
router.get('/', addressController.listAddresses);

module.exports = router;

