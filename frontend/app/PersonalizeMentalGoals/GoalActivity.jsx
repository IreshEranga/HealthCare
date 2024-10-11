import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, Animated, Easing } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import NavBar from '../../components/NavBar';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadingAnimation from '../../assets/videos/square.gif';
import ErrorAnimation from '../../assets/videos/error.gif';
import completeGif from '../../assets/videos/complete.gif';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function GoalActivity() {
  const route = useRoute();
  const navigation = useNavigation();
  const { goal } = route.params || {};

  const [_id, set_id] = useState('');
  const goalData = goal?.data || goal;
  const [filteredGoalData, setFilteredGoalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const animatedOverlay = useRef(new Animated.Value(0)).current;

  const totalActivities = filteredGoalData?.activities?.length || 0;
  const completedActivities = filteredGoalData?.activities?.filter(activity => activity.status === 'completed').length || 0;
  const progress = totalActivities > 0 ? completedActivities / totalActivities : 0;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('loggedInUser');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        console.log('Parsed User:', parsedUser); // Debugging log

        if (parsedUser && parsedUser._id) {
          set_id(parsedUser._id);
        }
      } catch (error) {
        console.log('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleNavigate = (activity) => {
    navigation.navigate('PersonalizeMentalGoals/GoalDetail', { 
      activity,
      goalId: filteredGoalData._id
    });
  };

  useEffect(() => {
    const fetchGoals = async () => {
      console.log("User id in fetch", _id); // Debugging log
      if (!_id) return; // Don't fetch if user ID is not set

      try {
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
  }, [_id, goalData?.name]); // Add _id to dependencies

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedOverlay, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ).start();
  }, []);

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

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{Math.round(progress * 100)}% completed</Text>
          <View style={styles.progressBarBackground}>
            <LinearGradient
              colors={['#73a773', '#42a175', '#508455']}
              start={[0, 0]}
              end={[1, 0]}
              style={[styles.staticProgressBar, { width: `${progress * 100}%` }]}
            />
          </View>
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
  errorText : {
    textAlignVertical:'center',
    textAlign:'center',
    marginTop:350
  },
  errorGif:{
    width:100,
    height:100,
    position:'absolute',
    top:240,
    left:150,
  },
  statusAndStart:{
    flexDirection:'row',
    marginTop:10,
  },
  arrow : {
    marginLeft:200
  },
  space : {
    paddingTop:150,
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
  progressBarBackground: {
    width: 200, // Max width for the progress bar
    height: 30,
    backgroundColor: '#ccc',
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  staticProgressBar: {
    height: '100%',
    backgroundColor: '#2E4057',
    borderRadius: 15,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  movingBars: {
    position: 'absolute',
    height: '100%',
    width: 50, // Width of the moving bar
    backgroundColor: '#2E4057', // Same color as the static progress bar
    opacity: 0.5, // Make it semi-transparent
    borderRadius: 15,
  },
});
