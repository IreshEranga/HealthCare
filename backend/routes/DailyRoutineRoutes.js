const express = require('express');
const router = express.Router();
const moment = require('moment');
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

// Update status of a specific routine section (morning/day/evening)
router.put('/status/:userID', async (req, res) => {
  const { userID } = req.params;
  const { date, section, status } = req.body;

  // Validate required fields
  if (!userID || !date || !section || !status) {
    return res.status(400).json({ message: 'UserID, date, section, and status are required.' });
  }

  try {
    // Find the routine for the given user and date
    const routineToUpdate = await DailyRoutine.findOne({ userID, date });
    if (!routineToUpdate) {
      return res.status(404).json({ message: 'Routine not found for this date.' });
    }

    // Update only the status of the specified section
    if (section === 'morning') {
      routineToUpdate.morning.status = status;
    } else if (section === 'day') {
      routineToUpdate.day.status = status;
    } else if (section === 'evening') {
      routineToUpdate.evening.status = status;
    } else {
      return res.status(400).json({ message: 'Invalid section.' });
    }

    // Save the updated routine
    const updatedRoutine = await routineToUpdate.save();
    res.status(200).json(updatedRoutine);
  } catch (error) {
    console.error('Error updating routine status:', error);
    res.status(500).json({ message: 'Failed to update routine status.' });
  }
});

// Update a daily routine
// Update a daily routine
router.put('/:userID', async (req, res) => {
  const { userID } = req.params;
  const { originalDate, morning, day, evening } = req.body;

  // Check if the originalDate is in the past
  if (moment(originalDate).isBefore(moment(), 'day')) {
    return res.status(400).json({ message: 'Cannot edit routine for past dates.' });
  }

  if (!userID || !originalDate) {
    return res.status(400).json({ message: 'UserID and originalDate are required.' });
  }

  try {
    const routineToUpdate = await DailyRoutine.findOne({ userID, date: originalDate });
    if (!routineToUpdate) {
      return res.status(404).json({ message: 'Routine not found for this date.' });
    }

    // Update only the sections that have been modified and are not completed
    if (routineToUpdate.morning.status === 'pending..' && morning.content !== routineToUpdate.morning.content) {
      routineToUpdate.morning = { content: morning.content, status: 'pending..' };
    }
    if (routineToUpdate.day.status === 'pending..' && day.content !== routineToUpdate.day.content) {
      routineToUpdate.day = { content: day.content, status: 'pending..' };
    }
    if (routineToUpdate.evening.status === 'pending..' && evening.content !== routineToUpdate.evening.content) {
      routineToUpdate.evening = { content: evening.content, status: 'pending..' };
    }

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