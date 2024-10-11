import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import FitNavBar from './FitNavBar';
import NavBar from '../../components/NavBar';

const FitnessPlan = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [greetingMessage, setGreetingMessage] = useState('');

  useEffect(() => {
    // Set greeting message based on current hour
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreetingMessage('Good Morning');
    } else if (currentHour < 18) {
      setGreetingMessage('Good Afternoon');
    } else {
      setGreetingMessage('Good Evening');
    }

    // Fetch user data
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
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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

      {/* Today Workout Text with Check Button */}
      <View style={styles.todayWorkoutContainer}>
        <Text style={styles.todayWorkoutText}>Today Workout</Text>
        <TouchableOpacity
          style={styles.checkButton}
          onPress={() => navigation.navigate('Fitness/Reminder')}
        >
          <Text style={styles.checkButtonText}>Check</Text>
        </TouchableOpacity>
      </View>

      {/* Home Workout Image Button with Text and Arrow */}
      <TouchableOpacity
        style={styles.imageButton}
        onPress={() => navigation.navigate('Fitness/FitnessHome')}
      >
        <Image
          style={styles.fullImage}
          source={{
            uri: "https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_842,ar_1.2,q_auto:eco,dpr_2,f_auto,fl_progressive/image/test/sku-card-widget/gold2.png",
          }}
        />
        <View style={styles.textOverlay}>
          <Text style={styles.overlayText}>Home Workout</Text>
          <MaterialIcons name="arrow-forward" size={24} color="white" />
        </View>
      </TouchableOpacity>

      <View style={styles.spacer} />

      {/* Personalized Workout Button */}
      <TouchableOpacity
        style={styles.personalizedWorkoutButton}
        onPress={() => navigation.navigate('Fitness/PersonalizedWorkout')}
      >
        <Image
          style={styles.fullImage}
          source={{
            uri: "https://img.freepik.com/free-vector/training-home-concept_52683-37093.jpg",
          }}
        />
        <View style={styles.textOverlay}>
          <Text style={styles.overlayText}>Personalized Workout</Text>
          <MaterialIcons name="arrow-forward" size={24} color="white" />
        </View>
      </TouchableOpacity>

      {/* Fixed Navigation Bar */}
      <View style={styles.navbarContainer}>
        <NavBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    paddingHorizontal: 8,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userIcon: {
    paddingHorizontal: 8,
  },
  todayWorkoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#6e8af0',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  todayWorkoutText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6e8af0',
  },
  checkButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  checkButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageButton: {
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  fullImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  spacer: {
    height: 40,
  },
  personalizedWorkoutButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 80,
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default FitnessPlan;
