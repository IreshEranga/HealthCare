const express = require('express');
const LoginController = require('../controllers/LoginController');

// Initialize the router
const router = express.Router();

// Define routes
router.post("/logIn", LoginController.loginUser);

// Export the router to use it in your main app
module.exports = router;
