import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons"; 
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersonalizedWorkout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [greetingMessage, setGreetingMessage] = useState('');
  const [userName, setUserName] = useState('');
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('loggedInUser');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser && parsedUser.first_name) {
          setUserName(parsedUser.first_name);
        }
      } catch (error) {
        console.log('Error fetching user data', error);
      }
    };

    fetchUserData();

    // Set greeting message based on current hour
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreetingMessage('Good Morning');
    } else if (currentHour < 18) {
      setGreetingMessage('Good Afternoon');
    } else {
      setGreetingMessage('Good Evening');
    }
    
    // Fetch workouts and completed count on mount and focus
    fetchWorkouts();
    fetchCompletedWorkoutCount();
  }, [isFocused]); // Re-fetch data when screen is focused

  const fetchWorkouts = async () => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const response = await axios.get(`${API_URL}/workoutlog/date/${today}`);
      setWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching workouts:', error.response ? error.response.data : error.message);
    }
  };

  const fetchCompletedWorkoutCount = async () => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const response = await axios.get(`${API_URL}/workoutlog/completed/count/${today}`);
      setCompletedCount(response.data.count);
    } catch (error) {
      console.error('Error fetching completed workout count:', error.response ? error.response.data : error.message);
    }
  };

  const handleAddWorkout = () => {
    navigation.navigate('Fitness/WorkoutLog');
  };

  const handleCompleteWorkout = async (id) => {
    try {
      await axios.patch(`${API_URL}/workoutlog/complete/${id}`);
      fetchWorkouts();
      fetchCompletedWorkoutCount();
      alert('Workout marked as completed!');
    } catch (error) {
      console.error('Error completing workout:', error.response ? error.response.data : error.message);
      alert('Failed to mark workout as completed.');
    }
  };

  const filterWorkouts = () => {
    if (selectedCategory === 'All') return workouts;
    return workouts.filter(workout => workout.category === selectedCategory);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header with Back and Profile buttons */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home/Welcome')}>
          <MaterialIcons name="arrow-back" size={24} color="#301934" />
        </TouchableOpacity>

        <Text style={styles.greeting}>
          {greetingMessage}, {userName ? userName : 'Guest'}
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')}>
          <MaterialIcons style={styles.userIcon} name="person" size={34} color="#301934" />
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        {['All', 'Chest', 'Arm', 'Abs'].map((category) => (
          <Pressable
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={styles.categoryButtonText}>{category}</Text>
          </Pressable>
        ))}
        <Pressable onPress={handleAddWorkout}>
          <AntDesign name="pluscircle" size={30} color="#007FFF" />
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ padding: 10 }}>
          <Text style={styles.completedCount}>Completed Workouts Today: {completedCount}</Text>
          {filterWorkouts().length > 0 ? (
            filterWorkouts().map((workout) => (
              <View key={workout._id} style={styles.workoutCard}>
                <Text style={styles.workoutText}>Exercise: {workout.exercise}</Text>
                <Text style={styles.workoutText}>Reps: {workout.reps}</Text>
                <Text style={styles.workoutText}>Weight: {workout.weight} kg</Text>
                <Text style={styles.workoutText}>Status: {workout.status === 'completed' ? '✅ Completed' : '⏳ Pending'}</Text>
                {workout.status === 'pending' && (
                  <Button title="Mark as Completed" onPress={() => handleCompleteWorkout(workout._id)} />
                )}
              </View>
            ))
          ) : (
            <View style={styles.noWorkoutContainer}>
              <Image
                style={{ width: 300, height: 300, resizeMode: "contain" }}
                source={{
                  uri: "https://media.istockphoto.com/id/1139929498/vector/happy-woman-exercising-in-the-park-vector-illustration-in-flat-style-concept-illustration.jpg?s=612x612&w=0&k=20&c=r-sSW5XtIooyE2Wk9EgBPJQdsUS4Jecw63VNGvCHG7E=",
                }}
              />
              <Text style={styles.noWorkoutText}>
                No Workouts for today! Add a workout.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    padding: 10,
  },
  userIcon: {
    padding: 10,
  },
  categoryContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  categoryButton: {
    backgroundColor: "#7CB9E8",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCategoryButton: {
    backgroundColor: "#005f99",
  },
  categoryButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  workoutCard: {
    marginVertical: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  workoutText: {
    fontSize: 16,
    marginBottom: 5,
  },
  noWorkoutContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  noWorkoutText: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  completedCount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default PersonalizedWorkout;
