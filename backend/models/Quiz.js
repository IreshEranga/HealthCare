// models/Quiz.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  feelings: { type: String, required: true },
  feelingsScore: { type: Number, required: true },
  stress: { type: String, required: true },
  stressScore: { type: Number, required: true },
  sleep: { type: String, required: true },
  sleepScore: { type: Number, required: true },
  relax: { type: String, required: true },
  relaxScore: { type: Number, required: true },
  workbalance: { type: String, required: true },
  workbalanceScore: { type: Number, required: true },
  anxious: { type: String, required: true },
  anxiousScore: { type: Number, required: true },
  meditation: { type: String, required: true },
  meditationScore: { type: Number, required: true },
  totalScore: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
