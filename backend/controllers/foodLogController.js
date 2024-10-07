const FoodLog = require('../models/FoodLog');


const addFoodLog = async (req, res) => {
  const { foodItem, mealType } = req.body;

  // Log the incoming data to see its structure
  console.log('Request Body:', req.body);
  console.log('Food Item:', foodItem);
  console.log('Selected Meal Type:', mealType);

  const foodData = {
    date: new Date().toISOString().split('T')[0],
    mealType,
    foodItems: [
      {
        name: foodItem.description,
        calories: foodItem.foodNutrients.find(nutrient => nutrient.nutrientName === "Energy")?.value || 0, // Get calorie value using 'foodNutrients'
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
  //console.log('Request received for today\'s food logs'); // Add this line
  const today = new Date().toISOString().split('T')[0]; // Get today's date (YYYY-MM-DD format)
  const { mealType } = req.query;

  const query = { date: today };
  if (mealType) {
    query.mealType = mealType; // Add mealType to the query if provided
  }

  try {
    const foodLogs = await FoodLog.find(query).sort({ mealType: 1 }); // Change this
    res.status(200).json(foodLogs);
  } catch (error) {
    console.error('Error fetching food logs:', error);
    res.status(500).json({ message: 'Failed to fetch food logs.' });
  }
};


module.exports = { addFoodLog, getTodayFoodLogs };
