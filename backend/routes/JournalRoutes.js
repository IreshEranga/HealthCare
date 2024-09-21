const express = require('express');
const router = express.Router();
const Journal = require('../models/Journal');


// Add a new journal entry
router.post('/add', async (req, res) => {
  const { userID, note } = req.body;

  if (!userID || !note) {
    return res.status(400).json({ message: 'User ID and note are required.' });
  }

  try {
    const newJournal = new Journal({
      userID,
      note,
      time: new Date() // Include time field
    });

    await newJournal.save();
    res.status(201).json({ message: 'Journal entry saved successfully.', journal: newJournal });
  } catch (error) {
    console.error('Error saving journal entry:', error);
    res.status(500).json({ message: 'Failed to save journal entry. Please try again later.' });
  }
});

// Get journal entries for a user by userID and selected date
router.get('/:userID', async (req, res) => {
  const { userID } = req.params;
  const { date } = req.query;

  try {
    const query = { userID };

    if (date) {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate)) {
        return res.status(400).json({ message: 'Invalid date format.' });
      }

      query.time = {
        $gte: new Date(parsedDate.setHours(0, 0, 0, 0)),
        $lt: new Date(parsedDate.setHours(23, 59, 59, 999))
      };
    }

    const journals = await Journal.find(query).sort({ time: -1 }); // Sorting by time, not date
    res.status(200).json(journals);
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    res.status(500).json({ message: 'Failed to fetch journal entries.' });
  }
});

// Update Journal Entry
router.post('/update/:journalID', async (req, res) => {
  try {
    const { note } = req.body;
    const journalID = req.params.journalID;

    const updatedJournal = await Journal.findByIdAndUpdate(
      journalID,
      { note },
      { new: true }
    );

    if (!updatedJournal) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }

    res.json(updatedJournal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error updating journal entry' });
  }
});

// Delete Journal Entry
router.delete('/:journalID', async (req, res) => {
  try {
    const journalID = req.params.journalID;

    const deletedJournal = await Journal.findByIdAndDelete(journalID);

    if (!deletedJournal) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }

    res.json({ message: 'Journal entry deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error deleting journal entry' });
  }
});

module.exports = router;