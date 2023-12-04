const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// User routes
router.post('/', UserController.createUser);

module.exports = router;
