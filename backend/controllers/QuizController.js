/*const Quiz = require('../models/Quiz');

// Controller to create a new quiz
const createQuiz = async (req, res) => {
  try {
    // Extract fields from request body
    const { userID, feelings, stress, sleep, relax, workbalance, anxious, meditation } = req.body;

    // Check for required fields (e.g., userID and feelings) and handle validation
    if (!userID) {
      
      return res.status(400).json({ message: 'User Not Found !' });
    }

    if (!feelings || !stress || !sleep || !relax || !workbalance || !anxious || !meditation) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

    // Create a new quiz instance with the data
    const newQuiz = new Quiz({
      userID,
      feelings,
      stress,
      sleep, // Make sure the field name is spelled correctly
      relax,
      workbalance,
      anxious,
      meditation
    });

    // Save the new quiz entry to the database
    const savedQuiz = await newQuiz.save();

    // Respond with the newly created quiz
    return res.status(201).json({ message: 'Quiz created successfully', data: savedQuiz });
  } catch (error) {
    // Handle errors and send a response
    console.error('Error creating quiz:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { createQuiz };
*/

const Quiz = require('../models/Quiz');

// Controller to create a new quiz
const createQuiz = async (req, res) => {
  try {
    const { userID, feelings, stress, sleep, relax, workbalance, anxious, meditation } = req.body;

    if (!userID) {
      return res.status(400).json({ message: 'User Not Found !' });
    }

    if (!feelings || !stress || !sleep || !relax || !workbalance || !anxious || !meditation) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newQuiz = new Quiz({
      userID,
      feelings,
      stress,
      sleep,
      relax,
      workbalance,
      anxious,
      meditation
    });

    const savedQuiz = await newQuiz.save();
    return res.status(201).json({ message: 'Quiz created successfully', data: savedQuiz });
  } catch (error) {
    console.error('Error creating quiz:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Controller to get all quiz data by userID
const getQuizzesByUserID = async (req, res) => {
  try {
    const { userID } = req.params;

    if (!userID) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Fetch all quiz records for the specified user
    const quizzes = await Quiz.find({ userID }).sort({ createdAt: -1 }); // Sort by latest first

    if (quizzes.length === 0) {
      return res.status(404).json({ message: 'No quizzes found for this user' });
    }

    // Calculate progress for each quiz (assuming progress is 100% when all fields are filled)
    const quizzesWithProgress = quizzes.map((quiz) => {
      const requiredFields = [quiz.feelings, quiz.stress, quiz.sleep, quiz.relax, quiz.workbalance, quiz.anxious, quiz.meditation];
      const completedFields = requiredFields.filter(field => field && field.trim() !== '').length;
      const totalFields = requiredFields.length;
      const progress = Math.round((completedFields / totalFields) * 100); // Calculate progress as a percentage

      return {
        ...quiz._doc,
        progress, // Add progress to each quiz
      };
    });

    return res.status(200).json({
      message: 'Quizzes retrieved successfully',
      data: quizzesWithProgress,
    });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { createQuiz, getQuizzesByUserID };
