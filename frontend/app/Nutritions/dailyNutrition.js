import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

export default function NutritionToday() {
  const [foodLogs, setFoodLogs] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });

  useEffect(() => {
    const fetchFoodLogs = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/food-log/logs/today`);
        const logs = response.data;

        // Organize logs by meal type
        const organizedLogs = {
          breakfast: logs.filter(log => log.mealType === 'Breakfast'),
          lunch: logs.filter(log => log.mealType === 'Lunch'),
          dinner: logs.filter(log => log.mealType === 'Dinner'),
          snacks: logs.filter(log => log.mealType === 'Snacks'),
        };
        
        setFoodLogs(organizedLogs);
      } catch (error) {
        console.error('Error fetching food logs:', error);
      }
    };

    fetchFoodLogs();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Today's Food Log</Text>

      <MealSection title="Breakfast" foodItems={foodLogs.breakfast} />
      <MealSection title="Lunch" foodItems={foodLogs.lunch} />
      <MealSection title="Dinner" foodItems={foodLogs.dinner} />
      <MealSection title="Snacks" foodItems={foodLogs.snacks} />
    </ScrollView>
  );
}

function MealSection({ title, foodItems }) {
  return (
    <View style={styles.mealSection}>
      <Text style={styles.mealTitle}>{title}</Text>
      {foodItems.length > 0 ? (
        foodItems.map((item, index) => (
          <Text key={index} style={styles.foodItem}>
            {item.name} - {item.calories} kcal
          </Text>
        ))
      ) : (
        <Text>No items added for {title.toLowerCase()}.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  mealSection: { marginBottom: 20 },
  mealTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  foodItem: { fontSize: 16, marginBottom: 5 },
});
