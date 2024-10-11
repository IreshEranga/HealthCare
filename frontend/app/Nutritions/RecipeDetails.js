import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';

const RecipeDetails = ({ route }) => {
    console.log(route); // Check if route is undefined or contains params

    const { recipeId } = route.params || {}; // Get recipe ID from navigation
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log(recipeId);

    const fetchRecipeDetails = async () => {
        const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information`;
        const apiKey = 'c2696e2fa41b4905b9c2f6426eb70171'; // Your API key

        try {
            const response = await fetch(`${apiUrl}?apiKey=${apiKey}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setRecipeDetails(data); // Set fetched recipe details
        } catch (error) {
            alert('Error fetching recipe details: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipeDetails(); // Fetch details when component mounts
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            {recipeDetails ? (
                <>
                    <Text style={styles.title}>{recipeDetails.title}</Text>
                    <Image source={{ uri: recipeDetails.image }} style={styles.image} />
                    <Text>Ready in: {recipeDetails.readyInMinutes} minutes</Text>
                    <Text>Servings: {recipeDetails.servings}</Text>
                    <Text>Ingredients:</Text>
                    {recipeDetails.extendedIngredients.map((ingredient) => (
                        <Text key={ingredient.id}>{ingredient.original}</Text>
                    ))}
                    <Text>Instructions:</Text>
                    <Text>{recipeDetails.instructions}</Text>
                </>
            ) : (
                <Text>No recipe details available</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 20,
    },
});

export default RecipeDetails;
