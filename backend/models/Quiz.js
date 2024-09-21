const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  feelings: {
    type: String,
    required: true,
  },
  stress: {
    type: String,
    required: true,
  },
  sleep: {
    type: String,
    required: true,
  },
  relax: {
    type: String,
    default: '',
  },
  workbalance: {
    type: String,
    default: '',
  },
  anxious: {
    type: String,
    default: '',
  },
  meditation: {
    type: String,
    default: '',
  },
},
{ 
  timestamps: true 
});

module.exports = mongoose.model('Quiz', quizSchema);