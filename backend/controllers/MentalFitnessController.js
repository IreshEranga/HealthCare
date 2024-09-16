const MentalFitnessGoal = require('../models/MentalFitnessGoal'); // Adjust the path based on your file structure

// Controller to create a new goal
exports.createGoal = async (req, res) => {
  try {
    const { user, type, name, activities, goalStatus } = req.body;

    const newGoal = new MentalFitnessGoal({
      user,
      type,
      name,
      activities,
      goalStatus,
    });

    const savedGoal = await newGoal.save();

    res.status(201).json({
      message: 'Mental fitness goal created successfully',
      data: savedGoal,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating mental fitness goal',
      error: error.message,
    });
  }
};
