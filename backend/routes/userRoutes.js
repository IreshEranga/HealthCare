const express = require('express');
const UserController = require('../controllers/UserController');

// Initialize the router
const router = express.Router();

// Define routes
router.post("/signUp", UserController.createUser);

// Export the router to use it in your main app
module.exports = router;
