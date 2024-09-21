const express = require('express');
const router = express.Router();
const mentalFitnessGoalController = require('../controllers/MentalFitnessController'); // Adjust the path based on your file structure
const { completeActivityStatus } = require('../controllers/GoalController');

// Route to create a new goal
router.post('/goals', mentalFitnessGoalController.createGoal);

// Route to update activity status to completed
router.put('/goals/:goalId/activities/:activityId/complete', completeActivityStatus);


module.exports = router;
