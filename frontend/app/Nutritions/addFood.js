import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Alert } from 'react-native';
import axios from 'axios';

export default function AddFood() {
  const [query, setQuery] = useState('');
  const [foodResults, setFoodResults] = useState([]);

  // Function to search food using EDAMAM API
  const searchFood = async () => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/api/food-database/v2/parser`, {
          params: {
            ingr: query,
            app_id: '3fcbe5a2', 
            app_key: '0d8c0ee2175219689825f74f9f3dead0',
          }
        }
      );
      setFoodResults(response.data.hints);
    } catch (error) {
      console.error(error);
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

      <FlatList
        data={foodResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.food.label} - {item.food.nutrients.ENERC_KCAL} kcal</Text>
            <Button title="Add to Log" onPress={() => addFoodToLog(item)} />
          </View>
        )}
      />
    </View>
  );
}
