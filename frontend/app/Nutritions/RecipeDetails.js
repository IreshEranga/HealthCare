import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
//import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const RecipeDetails = () => {
    
    const route = useRoute();
    console.log(route); // Check if route is undefined or contains params

    const { recipeId } = route.params || {}; // Get recipe ID from navigation
    console.log(recipeId);
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log(recipeId);

    const navigation = useNavigation();

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

            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Nutritions/RecipeSearch')}>
                    <Icon name="arrow-left" size={24} color="#191952" />
                </TouchableOpacity>

                <Text style={styles.title}>SEARCH RECIPE</Text>

                <TouchableOpacity>
                    <Icon style={styles.usericon} name="user" size={34} color="#191952" onPress={() => navigation.navigate('ProfilePage')}/>
                </TouchableOpacity>
            </View>
            
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
        backgroundColor: '#fff',
        flex: 1,
      },
      headerContainer: {
        flexDirection: 'row',          // Align items in a row
        justifyContent: 'space-between',  // Distribute items with space between them
        alignItems: 'center',          // Align items vertically centered
        paddingHorizontal: 20,         // Add some horizontal padding
        paddingVertical: 10,           // Add some vertical padding
        backgroundColor: '#FFFDE7',
        marginBottom: 25,
        backgroundColor: 'white',
      },
      title: {
        fontSize: 28,
        color: '#191952', // Your green color
        fontWeight: 'bold',
        textAlign: 'center',
      },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    detailsText: {
        fontSize: 16,
        marginVertical: 5,
        color: '#555',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
    },
    ingredientText: {
        fontSize: 16,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: '#eee',
        width: '100%',
    },
    instructionsText: {
        fontSize: 16,
        marginTop: 10,
        lineHeight: 22,
        textAlign: 'justify',
    },
});

export default RecipeDetails;
