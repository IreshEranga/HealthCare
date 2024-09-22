const FoodLog = require('../models/FoodLog');


const addFoodLog = async (req, res) => {
  const { foodItem } = req.body;

  const foodData = {
    date: new Date().toISOString().split('T')[0],
    mealType: 'Lunch', // You can modify this dynamically
    foodItems: [
      {
        name: foodItem.food.label,
        calories: foodItem.food.nutrients.ENERC_KCAL,
      },
    ],
  };

  try {
    const newFoodLog = new FoodLog(foodData);
    await newFoodLog.save();
    res.status(201).json({ message: 'Food log added successfully' });
  } catch (error) {
    console.error('Error saving food log to the database:', error);
    res.status(500).json({ error: `Error saving food log to the database: ${error.message}` });
  }
};

// Fetch all food logs for the current day
const getTodayFoodLogs = async (req, res) => {
  const today = new Date().toISOString().split('T')[0]; // Get today's date (YYYY-MM-DD format)

  try {
    const foodLogs = await FoodLog.find({ date: today }).sort({ mealType: 1 });
    res.status(200).json(foodLogs);
  } catch (error) {
    console.error('Error fetching food logs:', error);
    res.status(500).json({ message: 'Failed to fetch food logs.' });
  }
};


module.exports = { addFoodLog, getTodayFoodLogs };
