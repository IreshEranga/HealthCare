const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/QuizController');


// Route to create a new quiz
router.post('/quiz', QuizController.createQuiz);

// Route to update activity status to completed
//router.put('/goals/:goalId/activities/:activityId/complete', completeActivityStatus);


module.exports = router;
