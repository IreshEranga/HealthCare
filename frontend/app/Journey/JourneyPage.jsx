import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavBar from '../../components/NavBar';
import moodCheckInImage from '../../assets/images/moodCheckIn.png';
import journalingImage from '../../assets/images/journaling.png';
import vector from '../../assets/images/Vector.png';
import rightArrow from '../../assets/images/rightArrow.png';
import { LinearGradient } from 'expo-linear-gradient';


export default function JourneyPage() {
  const [greetingMessage, setGreetingMessage] = useState('');
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();

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

    const currentHour = new Date().getHours();
    let message = '';

    if (currentHour < 12) {
      message = 'Good Morning';
    } else if (currentHour < 18) {
      message = 'Good Afternoon';
    } else {
      message = 'Good Evening';
    }

    setGreetingMessage(message);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient 
        colors={['#D16297','#C384A8', '#BCBCBC']}
        style={styles.background}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Hi 👋 {greetingMessage}, {userName || 'Guest'}</Text>
          <Icon name="user" size={30} color="black" style={styles.profileIcon} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Favorites Section */}
          <Text style={styles.sectionTitle}>FAVORITES</Text>
          <View style={styles.favoritesContainer}>
            <TouchableOpacity style={styles.favoriteCard} onPress={() => navigation.navigate('Journey/MoodCheckIn/MoodTrackingPage')}>
              <Image source={moodCheckInImage} style={styles.favoriteImage} />
              <Text style={styles.favoriteText}>Mood Check-In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.favoriteCard} onPress={() => navigation.navigate('Journey/Journaling/JournalingPage')}>
              <Image source={journalingImage} style={styles.favoriteImage} />
              <Text style={styles.favoriteText}>Journaling</Text>
            </TouchableOpacity>
          </View>

          {/* Routine Plan */}
          <Text style={styles.sectionTitle}>Routine Plan</Text>
          <View style={styles.card}>
            <Image source={vector} style={styles.vector} />
            <Text style={styles.cardTitle}>Personalize Your Routines</Text>
            <Text style={styles.cardDetails}>
              Take the test and discover daily practices that align with your personality.
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Journey/DailyRoutine/DailyRoutinePage')}>
              <Text style={styles.buttonText}>Take Test</Text>
              <Image source={rightArrow} style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Fixed Navigation Bar */}
        <View style={styles.navbarContainer}>
          <NavBar />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#BCBCBC',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  profileIcon: {
    marginRight: 10,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 150,  // Adjust for navbar
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 25,
    marginBottom:15,
    alignSelf:'center',
  },
  favoritesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    height:200,
  },
  favoriteCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  favoriteImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  favoriteText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  cardDetails: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3A63F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  buttonIcon: {
    width: 15,
    height: 15,
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});