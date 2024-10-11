// components/ReminderPage.jsx
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity, // Use TouchableOpacity for custom button styling
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../../components/NavBar';

const ReminderPage = () => {
  const [todayWorkouts, setTodayWorkouts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const API_URL = process.env.EXPO_PUBLIC_API_URL; // Your API URL
  const navigation = useNavigation();

  useEffect(() => {
    fetchTodayWorkouts();
  }, []);

  const fetchTodayWorkouts = async () => {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    try {
      const response = await axios.get(`${API_URL}/workoutlog/date/${today}`);
      setTodayWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching today workouts:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to fetch today workouts.');
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  const handleNavigateToPersonalizedWorkout = () => {
    navigation.navigate('Fitness/PersonalizedWorkout');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Today's Workouts</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#A57BC5" /> // Loading indicator
        ) : todayWorkouts.length > 0 ? (
          todayWorkouts.map((workout) => (
            <View key={workout._id} style={styles.workoutCard}>
              <Text style={styles.workoutText}>Exercise: {workout.exercise}</Text>
              <Text style={styles.workoutText}>Reps: {workout.reps}</Text>
              <Text style={styles.workoutText}>Weight: {workout.weight} kg</Text>
              <Text style={styles.workoutText}>
                Status: {workout.status === 'completed' ? '✅ Completed' : '⏳ Pending'}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noWorkoutText}>No workouts scheduled for today.</Text>
        )}
        
      </ScrollView>
      {/* Fixed Navigation Bar */}
      <View style={styles.navbarContainer}>
        <NavBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EAE6F2', // Light purple background
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#5D4B9D', // Darker purple for contrast
  },
  workoutCard: {
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#A57BC5', // Light purple border
    borderRadius: 10,
    backgroundColor: '#FFFFFF', // White background for workout cards
    shadowColor: '#000', // Shadow effect for depth
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2, // For Android shadow
  },
  workoutText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333', // Dark text for readability
  },
  noWorkoutText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#5D4B9D', // Darker purple for contrast
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  customButton: {
    backgroundColor: '#A57BC5', // Light purple button
    borderRadius: 25, // Rounded button
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ReminderPage;
