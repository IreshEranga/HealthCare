const express = require('express');
const router = express.Router();
const DailyRoutine = require('../models/DailyRoutine');


// Add a daily routine
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
    const savedRoutine = await newRoutine.save();
    res.status(201).json(savedRoutine);
  } catch (error) {
    console.error('Error adding routine:', error);
    res.status(500).json({ message: 'Failed to add routine' });
  }
});

// Get daily routine by user ID and date
router.get('/:userID', async (req, res) => {
  const { userID } = req.params;
  const { date } = req.query;

  try {
    const routine = await DailyRoutine.findOne({ userID, date });
    if (routine) {
      res.status(200).json(routine);
    } else {
      res.status(404).json({ message: 'No routine found for this date.' });
    }
  } catch (error) {
    console.error('Error fetching routine:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a daily routine
router.put('/:userID', async (req, res) => {
  const { userID } = req.params;
  const { date, morning, day, evening, originalDate } = req.body;

  if (!userID || !originalDate) {
    return res.status(400).json({ message: 'UserID and originalDate are required.' });
  }

  try {
    const routineToUpdate = await DailyRoutine.findOne({ userID, date: originalDate });
    if (!routineToUpdate) {
      return res.status(404).json({ message: 'Routine not found for this date.' });
    }

    if (morning !== undefined) routineToUpdate.morning = morning;
    if (day !== undefined) routineToUpdate.day = day;
    if (evening !== undefined) routineToUpdate.evening = evening;

    const updatedRoutine = await routineToUpdate.save();
    res.status(200).json(updatedRoutine);
  } catch (error) {
    console.error('Error updating routine:', error);
    res.status(500).json({ message: 'Failed to update routine' });
  }
});

// Delete a daily routine
router.delete('/:userID', async (req, res) => {
  const { userID } = req.params;
  const { date } = req.query;

  if (!userID || !date) {
    return res.status(400).json({ message: 'UserID and date are required.' });
  }

  try {
    const routine = await DailyRoutine.findOneAndDelete({ userID, date });
    if (routine) {
      res.status(200).json({ message: 'Routine deleted successfully.' });
    } else {
      res.status(404).json({ message: 'No routine found for this date.' });
    }
  } catch (error) {
    console.error('Error deleting routine:', error);
    res.status(500).json({ message: 'Failed to delete routine' });
  }
});

module.exports = router;