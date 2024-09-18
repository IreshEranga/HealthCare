const express = require('express');
const router = express.Router();
const MoodCheck = require('../models/MoodCheckIn');

// Route to get the mood check-in for the current date
router.get('/:userID/today', async (req, res) => {
  const { userID } = req.params;
  const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format

  try {
    const moodCheck = await MoodCheck.findOne({ userID, date: today });
    
    if (moodCheck) {
      return res.json(moodCheck); // Return the full mood check-in data
    } else {
      return res.status(404).json({ message: 'No mood check-in found for today' });
    }
  } catch (error) {
    console.error('Error fetching mood check-in:', error);
    return res.status(500).json({ message: 'Failed to retrieve mood check-in data' });
  }
});

// Route to add a new mood check-in
router.post('/add', async (req, res) => {
  const { selectedMood, selectedFeeling, selectedCompany, selectedActivity, selectedLocation, date, userID } = req.body;

  try {
    // Check if a mood check-in already exists for this user and date
    const existingCheckIn = await MoodCheck.findOne({ userID, date });

    if (existingCheckIn) {
      return res.status(400).json({ message: 'Mood check-in for today already exists' });
    }

    // Create a new mood check-in entry
    const newMoodCheck = new MoodCheck({
      selectedMood,
      selectedFeeling,
      selectedCompany,
      selectedActivity,
      selectedLocation,
      date,
      userID,
    });

    // Save the new mood check-in
    await newMoodCheck.save();
    return res.status(201).json(newMoodCheck); // Return the newly created check-in
  } catch (error) {
    console.error('Error adding mood check-in:', error);
    return res.status(500).json({ message: 'Failed to save mood check-in. Please try again later.' });
  }
});

module.exports = router;