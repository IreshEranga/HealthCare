import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function AddFood() {
  const [query, setQuery] = useState('');
  const [foodResults, setFoodResults] = useState([]);
  const [selectedMealType, setSelectedMealType] = useState('Breakfast');

  const API_KEY = 'VrcT9RDOlvlDus5BlnfPM4gQbxiPHrkE3bAsQvGE';

  // Function to search food using EDAMAM API
  const searchFood = async () => {
    try {
      const response = await axios.get(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${'VrcT9RDOlvlDus5BlnfPM4gQbxiPHrkE3bAsQvGE'}`
          
      );

      setFoodResults(response.data.foods);
    } catch (error) {
      console.error('Error searching food:', error.response ? error.response.data : error.message);
    }
  };

  // Function to add selected food to MongoDB via your backend
  const addFoodToLog = async (foodItem) => {
    const foodData = {
      foodItem, // The food item selected
      mealType: selectedMealType,
    };

    console.log('Food Data to be sent:', foodData);

    try {
      console.log('Selected Meal Type:', selectedMealType);

      if (!selectedMealType) {
        console.error('Selected meal type is undefined');
        Alert.alert('Please select a meal type before adding food.');
        return; // Exit the function if meal type is not selected
      }

      const response = await axios.post('http://192.168.8.148:8000/food-log/add', foodData); // Your backend URL
      Alert.alert(response.data.message);
    } catch (error) {
      console.error(error);
      Alert.alert('Error adding food log');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Search for food"
        value={query}
        onChangeText={setQuery}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Search" onPress={searchFood} />

      {/* Meal Type Selector */}
      <Picker
        selectedValue={selectedMealType}
        style={{ height: 50, width: 150, marginBottom: 20 }}
        onValueChange={(itemValue) => {
          console.log('Selected meal type changed to:', itemValue);
          setSelectedMealType(itemValue);
        }}
      >
        <Picker.Item label="Breakfast" value="Breakfast" />
        <Picker.Item label="Lunch" value="Lunch" />
        <Picker.Item label="Dinner" value="Dinner" />
        <Picker.Item label="Snack" value="Snack" />
      </Picker>

      <FlatList
        data={foodResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          // Extract calories (nutrientId 1008 = Calories)
          const calories = item.foodNutrients.find(nutrient => nutrient.nutrientId === 1008)?.value || 0;

          return (<View style={{ padding: 10 }}>
            <Text>{item.description}</Text>
            <Text>{calories} kcal per serving</Text>
            <Button title="Add to Log" onPress={() => addFoodToLog(item)} />
          </View>)
        }}
      />
    </View>
  );
}
