import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ActivityIndicator, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavBar from '../../components/NavBar';
import rightArrow from '../../assets/images/rightArrow.png';
import { LinearGradient } from 'expo-linear-gradient';

export default function NutritionHome() {
  const router = useRouter();
  const [totalCalories, setTotalCalories] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  // Function to fetch today's food logs
  const fetchFoodLogs = async () => {
    try {
      //const response = await axios.get('http://192.168.8.148:8000/api/foodlogs/today');
      const response = await axios.get('http://192.168.8.148:8000/food-log/today');
      const foodLogs = response.data;
  
      let totalCaloriesForDay = 0;
      foodLogs.forEach((log) => {
        log.foodItems.forEach((item) => {
          totalCaloriesForDay += item.calories;
        });
      });
  
      setTotalCalories(totalCaloriesForDay);
    } catch (error) {
      console.error('Error fetching food logs:', error);
      setError('Failed to fetch food logs.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch food logs when the component mounts
  useEffect(() => {
    fetchFoodLogs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        <View >
        <Text style={styles.greeting}>
          {greetingMessage}, {userName ? userName : 'Guest'}
        </Text>
        <View>
          <Icon style={styles.usericon} name="user" size={34} color="white" onPress={() => navigation.navigate('ProfilePage')}/>
        </View>

      <Text style={styles.title}>Nutrition Tracker</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.caloriesText}>
          Total Calories for Today: {totalCalories} kcal
        </Text>
      )}

<ScrollView contentContainerStyle={styles.scrollContainer}>

      <View style={styles.card}>
        <Icon name="cutlery" size={30} color="#FF7043" />
        <Text style={styles.cardTitle}>Log Your Meal</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/Nutritions/addFood')}>
            <Text style={styles.buttonText}>Log Food</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Icon name="book" size={30} color="#FF7043" />
      <Text style={styles.cardTitle}>View Your Meal Diary</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/Nutritions/dailyNutrition')}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Icon name="heartbeat" size={30} color="#FF7043" />
      <Text style={styles.cardTitle}>Calculate BMI and Calorie Goal</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/Nutritions/nutritionGoals')}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </View>

      </ScrollView>

      <NavBar  style={styles.navigation}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFDE7',
    flex: 1,
  },
  title: {
    fontSize: 32,
    color: 'yellow',
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign:'center'
  },
  scrollContainer: {
    paddingBottom: 200,
  },
  greeting: {
    textAlign: 'left',
    fontSize: 20,
    marginTop: 30,
    marginLeft: 25,
    color: '#8BC34A',
  },
  usericon: {
    marginLeft: 320,
    marginTop: -30,
    color:'#8BC34A'
  },
  caloriesText: {
    color: '#FF7043',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
    marginLeft: 25,
    textAlign:'center',
    marginBottom:0,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#8BC34A',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  marginTop: 13,
  width: 160,
  alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginLeft: 60,
    marginRight: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginTop: 30,
    opacity: 0.8,
    justifyContent: 'center', // Vertically center
    alignItems: 'center',     // Horizontally center
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  navigation : {
    marginTop:-150,
  },
});