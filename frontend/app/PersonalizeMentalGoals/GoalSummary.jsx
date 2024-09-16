import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import man from '../../assets/images/man2.png';
import NavBar from '../../components/NavBar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function GoalSummary() {
  const route = useRoute();
  const navigation = useNavigation();
  const { goal, goalType } = route.params; // Get the selected goal from route params
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');
  const [_id, set_id] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('loggedInUser');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      if (parsedUser && parsedUser.first_name && parsedUser.userID && parsedUser._id) {
        setUserName(parsedUser.first_name);
        setUserID(parsedUser.userID);
        set_id(parsedUser._id);
      }
    } catch (error) {
      console.log('Error fetching user data', error);
    }
  };

  const handleBackPress = () => {
    navigation.navigate('PersonalizeMentalGoals/Suggestions'); // Go back to the previous screen
  };

  const handleStartPress = async () => {
    try {
      console.log('Goal type:', goalType); // Log to check if type is present
      console.log('Goal name:', goal.name); // Additional check for goal name

      // Fetch existing goals for the current user
      const response = await axios.get(`${apiUrl}/users/users/${_id}/goals`);

      // Check for a goal with the same type and name
      const duplicateGoal = response.data.find(
        (existingGoal) =>
          existingGoal.type === goalType && existingGoal.name === goal.name
      );

      if (duplicateGoal) {
        // If a duplicate goal is found, show a toast message and exit the function
        Toast.show({
          type: 'error',
          text1: 'Duplicate Goal',
          text2: `You already started this goal.`,
        });
        return; // Stop further execution if a duplicate is found
      }

      // If no duplicate is found, proceed with saving the goal
      const goalData = {
        user: _id, // The user reference (ObjectId)
        type: goalType,
        name: goal.name,
        activities: goal.activities.map((activity, index) => ({
          day: index + 1, // Assuming activities are ordered and mapped to days
          instruction: activity.instruction,
          status: 'pending', // Default to 'pending'
        })),
        goalStatus: 'in progress', // Set initial status of the goal
      };

      console.log('Sending goal data:', goalData); // Log goalData for debugging

      // Post new goal data to backend
      const saveResponse = await axios.post(`${apiUrl}/users/goals`, goalData);

      // Show success toast message
      Toast.show({
        type: 'success',
        text1: 'Congratulations!!',
        text2: `You have started your goal: ${goal.name}.`,
      });

      // Navigate to the next screen
      navigation.navigate('PersonalizeMentalGoals/GoalActivity'); // Replace with your desired screen
    } catch (error) {
      // Error handling
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#E0BBE4', '#aec2b6', '#60768d']}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View>
            <Text style={styles.topic}>{goal.name}</Text>
          </View>

          <View>
            <Icon style={styles.usericon} name="user" size={34} color="#2E4057" />
          </View>

          <TouchableOpacity onPress={handleBackPress}>
            <Icon name="arrow-left" size={30} color="#2E4057" marginLeft={20} marginTop={-40} />
          </TouchableOpacity>

          {/* <Text style={styles.sumtopic}>{goalType}</Text> */}
          <Text style={styles.sumtopic}>Summary:</Text>

          {/* Summary and image overlay */}
          <View style={styles.overlayContainer}>
            <Image source={man} style={styles.manImage} width={200} height={400} />
            <View style={styles.summaryWrapper}>
              <Text style={styles.summary}>{goal.summary}</Text>
            </View>
            <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <NavBar style={styles.navigation} />
      </LinearGradient>

      {/* Toast Message */}
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e1138',
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  scrollView: {
    flexGrow: 1,
  },
  usericon: {
    marginLeft: 340,
    marginTop: -30,
  },
  topic: {
    color: '#2E4057',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 40,
    textAlign: 'center',
  },
  sumtopic: {
    marginLeft: 30,
    marginTop: 30,
    fontSize: 18,
  },
  overlayContainer: {
    position: 'relative',
    marginTop: -60,
    marginHorizontal: 50,
    marginBottom: 30,
  },
  summaryWrapper: {
    position: 'absolute',
    top: -150,
    left: -30,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summary: {
    fontSize: 16,
    color: '#333',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
    borderRadius: 20,
    padding: 20,
    textAlign: 'center',
    zIndex: 1, // Ensure the summary text is on top
  },
  manImage: {
    width: '100%',
    height: 605,
    opacity: 1,
    zIndex: 0, // Set zIndex lower than summary text
    marginLeft: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activityItem: {
    marginBottom: 20,
  },
  activityDay: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityInstruction: {
    fontSize: 14,
    marginBottom: 10,
  },
  activityImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  activityStatus: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  startButton: {
    backgroundColor: '#2E4057',
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 30,
    marginTop: 20,
    alignItems: 'center',
    top: -150,
    width: 100,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
  },
});
