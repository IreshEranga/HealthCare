import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function NutritionHome() {
  const router = useRouter();
  const [totalCalories, setTotalCalories] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch today's food logs
  const fetchFoodLogs = async () => {
    try {
      //const response = await axios.get('http://192.168.8.148:8000/api/foodlogs/today');
      const response = await axios.get('http://192.168.8.148:8000/food-log/today');
      const foodLogs = response.data;
  
      let totalCaloriesForDay = 0;
      foodLogs.forEach((log) => {
        log.foodItems.forEach((item) => {
          totalCaloriesForDay += item.calories;
        });
      });
  
      setTotalCalories(totalCaloriesForDay);
    } catch (error) {
      console.error('Error fetching food logs:', error);
      setError('Failed to fetch food logs.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch food logs when the component mounts
  useEffect(() => {
    fetchFoodLogs();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Nutrition Tracker</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={{ fontSize: 20, marginBottom: 20 }}>
          Total Calories for Today: {totalCalories} kcal
        </Text>
      )}

      <Button title="Log Food" onPress={() => router.push('/Nutritions/addFood')} />
      <Button title="View Food" onPress={() => router.push('/Nutritions/dailyNutrition')} />
      <Button title="View Recipes" onPress={() => router.push('/Nutritions/recipes')} style={{ marginTop: 10 }} />
      <Button title="Set Nutrition Goals" onPress={() => router.push('/Nutritions/nutritionGoals')} style={{ marginTop: 10 }} />
    </View>
  );
}
