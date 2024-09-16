const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;