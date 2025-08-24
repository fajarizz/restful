const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const userMiddleware = require('../middlewares/user-middleware');

// Register User
router.post('/register', userMiddleware.validateRegister, userController.registerUser);

// Login User
router.post('/login', userMiddleware.validateLogin, userController.loginUser);

// Update User
router.put('/:id', userMiddleware.validateUpdate, userController.updateUser);

// Get User
router.get('/:id', userController.getUser);

// Logout User
router.post('/logout', userController.logoutUser);

module.exports = router;
