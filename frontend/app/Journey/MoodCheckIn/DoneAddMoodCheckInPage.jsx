import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute to get params
import NavBar from '../../../components/NavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


// Icons mapping
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

const moodIcons = {
  'Very Sad': '😭',
  'Worried': '😟',
  'Okay': '😐',
  'Happy': '😊',
  'Very Happy': '😄',
};

const DoneAddMoodCheckInPage = () => {
  const [moodCheckInData, setMoodCheckInData] = useState(null);
  const route = useRoute(); 
  const navigation = useNavigation();
  const [userID, setUserID] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Journey/MoodCheckIn/MoodTrackingPage'); 
      //console.log("Naviagtion success")
    }, 4000);

    return () => clearTimeout(timeout);
  }, [navigation]);
  useEffect(() => {
    if (route.params?.moodCheckInData) {
      setMoodCheckInData(route.params.moodCheckInData);
    } else {
      fetchUserData();
    }
  }, [route.params]);

  // Fetch user data in case we need to fetch from the API
  const fetchUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('loggedInUser');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      if (parsedUser && parsedUser.userID) {
        setUserID(parsedUser.userID);
        fetchMoodCheckInData(parsedUser.userID);
      }
    } catch (error) {
      console.log('Error fetching user data', error);
    }
  };

  // Fetch data from API if no params were passed
  const fetchMoodCheckInData = async (userID) => {
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

  // Format date
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

        {moodCheckInData && (
          <>
            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>{moodIcons[moodCheckInData.mood]}</Text>
            </View>

            <Text style={styles.moodLabel}>Feeling:</Text>
            <Text style={styles.moodText}>{moodCheckInData.mood}</Text>

            <View style={styles.rowIcons}>
              <Icon name={companyIcons[moodCheckInData.company]} size={40} color="black" style={styles.iconSpacing} />
              <Icon name={locationIcons[moodCheckInData.location]} size={40} color="black" style={styles.iconSpacing} />
            </View>
          </>
        )}
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
    marginBottom: 100, 
    color: 'black' 
  },
  dateText: { 
    fontSize: 16, 
    color: '#6f6f6f', 
    marginBottom: 80,
    marginTop: -60,
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
    marginHorizontal: 18,
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