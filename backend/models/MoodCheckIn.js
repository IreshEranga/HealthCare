const mongoose = require('mongoose');

const moodCheckInSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    required: true,
  },
  feelings: {
    type: [String],
    default: [],
  },
  company: {
    type: String,
    default: '',
  },
  activity: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('MoodCheckIn', moodCheckInSchema);