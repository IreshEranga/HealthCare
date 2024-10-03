import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const DisplayFoodLog = () => {
  const [foodLogs, setFoodLogs] = useState([]);
  const [error, setError] = useState('');
  const [userID, setUserID] = useState('');

  const fetchUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('loggedInUser');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      if (parsedUser && parsedUser.userID) {
        setUserID(parsedUser.userID);
      }
    } catch (error) {
      console.log('Error fetching user data', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchFoodLogs = async () => {
      try {
        const response = await axios.get('http://192.168.8.148:8000/food-log/today'); // Ensure the correct port is used
        setFoodLogs(response.data);
      } catch (err) {
        setError('Error fetching food logs');
        console.error('Error fetching food logs:', err);
      }
    };

    fetchFoodLogs();
  }, []);

  const renderMealType = (mealType) => (
    foodLogs
      .filter(log => log.mealType === mealType)
      .map((log, index) => (
        <View key={index} style={styles.foodItem}>
          <Text>{log.foodItems[0].name} - {log.foodItems[0].calories} kcal</Text>
        </View>
      ))
  );

  return (
    <ScrollView style={styles.container}>
      {error ? <Text>{error}</Text> : null}

      <Text style={styles.heading}>Breakfast</Text>
      {renderMealType('Breakfast')}

      <Text style={styles.heading}>Lunch</Text>
      {renderMealType('Lunch')}

      <Text style={styles.heading}>Dinner</Text>
      {renderMealType('Dinner')}

      <Text style={styles.heading}>Snacks</Text>
      {renderMealType('Snacks')}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  foodItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default DisplayFoodLog;
