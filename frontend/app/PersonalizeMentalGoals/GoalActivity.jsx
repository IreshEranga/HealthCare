import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import NavBar from '../../components/NavBar';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadingAnimation from '../../assets/videos/square.gif';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function GoalActivity() {
  const route = useRoute();
  const { goal } = route.params || {}; // Default to an empty object to avoid undefined

  const goalData = goal?.data || goal;
  const [filteredGoalData, setFilteredGoalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const _id = '66deb5a5a1f5bf364dbbc274'; // Replace with actual user ID logic
        const response = await axios.get(`${apiUrl}/users/users/${_id}/goals`);
        const goals = response.data;

        // Normalize goal data to handle cases with and without 'data' key
        const goalName = goalData?.name || '';
        const filteredGoal = goals.find(g => g.name === goalName);
        setFilteredGoalData(filteredGoal);
      } catch (error) {
        console.error('Error fetching goals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [goalData?.name]);

  if (loading) {
    return (
        <View style={styles.loadingContainer}>
          <Image source={LoadingAnimation} style={styles.loadingGif} />
          <Text style={styles.loadingText}>Please wait...</Text>
        </View>
    );
  }

  if (!filteredGoalData) {
    return (
      <SafeAreaView style={styles.container}>
      <Text style={styles.errorText}>No goal data available</Text>
    </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#E0BBE4', '#aec2b6', '#60768d']}
        style={styles.background}
      >
        <View>
          <Text style={styles.goalName}>{filteredGoalData.name}</Text>
        </View>

        <View>
          <Icon style={styles.usericon} name="user" size={34} color="#2E4057" />
        </View>

        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.goalDetails}>
            {filteredGoalData.activities.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <Text style={styles.activityDay}>Day {activity.day}</Text>
                <Text style={styles.activityInstruction}>{activity.instruction}</Text>
                {activity.image ? (
                  <Image 
                    source={{ uri: activity.image }} 
                    style={styles.activityImage} 
                    resizeMode='cover'
                  />
                ) : (
                  <Text style={styles.noImageText}>No image available</Text>
                )}
                <Text style={styles.activityStatus}>Status: {activity.status}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
      <NavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
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
  goalDetails: {
    marginBottom: 20,
  },
  goalName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4057',
    marginTop: 20,
    textAlign: 'center',
  },
  goalType: {
    fontSize: 16,
    marginVertical: 10,
    marginLeft: 20,
  },
  goalStatus: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 20,
  },
  upborder: {
    borderBottomWidth: 5,
    borderBottomColor: '#8090d2',
  },
  activityItem: {
    marginBottom: 20,
    borderTopWidth: 2,
    borderTopColor: '#8090d2',
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
    borderRadius: 10,
  },
  noImageText: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
  },
  activityStatus: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingGif: {
    width: 500,
    height: 200,
    padding:50,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#2E4057',
  },
});
