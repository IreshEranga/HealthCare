const express = require('express');
const router = express.Router();
const MoodCheckIn = require('../models/MoodCheckIn');

// POST - Save mood check-in
router.post('/add', async (req, res) => {
  const { selectedMood, selectedFeeling, selectedCompany, selectedActivity, selectedLocation, date } = req.body;

  try {
    const moodCheckIn = new MoodCheckIn({
      selectedMood,
      selectedFeeling,
      selectedCompany,
      selectedActivity,
      selectedLocation,
      date,
    });
    await moodCheckIn.save();
    res.status(201).json(moodCheckIn);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save mood check-in' });
  }
});

module.exports = router;