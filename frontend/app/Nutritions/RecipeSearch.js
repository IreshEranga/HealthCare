// RecipeSearch.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecipeSearch = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const fetchRecipes = async () => {
        console.log("Fetching recipes...");

        setLoading(true);

        const url = 'https://api.spoonacular.com/recipes/complexSearch';
        const apiKey = 'c2696e2fa41b4905b9c2f6426eb70171'; // Your API key

        try {
            const response = await fetch(`${url}?apiKey=${apiKey}&query=${query}&addRecipeInformation=true`);
            console.log("Response received:", response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Data fetched:", data);
            setRecipes(data.results);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            alert('Error fetching recipes: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const navigateToRecipeDetails = (recipeId) => {
        console.log("recipe id in search ", recipeId);
        navigation.navigate('Nutritions/RecipeDetails', { recipeId }); // Pass the recipe ID to the next screen
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search for recipes"
                value={query}
                onChangeText={setQuery}
                style={{ borderColor: 'gray', borderWidth: 1, padding: 10 }}
            />
            <Button title="Search" onPress={fetchRecipes} />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : recipes.length === 0 ? (
                <Text>No recipes found. Try a different search term.</Text>
            ) : (
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.recipeItem}
                            onPress={() => navigateToRecipeDetails(item.id)} // Correct onPress usage
                        >
                            <Text style={styles.recipeTitle}>{item.title}</Text>
                            <Text>Ready in: {item.readyInMinutes} minutes</Text>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.recipeImage}
                            />
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    recipeItem: {
        padding: 10,
        marginVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    recipeTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    recipeImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginTop: 10,
    },
});

export default RecipeSearch;
