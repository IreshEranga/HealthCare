const mongoose = require('mongoose');

const foodLogSchema = new mongoose.Schema({
  userID: {
    type: String,
  },
  date: { 
    type: String, 
    required: true 
  },
  mealType: { 
    type: String, 
    required: true 
  },
  foodItems: [
    {
      name: { type: String, 
        required: true 
      },
      calories: { 
        type: Number, 
        required: true 
      },
    },
  ],
});

const FoodLog = mongoose.model('FoodLog', foodLogSchema);

module.exports = FoodLog;
