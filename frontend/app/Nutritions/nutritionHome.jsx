import React, { useEffect, useState } from 'react';
import { View, Text, Modal, Button, ActivityIndicator, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Image  } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NutriNavBar from '../../components/NutriNavBar';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import NavBar from '../../components/NavBar';

export default function NutritionHome() {
  const router = useRouter();
  const [totalCalories, setTotalCalories] = useState(0);
  const [loading, setLoading] = useState(true);
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [newCalorieGoal, setNewCalorieGoal] = useState('');
  const [modalVisible, setModalVisible] = useState(false);  // Modal state
  const [greetingMessage, setGreetingMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [_id, set_id] = useState('');
  const [userType, setUserType] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('loggedInUser');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser && parsedUser.first_name && parsedUser._id) {
          setUserName(parsedUser.first_name);
          set_id(parsedUser._id);
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

  useEffect(() => {
    const fetchUserType = async () => {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      if (_id) {
        console.log("Id get", _id);
        try {
          const response = await axios.get(`${apiUrl}/users/users/${_id}/type`);
          setUserType(response.data.type); 
        } catch (error) {
          console.error('Error fetching user type:', error);
        }
      }
    };

    fetchUserType();
    console.log("User type : ",userType);
  }, [_id]);

  // Function to fetch today's food logs
  const fetchFoodLogs = async () => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    try {
      //const response = await axios.get('http://192.168.8.147:8000/api/foodlogs/today');
      const response = await axios.get(`${apiUrl}/food-log/today`);
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

  const fillPercentage = (totalCalories / calorieGoal) * 100;

  // Function to handle saving the new calorie goal
  const handleSaveGoal = async () => {
    if (!isNaN(newCalorieGoal) && newCalorieGoal > 0) {
      setCalorieGoal(parseInt(newCalorieGoal));
      await AsyncStorage.setItem('calorieGoal', newCalorieGoal);  // Save new goal in AsyncStorage
      setModalVisible(false);  // Close the modal
      setNewCalorieGoal('');   // Clear the input field
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home/Welcome')}>
              <Icon name="arrow-left" size={24} color="#191952" />
          </TouchableOpacity>

          <Text style={styles.greeting}>
            {greetingMessage}, {userName ? userName : 'Guest'}
          </Text>
          <TouchableOpacity>
            <Icon style={styles.usericon} name="user" size={34} color="#191952" onPress={() => navigation.navigate('ProfilePage')}/>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>NUTRITION TRACKER</Text>

        {/*{loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
        ) : (
        <Text style={styles.caloriesText}>
          Total Calories for Today: {totalCalories} kcal
        </Text>
          )}*/}

        <ScrollView contentContainerStyle={styles.scrollContainer}>

          {/* Gauge (Circular Dial) for calories */}
          <View style={styles.gaugeContainer}>

            <View style={styles.goalHeader}>
              <Text style={styles.gaugeTitleText}>Your Goal</Text>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Icon name="pencil" size={20} color="#191952" style={styles.editIcon} />
              </TouchableOpacity>
            </View>

            <AnimatedCircularProgress
              size={200}
              width={15}
              fill={fillPercentage}
              tintColor="#FFDD00"
              backgroundColor="#FFFDE7"
              rotation={0}  // Start from the top
            >
              {() => (
              
                <Text style={styles.gaugeText}>
                  {totalCalories} / {calorieGoal} kcal
                </Text>
              )}
            </AnimatedCircularProgress>
          </View>

          <View style={styles.card}>
            <Icon name="heartbeat" size={30} color="#FFDD00" />
            <Text style={styles.cardTitle}>Calculate BMI and Calorie Goal</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/Nutritions/nutritionGoals')}>
              <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Icon name="cutlery" size={30} color="#FFDD00" />
            <Text style={styles.cardTitle}>Log Your Meal</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/Nutritions/addFood')}>
              <Text style={styles.buttonText}>Log Food</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Icon name="book" size={30} color="#FFDD00" />
            <Text style={styles.cardTitle}>View Your Meal Diary</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/Nutritions/dailyNutrition')}>
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
          <Image
            source={require('../../assets/images/prem.png')}  // Path to your image in assets
            style={{ width: 60, height: 60 }}  // Set the size of the image
          />
            <Text style={styles.cardTitle}>Personalized Meal Planner</Text>
            {userType === 'premium' ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/Nutritions/RecipeSearch')}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.infoText}>This feature is available for premium users only.</Text>
      )}
          </View>

          </ScrollView>

        </View>

        {/*<NutriNavBar style={styles.navigation} />*/}
        <NavBar/>

        {/* Modal for editing calorie goal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Calorie Goal</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new calorie goal"
              keyboardType="numeric"
              value={newCalorieGoal}
              onChangeText={setNewCalorieGoal}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveGoal}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',          // Align items in a row
    justifyContent: 'space-between',  // Distribute items with space between them
    alignItems: 'center',          // Align items vertically centered
    paddingHorizontal: 20,         // Add some horizontal padding
    paddingVertical: 10,           // Add some vertical padding
    backgroundColor: '#FFFDE7',
    marginBottom: 15,
    backgroundColor: 'white',
  },
  backButton: {
    marginRight: 20,
  },
  greeting: {
    fontSize: 24,
    color: '#191952',
  },
  usericon: {
    color:'#191952'
  },
  scrollContainer: {
    paddingBottom: 200,
  },
  title: {
    fontSize: 32,
    color: '#191952', // Your green color
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',

    // Adding text shadow similar to CSS shadow effect
    textShadowColor: 'rgba(0, 0, 0, 0.3)', // Shadow color (soft black)
    textShadowOffset: { width: 0, height: 2 }, // Horizontal and vertical offset
    textShadowRadius: 4, // Blur radius
  },
  gaugeContainer: {
    backgroundColor: 'rgba(128, 128, 235, 0.50)',
    borderRadius: 10,
    alignItems: 'center',
    width: '85%',
    padding: 20,
    margin:'auto',
    borderCurve: 5,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 10,
  },
  gaugeTitleText: {
    fontSize: 24,
    paddingBottom: 15,
    fontWeight: 'bold',
  },
  editIcon: {
    marginLeft: 10,
  },
  gaugeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191952',
  },
  goalContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  goalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  calculateButton: {
    backgroundColor: '#191952',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  calorieGoalText: {
    fontSize: 18,
    color: '#FF7043',
    marginTop: 10,
    textAlign: 'center',
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
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 13,
    width: 110,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#191952',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#191952',
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
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
    color: '#fff'
  },
  navigation : {
    marginTop:-100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#191952',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  infoText: {
    // Styling for non-premium user message
    textAlign: 'center',
    marginTop: 20,
    color: '#E2E2FA',
  },
});