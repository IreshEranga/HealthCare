import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import NavBar from '../../../components/NavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';


const companyIcons = {
  Alone: 'user',
  Partner: 'heart',
  Colleagues: 'users',
  Family: 'home',
  Friends: 'link',
};

const locationIcons = {
  Home: 'home',
  Work: 'briefcase',
  Institute: 'university',
  Outdoor: 'globe',
  Commuting: 'car',
};

const DoneAddMoodCheckInPage = () => {
  const [moodCheckInData, setMoodCheckInData] = useState(null);
  const navigation = useNavigation();
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

  const fetchMoodCheckInData = async () => {
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const response = await axios.get(`${apiUrl}/mood-check-in/${userID}/today`);
      if (response.data) {
        setMoodCheckInData(response.data);
      }
    } catch (error) {
      console.log('Error fetching mood check-in data', error);
    }
  };

  useEffect(() => {
    // Set a timeout to navigate after 5 seconds
    const timeout = setTimeout(() => {
      navigation.navigate('Journey/MoodCheckIn/MoodTrackingPage'); 
      console.log("Naviagtion success")
    }, 3000);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, [navigation]);
  
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userID) {
      fetchMoodCheckInData();
    }
  }, [userID]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

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
        <Text style={styles.headerText}>Mood Check-In</Text>
        <Text style={styles.dateText}>{formatDate(moodCheckInData.date)}</Text>

        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{moodCheckInData.mood === 'Very Sad' ? '😭' : moodCheckInData.mood === 'Happy' ? '😊' : '😐'}</Text>
        </View>

        <Text style={styles.moodLabel}>Feeling:</Text>
        <Text style={styles.moodText}>{moodCheckInData.mood}</Text>

        <View style={styles.rowIcons}>
          <Text style={styles.iconLabel}>With:</Text>
          <Icon name={companyIcons[moodCheckInData.company]} size={30} color="black" style={styles.iconSpacing} />
          <Icon name={locationIcons[moodCheckInData.location]} size={30} color="black" style={styles.iconSpacing} />
        </View>
      </View>

      <NavBar style={styles.navigation} />
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
    paddingHorizontal: 0,
  },
  headerText: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 50, 
    color: 'black' 
  },
  dateText: { 
    fontSize: 16, 
    color: '#6f6f6f', 
    marginBottom: 80,
    marginTop: -20,
  },
  emojiContainer: { 
    backgroundColor: 'white', 
    borderRadius: 100, 
    padding: 20, 
    marginBottom: 50 
  },
  emoji: { 
    fontSize: 50 
  },
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
  rowIcons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 20,
  },  
  iconSpacing: {
    marginHorizontal: 10,
  },  
  iconLabel: {
    marginRight: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a4b86',
  },
  companyText: {
    fontSize: 16,
    marginLeft: 5,
    marginRight: 15,
  },
  locationText: {
    fontSize: 16,
    marginLeft: 5,
  },
  finishedLabel: { 
    marginTop: 20, 
    fontSize: 18, 
    color: '#a69fa3' 
  },
  navigation: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  }
});

export default DoneAddMoodCheckInPage;