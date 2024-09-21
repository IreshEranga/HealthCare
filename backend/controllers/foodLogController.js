const foodLog = require('../models/FoodLog');


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
    const newFoodLog = new foodLog(foodData);
    await newFoodLog.save();
    res.status(201).json({ message: 'Food log added successfully' });
  } catch (error) {
    console.error('Error saving food log to the database:', error);
    res.status(500).json({ error: `Error saving food log to the database: ${error.message}` });
  }
};

module.exports = { addFoodLog };
