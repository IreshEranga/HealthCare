import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.title}>Nutrition Tracker</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.caloriesText}>
          Total Calories for Today: {totalCalories} kcal
        </Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/Nutritions/addFood')}>
          <Text style={styles.buttonText}>Log Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/Nutritions/dailyNutrition')}>
          <Text style={styles.buttonText}>View Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/Nutritions/nutritionGoals')}>
          <Text style={styles.buttonText}>Calculate BMI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  caloriesText: {
    fontSize: 24,
    marginBottom: 40,
    color: '#555',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});