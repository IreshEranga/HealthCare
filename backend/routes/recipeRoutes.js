// routes/recipeRoutes.js
const express = require('express');
const { getRecipes } = require('../controllers/recipeController');
const router = express.Router();

router.get('/recipes', getRecipes);

module.exports = router;
