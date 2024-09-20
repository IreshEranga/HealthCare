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
    content: { type: String, default: '' },
    status: { type: String, default: 'pending..' }, 
  },
  day: {
    content: { type: String, default: '' },
    status: { type: String, default: 'pending..' }, 
  },
  evening: {
    content: { type: String, default: '' },
    status: { type: String, default: 'pending..' }, 
  },
}, { timestamps: true });

const DailyRoutine = mongoose.model('DailyRoutine', dailyRoutineSchema);

module.exports = DailyRoutine;