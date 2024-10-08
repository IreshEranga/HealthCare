const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/QuizController');


// Route to create a new quiz
router.post('/quiz', QuizController.createQuiz);

// Route to update activity status to completed
//router.put('/goals/:goalId/activities/:activityId/complete', completeActivityStatus);

// Route for fetching all quizzes by userID
router.get('/quiz/:userID', QuizController.getUserQuizResults);

module.exports = router;
