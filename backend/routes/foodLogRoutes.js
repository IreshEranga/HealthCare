// routes/foodLog.js
const express = require('express');
const { addFoodLog, getTodayFoodLogs } = require('../controllers/foodLogController');
const router = express.Router();

// Route to handle adding a food log
router.post('/add', addFoodLog); // `addFoodLog` is now the correct callback function

router.get('/today', getTodayFoodLogs);

module.exports = router;
