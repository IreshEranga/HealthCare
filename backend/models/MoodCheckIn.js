const mongoose = require('mongoose');

const moodCheckInSchema = new mongoose.Schema({
  selectedMood: { type: Number, required: true },
  selectedFeeling: { type: [String], required: true },
  selectedCompany: { type: Number, required: true },
  selectedActivity: { type: [String], required: true },
  selectedLocation: { type: Number, required: true },
  date: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('MoodCheckIn', moodCheckInSchema);