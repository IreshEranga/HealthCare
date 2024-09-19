import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DoneAddMoodCheckInPage = () => {
  const [moodCheckInData, setMoodCheckInData] = useState(null);
  const navigation = useNavigation();
  const [userID, setUserID] = useState('');

  // Fetch logged-in user data
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

  // Fetch today's mood check-in data
  const fetchMoodCheckInData = async () => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    try {
      const response = await axios.get(`${apiUrl}/mood-checks/${userID}/today`);
      if (response.data) {
        setMoodCheckInData(response.data);
      }
    } catch (error) {
      console.log('Error fetching mood check-in data', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    if (userID) {
      fetchMoodCheckInData();
    }
  }, [userID]);

  if (!moodCheckInData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.messageText}>Loading your mood check-in...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={styles.headerText}>Mood Check-In</Text>
        <Text style={styles.dateText}>{moodCheckInData.date}</Text>

        {/* Mood Emoji */}
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>😊</Text> {/* Adjust emoji based on mood */}
        </View>

        {/* Mood Label */}
        <Text style={styles.moodLabel}>Feeling</Text>
        <Text style={styles.moodText}>Okay</Text> {/* Replace with dynamic data if available */}

        {/* What you were doing */}
        <Text style={styles.activityLabel}>This is what you were doing:</Text>

        <View style={styles.activityIconsContainer}>
          {moodCheckInData.selectedActivity.map((activity, index) => (
            <View key={index} style={styles.activityIcon}>
              {/* Replace these with your own activity icons */}
              <Icon name="book" size={40} color="black" />
              <Text style={styles.activityText}>{activity}</Text>
            </View>
          ))}
        </View>

        {/* Finished label */}
        <Text style={styles.finishedLabel}>Finished</Text>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Walk')}>
          <Icon name="child" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Food')}>
          <Icon name="cutlery" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Stats')}>
          <Icon name="line-chart" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EditMood')}>
          <Icon name="pencil" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f9c8e6', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  content: { 
    alignItems: 'center', 
    paddingHorizontal: 20 
  },
  headerText: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    color: 'black' 
  },
  dateText: { 
    fontSize: 16, 
    color: '#6f6f6f', 
    marginBottom: 20 
  },
  emojiContainer: { 
    backgroundColor: 'white', 
    borderRadius: 100, 
    padding: 20, 
    marginBottom: 20 
  },
  emoji: { 
    fontSize: 50 
  }, // Adjust emoji based on the user's mood
  moodLabel: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#a69fa3', 
    marginBottom: 5 
  },
  moodText: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#6a4b86', 
    marginBottom: 20 
  },
  activityLabel: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  activityIconsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '80%' 
  },
  activityIcon: { 
    alignItems: 'center' 
  },
  activityText: { 
    fontSize: 14, 
    marginTop: 5 
  },
  finishedLabel: { 
    marginTop: 20, 
    fontSize: 18, 
    color: '#a69fa3' 
  },

  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
  },
});

export default DoneAddMoodCheckInPage;