const express = require('express');
const router = express.Router();
const MoodCheckIn = require('../models/MoodCheckIn');


// POST route to add mood check-in
// In your backend /add route, ensure the date is parsed correctly
router.post('/add', async (req, res) => {
  const { userID, date, mood, feelings, company, activity, location } = req.body;

  try {
    // Convert the date to ISO format
    const parsedDate = new Date(date); // or use moment(date).toDate() for better flexibility

    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

    const existingCheckIn = await MoodCheckIn.findOne({
      userID,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (existingCheckIn) {
      return res.status(400).json({ message: 'Mood check-in already exists for today' });
    }

    const newMoodCheckIn = new MoodCheckIn({
      userID,
      date: parsedDate, // Ensure the date is saved correctly
      mood,
      feelings,
      company,
      activity,
      location,
    });

    const savedMoodCheckIn = await newMoodCheckIn.save();

    res.status(201).json({
      message: 'Mood check-in added successfully',
      moodCheckIn: savedMoodCheckIn,
    });
  } catch (error) {
    console.error('Error adding mood check-in:', error);
    res.status(500).json({
      message: 'Error adding mood check-in',
      error: error.message,
    });
  }
});

// Fetch today's mood check-in data
router.get('/:userID/today', async (req, res) => {
  const { userID } = req.params;

  try {
    // Find the mood check-in for the user for today's date
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const moodCheckIn = await MoodCheckIn.findOne({
      userID,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (!moodCheckIn) {
      return res.status(404).json({ message: 'No mood check-in found for today' });
    }

    res.json(moodCheckIn);
  } catch (error) {
    console.error('Error fetching mood check-in data:', error);
    res.status(500).json({ message: 'Error fetching mood check-in data', error: error.message });
  }
});

module.exports = router;