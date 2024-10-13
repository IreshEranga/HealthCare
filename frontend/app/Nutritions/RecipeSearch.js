// RecipeSearch.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
            <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Nutritions/nutritionHome')}>
              <Icon name="arrow-left" size={24} color="#191952" />
          </TouchableOpacity>

          <Text style={styles.title}>SEARCH RECIPE</Text>

          <TouchableOpacity>
            <Icon style={styles.usericon} name="user" size={34} color="#191952" onPress={() => navigation.navigate('ProfilePage')}/>
          </TouchableOpacity>
        </View>
            <TextInput
                placeholder="Search for recipes"
                value={query}
                onChangeText={setQuery}
                style={styles.searchContainer}
            />
            <Button title="Search" onPress={fetchRecipes} style={styles.searchButton}/>
            
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
      searchContainer: {
        paddingTop: 5,
        padding: 30,
      },
        searchButton: {
          backgroundColor: 'transparent',
          borderColor: '#191952', 
          borderWidth: 5, 
          borderRadius: 20, 
          color: '#3B3B3B', 
          width: '35%',
          minHeight: 40,
          padding: 7,
          cursor: 'pointer', 
        },
    recipeItem: {
        padding: 10,
        margin: 'auto',
        marginBottom: 20,
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
