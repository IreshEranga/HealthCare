const express = require('express');
const UserController = require('../controllers/UserController');
const User = require("../models/User");




const MentalFitnessGoal = require('../models/MentalFitnessGoal');





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
router.get("/profile/:_id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params._id });
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
            type:user.type,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});







// Route to fetch goals by user ID
router.get('/users/:_id/goals', async (req, res) => {
  const { _id } = req.params;

  try {
    // Fetch all goals for the user
    const goals = await MentalFitnessGoal.find({ user: _id });
    
    /*if (!goals.length) {
      return res.status(404).json({ message: 'No goals found for this user.' });
    }*/

    // Send back the user's goals
    res.json(goals);
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ message: 'Server error while fetching goals.' });
  }
});



// Export the router to use it in your main app
module.exports = router;