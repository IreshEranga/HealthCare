import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, Alert  } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import NutriNavBar from '../../components/NutriNavBar';
import axios from 'axios';

const DisplayFoodLog = () => {
  const [foodLogs, setFoodLogs] = useState([]);
  const [error, setError] = useState('');
  const [userID, setUserID] = useState('');
  const [loading, setLoading] = useState(true);
  const [collapsedSections, setCollapsedSections] = useState({
    breakfast: true,
    lunch: true,
    dinner: true,
    snacks: true,
  });
  const navigation = useNavigation();

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

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchFoodLogs = async () => {
      try {
        const response = await axios.get('http://192.168.8.147:8000/food-log/today'); // Ensure the correct port is used
        console.log('Fetched Food Logs:', JSON.stringify(response.data, null, 2));
        setFoodLogs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching food logs');
        console.error('Error fetching food logs:', err);
        setLoading(false);
      }
    };

    fetchFoodLogs();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Display a loading indicator while data is being fetched
  }

  if (error) {
    return <Text>{error}</Text>; // Display error if it exists
  }

  const toggleSection = (section) => {
    setCollapsedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  /*const deleteFoodItem = async (logId, foodItemId) => {
    try {
      const response = await axios.delete(`http://192.168.8.147:8000/food-log/delete/${logId}/${foodItemId}`);
      console.log('Attempting to delete item with ID:', foodItemId);
  
      const updatedLogs = foodLogs.map(log => ({
        ...log,
        foodItems: log.foodItems.filter(food => food._id !== foodItemId),
      }));
      setFoodLogs(updatedLogs);
    } catch (err) {
      console.error('Error deleting food item:', err);
      Alert.alert('Error', 'Could not delete the food item. Please try again.');
    }
  };
  

  const confirmDelete = (logId, foodItemId) => {
    Alert.alert(
      "Delete Food Item",
      "Are you sure you want to delete this food item?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => deleteFoodItem(logId, foodItemId)
        }
      ]
    );
  };*/
  


  /*const renderMealType = (mealType) => (
    foodLogs
      .filter(log => log.mealType === mealType)
      .map((log, index) => (
        <View key={index} style={styles.foodItem}>
          <Text>{log.foodItems[0].name} - {log.foodItems[0].calories} kcal</Text>
        </View>
      ))
  );*/

  // Function to render food items for each meal type
  const renderFoodItems = (mealType) => {
    const filteredLogs = foodLogs.filter(log => log.mealType.toLowerCase() === mealType.toLowerCase());
  
    if (filteredLogs.length === 0) {
      return <Text>No food items logged for {mealType}.</Text>;
    }
  
    return filteredLogs.map((log, index) => (
      <View key={index} style={styles.card}>
        {log.foodItems.map((food, idx) => (
          <View key={idx} style={styles.foodItemContainer}>
            <Text style={styles.foodName}>{food.name}</Text>
            <Text style={styles.foodCalories}>{food.calories} kcal</Text>
            {/* Correctly pass log._id and food._id to confirmDelete */}
            {/*<TouchableOpacity onPress={() => confirmDelete(log._id, food._id)} style={styles.deleteButton}></TouchableOpacity>*/}
          </View>
        ))}
      </View>
    ));
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home/Welcome')}>
              <Icon name="arrow-left" size={24} color="#8BC34A" />
          </TouchableOpacity>

          <Text style={styles.title}>FOOD DIARY</Text>

          <TouchableOpacity>
            <Icon style={styles.usericon} name="user" size={34} color="#8BC34A" onPress={() => navigation.navigate('ProfilePage')}/>
          </TouchableOpacity>
        </View> 

    <ScrollView style={styles.scrollContainer}>

      {/* Breakfast Section */}
      <TouchableOpacity onPress={() => toggleSection('breakfast')} style={styles.headingContainer}>
        <Text style={styles.heading}>Breakfast</Text>
        <Text style={styles.arrow}>{collapsedSections.breakfast ? '▼' : '▲'}</Text>
      </TouchableOpacity>
      {!collapsedSections.breakfast && renderFoodItems('Breakfast')}

      {/* Lunch Section */}
      <TouchableOpacity onPress={() => toggleSection('lunch')} style={styles.headingContainer}>
        <Text style={styles.heading}>Lunch</Text>
        <Text style={styles.arrow}>{collapsedSections.lunch ? '▼' : '▲'}</Text>
      </TouchableOpacity>
      {!collapsedSections.lunch && renderFoodItems('Lunch')}

      {/* Dinner Section */}
      <TouchableOpacity onPress={() => toggleSection('dinner')} style={styles.headingContainer}>
        <Text style={styles.heading}>Dinner</Text>
        <Text style={styles.arrow}>{collapsedSections.dinner ? '▼' : '▲'}</Text>
      </TouchableOpacity>
      {!collapsedSections.dinner && renderFoodItems('Dinner')}

      {/* Snacks Section */}
      <TouchableOpacity onPress={() => toggleSection('snacks')} style={styles.headingContainer}>
        <Text style={styles.heading}>Snacks</Text>
        <Text style={styles.arrow}>{collapsedSections.snacks ? '▼' : '▲'}</Text>
      </TouchableOpacity>
      {!collapsedSections.snacks && renderFoodItems('Snack')}
    </ScrollView>
    <NutriNavBar style={styles.navigation} />
    </View>
    
  );
};

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
  title: {
    fontSize: 28,
    color: '#8BC34A', // Your green color
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align heading and arrow at opposite ends
    alignItems: 'center',
    backgroundColor: 'rgba(71, 127, 73, 0.35)', // Optional: Add a background to the header to make it stand out
    padding: 20,
    marginVertical: 30,
    borderRadius: 5,
    margin: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginLeft: 30,
    marginRight: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  foodItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
  },
  foodCalories: {
    fontSize: 16,
    color: '#888',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DisplayFoodLog;
