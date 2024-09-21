// routes/foodLog.js
const express = require('express');
const { addFoodLog } = require('../controllers/foodLogController');
const router = express.Router();

// Route to handle adding a food log
router.post('/add', addFoodLog); // `addFoodLog` is now the correct callback function

module.exports = router;
