const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
},
  mealsPerDay: [String], // Breakfast, Lunch, Dinner

  allergies: [String], // List of selected allergies

  diets: [String], // List of selected diets

  calories: {
    min: Number,
    max: Number
  },

  nutrients: [String], // List of selected nutrients

  meals: {
    Breakfast: [String],
    Lunch: [String],
    Dinner: [String]
  },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MealPlan', mealPlanSchema);
