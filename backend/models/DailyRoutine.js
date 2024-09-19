const mongoose = require('mongoose');

const dailyRoutineSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  morning: {
    type: String,
    default: '',
  },
  day: {
    type: String,
    default: '',
  },
  evening: {
    type: String,
    default: '',
  },
}, { timestamps: true });

const DailyRoutine = mongoose.model('DailyRoutine', dailyRoutineSchema);

module.exports = DailyRoutine;