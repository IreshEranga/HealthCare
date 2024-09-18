import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import NavBar from '../../components/NavBar';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadingAnimation from '../../assets/videos/square.gif';
import ErrorAnimation from '../../assets/videos/error.gif';
import completeGif from '../../assets/videos/complete.gif';
import * as Progress from 'react-native-progress';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function GoalActivity() {
  const route = useRoute();
  const navigation = useNavigation();
  const { goal } = route.params || {};

  const goalData = goal?.data || goal;
  const [filteredGoalData, setFilteredGoalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Only calculate progress if filteredGoalData is available and has activities
  const totalActivities = filteredGoalData?.activities?.length || 0;
  const completedActivities = filteredGoalData?.activities?.filter(activity => activity.status === 'completed').length || 0;
  const progress = totalActivities > 0 ? completedActivities / totalActivities : 0;

  const handleNavigate = (activity) => {
    navigation.navigate('PersonalizeMentalGoals/GoalDetail', { 
      activity,
      goalId: filteredGoalData._id // Pass the goal ID
    });
  };

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const _id = '66deb5a5a1f5bf364dbbc274'; // Replace with actual user ID logic
        const response = await axios.get(`${apiUrl}/users/users/${_id}/goals`);
        const goals = response.data;

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


  // Update animated progress when the actual progress changes
  useEffect(() => {
    if (progress !== animatedProgress) {
      setTimeout(() => {
        setAnimatedProgress(progress);
      }, 500); // Add a delay to animate smoothly
    }
  }, [progress]);

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
        <Image source={ErrorAnimation} style={styles.errorGif} />
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

        {/* Animated Progress Bar */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{Math.round(progress * 100)}% completed</Text>
          <Progress.Bar 
            progress={animatedProgress} 
            width={200} 
            color="#2E4057" 
            unfilledColor="#ccc"
            borderWidth={0}
            height={30}
            animated={true} // Enable animation
            animationType="spring" // Optional: you can set the animation type
          />
        </View>

        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.goalDetails}>
            {filteredGoalData.activities.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.dayandani}>
                  <Text style={styles.activityDay}>Day {activity.day}</Text>
                  {activity.status === 'completed' && (
                    <Image source={completeGif} style={styles.completeGif} />
                  )}
                </View>
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
                <View style={styles.statusAndStart}>
                  <Text style={styles.activityStatus}>Status: {activity.status}</Text>
                  <Icon 
                    style={styles.arrow} 
                    name="arrow-right" 
                    size={30} 
                    color="#2E4057" 
                    onPress={() => handleNavigate(activity)}  
                  />
                </View>
              </View>
            ))}
          </View>
          <Text style={styles.space}></Text>
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
    padding:10,
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
    marginTop:10,
    marginBottom:10,
  },
  activityInstruction: {
    fontSize: 14,
    marginBottom: 10,
  },
  activityImage: {
    width: '100%',
    height: 150,
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
    marginTop:5
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
  errorGif:{
    width:100,
    height:100,
  },
  statusAndStart:{
    flexDirection:'row',
    marginTop:10,
  },
  arrow : {
    marginLeft:200
  },
  space : {
    paddingTop:100,
  },
  completeGif:{
    width: 40,
    height: 30,
    marginLeft: 10,
    marginTop:6,
  },
  dayandani : {
    flexDirection:'row',
  },
  progressContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    color: '#2E4057',
    marginBottom: 10,
  },
  
});
