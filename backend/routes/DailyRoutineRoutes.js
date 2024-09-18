const express = require('express');
const DailyRoutine = require('../models/DailyRoutine');
const router = express.Router();

// Get daily routine by user and date
router.get('/:userID', async (req, res) => {
  const { userID } = req.params;
  const { date } = req.query;

  console.log('Fetching routine for user:', userID, 'on date:', date); // Add this log

  try {
    const routine = await DailyRoutine.findOne({ userID, date });
    if (!routine) {
      return res.status(404).json({ message: 'No routine found for this date.' });
    }
    res.json(routine);
  } catch (error) {
    console.error('Error fetching routine:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Add new daily routine
router.post('/', async (req, res) => {
  const { userID, date, morning, day, evening } = req.body;

  if (!userID || !date) {
    return res.status(400).json({ message: 'UserID and date are required.' });
  }

  try {
    const existingRoutine = await DailyRoutine.findOne({ userID, date });
    if (existingRoutine) {
      return res.status(400).json({ message: 'Routine for this date already exists.' });
    }

    const newRoutine = new DailyRoutine({ userID, date, morning, day, evening });
    await newRoutine.save();
    res.status(201).json(newRoutine);
  } catch (error) {
    console.error('Error saving routine:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;