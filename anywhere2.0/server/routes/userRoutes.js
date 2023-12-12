const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// User routes
router.post('/signup', UserController.createUser);
router.post('/login', UserController.loginUser); // Add a login route

module.exports = router;
