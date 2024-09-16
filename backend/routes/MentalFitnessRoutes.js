const express = require('express');
const router = express.Router();
const mentalFitnessGoalController = require('../controllers/MentalFitnessController'); // Adjust the path based on your file structure

// Route to create a new goal
router.post('/goals', mentalFitnessGoalController.createGoal);

module.exports = router;
