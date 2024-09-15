const express = require('express');
const router = express.Router();
const Journal = require('../models/Journal');


// Add a new journal entry
router.post('/add', async (req, res) => {
  const { userID, date, time, note } = req.body;

  // Check for missing fields
  if (!userID || !date || !time || !note) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newJournal = new Journal({
      userID,
      date,
      time,
      note,
    });

    await newJournal.save();
    res.status(201).json({ message: 'Journal entry saved successfully.' });
  } catch (error) {
    console.error('Error saving journal entry:', error);
    res.status(500).json({ message: 'Failed to save journal entry. Please try again later.' });
  }
});

// Get all journal entries for a user
router.get('/:userID', async (req, res) => {
  const { userID } = req.params;

  try {
    const journals = await Journal.find({ userID }).sort({ createdAt: -1 });
    res.status(200).json(journals);
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    res.status(500).json({ message: 'Failed to fetch journal entries.' });
  }
});

// Delete a journal entry
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const journal = await Journal.findByIdAndDelete(id);
    if (!journal) {
      return res.status(404).json({ message: 'Journal entry not found.' });
    }

    res.status(200).json({ message: 'Journal entry deleted successfully.' });
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    res.status(500).json({ message: 'Failed to delete journal entry.' });
  }
});

module.exports = router;