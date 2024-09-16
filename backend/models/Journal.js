const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: () => new Date().toLocaleDateString(), 
  },
  time: {
    type: String,
    required: true,
    default: () => new Date().toLocaleTimeString(), 
  },
  note: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;