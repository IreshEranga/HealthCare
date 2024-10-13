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
import Premium from '../../assets/images/prem.png';
//import { LinearGradient } from 'expo-linear-gradient';


export default function JourneyPage() {
  const [greetingMessage, setGreetingMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');
  const navigation = useNavigation();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  // Fetch user data and type from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('loggedInUser');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser && parsedUser.first_name) {
          setUserName(parsedUser.first_name);
        }

        if (parsedUser && parsedUser._id) {
          // Fetch the user type from the backend
          const response = await fetch(`${apiUrl}/users/users/${parsedUser._id}/type`);
          const data = await response.json();
          
          if (data.type) {
            setUserType(data.type);
          }
        }
      } catch (error) {
        console.log('Error fetching user data', error);
      }
    };

    fetchUserData();

    // Set greeting message based on time of day
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
        <View style={styles.header}>
          <Text style={styles.greeting}>Hi 👋 {greetingMessage}, {userName || 'Guest'}</Text>
          <Icon name="user" size={30} color="black" style={styles.profileIcon} onPress={() => navigation.navigate('ProfilePage')} />
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

          {/* Mental Health Suggestions Card */}
          <View style={styles.card1}>
            <Text style={styles.cardTitle}>Mental Health Suggestions
              <Image source={Premium} style={styles.premiumImage} />
            </Text>
            <Text style={styles.cardDetails}>Explore tips, quotes, vlogs, and audios to uplift your mental health.</Text>

            {userType === 'premium' ? (
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Journey/Suggestions/HealthSuggestions')}>
                <Text style={styles.buttonText}>Explore Suggestions</Text>
                <Image source={rightArrow} style={styles.buttonIcon} />
              </TouchableOpacity>
            ) : (
              <Text style={styles.premiumText} onPress={() => navigation.navigate('Premium/PremiumSummary')}>
                Upgrade to Premium to explore suggestions.
              </Text>
            )}
          </View>

          {/* Routine Plan */}
          <Text style={styles.sectionTitle}>Daily Reflections</Text>
          <View style={styles.card1}>
            <Image source={vector} style={styles.vector} />
            <Text style={styles.cardTitle}>Personalize Your Routines</Text>
            <Text style={styles.cardDetails}>Look back on your journey and reflect on your mental health progress..</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Journey/DailyRoutine/DailyRoutinePage')}>
              <Text style={styles.buttonText}>Review Progress</Text>
              <Image source={rightArrow} style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Fixed Navigation Bar */}
        <View style={styles.navbarContainer}>
          <NavBar />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    color:'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffc1cb',
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
    paddingBottom: 50,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
  },
  favoritesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    height: 200,
  },
  favoriteCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
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
    padding: 10,
    fontFamily: 'Times New Roman',
  },
  card: {
    backgroundColor: '#ffdae0',
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
  card1: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    borderColor:''
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Times New Roman',
  },
  cardDetails: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginVertical: 10,
  },
  premiumImage: {
    width: 50,
    height: 50,
    marginBottom: -20,
  },
  premiumText: {
    color: 'red',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#db8694',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
    fontFamily: 'Times New Roman',
  },
  buttonIcon: {
    width: 8,
    height: 15,
  },
  vector: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
