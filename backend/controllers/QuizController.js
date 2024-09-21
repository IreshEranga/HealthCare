const Quiz = require('../models/Quiz');

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
