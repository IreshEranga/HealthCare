
const fetch = require('node-fetch');

const getRecipes = async (req, res) => {
    const { query } = req.query; // Get query from frontend

    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=c2696e2fa41b4905b9c2f6426eb70171&query=${query}&addRecipeInformation=true`);
        const data = await response.json();
        res.json(data.results); // Send back the list of recipes
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getRecipes,
};
