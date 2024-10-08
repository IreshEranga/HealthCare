const Quiz = require('../models/Quiz');

// Controller to create a new quiz
const createQuiz = async (req, res) => {
  try {
    const { userID, feelings, stress, sleep, relax, workbalance, anxious, meditation } = req.body;

    if (!userID) {
      return res.status(400).json({ message: 'User Not Found!' });
    }

    // Ensure answers are not empty and scores are numbers
    if (
      !feelings || 
      !stress || 
      !sleep || 
      !relax || 
      !workbalance || 
      !anxious || 
      !meditation
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Individual answer scores
    const feelingsScore = feelings.score;
    const stressScore = stress.score;
    const sleepScore = sleep.score;
    const relaxScore = relax.score;
    const workbalanceScore = workbalance.score;
    const anxiousScore = anxious.score;
    const meditationScore = meditation.score;

    // Calculate total score
    const totalScore =
      feelingsScore +
      stressScore +
      sleepScore +
      relaxScore +
      workbalanceScore +
      anxiousScore +
      meditationScore;

    // Create a new quiz instance with the data
    const newQuiz = new Quiz({
      userID,
      feelings: feelings.text,
      feelingsScore,
      stress: stress.text,
      stressScore,
      sleep: sleep.text,
      sleepScore,
      relax: relax.text,
      relaxScore,
      workbalance: workbalance.text,
      workbalanceScore,
      anxious: anxious.text,
      anxiousScore,
      meditation: meditation.text,
      meditationScore,
      totalScore,
    });

    // Save the new quiz entry to the database
    const savedQuiz = await newQuiz.save();

    // Respond with the newly created quiz
    return res.status(201).json({ message: 'Quiz created successfully', data: savedQuiz });
  } catch (error) {
    console.error('Error creating quiz:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

const getUserQuizResults = async (req, res) => {
  const { userID } = req.params; // Get userID from request parameters

  try {
    // Fetch quizzes for the specified userID
    const quizzes = await Quiz.find({ userID });

    if (!quizzes.length) {
      return res.status(404).json({ message: 'No quizzes found for this user.' });
    }

    // Calculate total score across all quizzes
    const totalScore = quizzes.reduce((acc, quiz) => acc + quiz.totalScore, 0);

    // Map quizzes to desired response format
    const results = quizzes.map(quiz => ({
      id: quiz._id,
      feelings: quiz.feelings,
      feelingsScore: quiz.feelingsScore,
      stress: quiz.stress,
      stressScore: quiz.stressScore,
      sleep: quiz.sleep,
      sleepScore: quiz.sleepScore,
      relax: quiz.relax,
      relaxScore: quiz.relaxScore,
      workbalance: quiz.workbalance,
      workbalanceScore: quiz.workbalanceScore,
      anxious: quiz.anxious,
      anxiousScore: quiz.anxiousScore,
      meditation: quiz.meditation,
      meditationScore: quiz.meditationScore,
      totalScore: quiz.totalScore,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
    }));

    // Respond with quiz results and total score
    return res.status(200).json({
      message: 'Quizzes retrieved successfully',
      results,
      //totalScore,
    });
  } catch (error) {
    console.error('Error fetching user quiz results:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { createQuiz, getUserQuizResults };
