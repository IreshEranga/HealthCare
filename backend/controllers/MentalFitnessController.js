const MentalFitnessGoal = require('./models/MentalFitnessGoal');
const User = require('./models/User'); 

// Assuming you have the user's ID and a new goal
async function createMentalFitnessGoal(userID, goalData) {
  try {
    const user = await User.findById(userID);

    if (!user) {
      throw new Error('User not found');
    }

    const newGoal = new MentalFitnessGoal({
      user: user._id,
      type: goalData.type,
      name: goalData.name,
      activities: goalData.activities,
      goalStatus: 'not started',
    });

    const savedGoal = await newGoal.save();
    return savedGoal;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { createMentalFitnessGoal };