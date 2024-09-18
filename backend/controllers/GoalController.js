const MentalFitnessGoal = require('../models/MentalFitnessGoal'); // Import the model

// Controller to update activity status to 'completed' by activity ID
const completeActivityStatus = async (req, res) => {
  const { goalId, activityId } = req.params; // Extract goalId and activityId from request params

  try {
    // Find the goal by goalId and the specific activity by activityId
    const goal = await MentalFitnessGoal.findOneAndUpdate(
      { _id: goalId, 'activities._id': activityId },
      { $set: { 'activities.$.status': 'completed' } }, // Set the status to 'completed'
      { new: true } // Return the updated document
    );

    if (!goal) {
      return res.status(404).json({ message: 'Goal or Activity not found' });
    }

    return res.status(200).json({ message: 'Activity marked as completed', goal });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while updating activity status', error });
  }
};

module.exports = {
  completeActivityStatus,
};
