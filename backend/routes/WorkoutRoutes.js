const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/WorkoutController');

// Route to add a new workout log
router.post('/add', workoutController.addWorkoutLog);

// Route to fetch workout logs by date
router.get('/date/:date', workoutController.getWorkoutLogsByDate);

// Route to mark a workout as completed
router.patch('/complete/:id', workoutController.completeWorkoutLog);

// Route to get the count of completed workouts for a specific date
router.get('/completed/count/:date', workoutController.getCompletedWorkoutCountByDate);

module.exports = router;
