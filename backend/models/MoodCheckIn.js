const mongoose = require('mongoose');

const moodCheckSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  selectedMood: { type: String, required: true },
  selectedFeeling: { type: String, required: true },
  selectedCompany: { type: String, required: true },
  selectedActivity: { type: [String], required: true },
  selectedLocation: { type: String, required: true },
  date: { type: String, required: true }, // Store date as YYYY-MM-DD
});

module.exports = mongoose.model('MoodCheck', moodCheckSchema);