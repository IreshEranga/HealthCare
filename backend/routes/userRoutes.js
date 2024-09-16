const express = require('express');
const UserController = require('../controllers/UserController');
const User = require("../models/User");
//const jwt = require('jsonwebtoken');

// Initialize the router
const router = express.Router();

// Middleware to check authentication
const checkAuth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace 'your_jwt_secret' with your actual JWT secret
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Define routes
router.post("/signUp", UserController.createUser);

// Route to get logged-in user data
router.get("/profile", checkAuth, async (req, res) => {
    try {
        const user = await User.findOne({ userID: req.userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            mobile: user.mobile,
            profession: user.profession,
            gender: user.gender,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Export the router to use it in your main app
module.exports = router;