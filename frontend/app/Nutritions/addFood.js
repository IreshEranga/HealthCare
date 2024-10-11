import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import NutriNavBar from '../../components/NutriNavBar';
import axios from 'axios';
import NavBar from '../../components/NavBar';

export default function AddFood() {
  const [query, setQuery] = useState('');
  const [foodResults, setFoodResults] = useState([]);
  const [selectedMealType, setSelectedMealType] = useState('Breakfast');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const API_KEY = 'VrcT9RDOlvlDus5BlnfPM4gQbxiPHrkE3bAsQvGE';

  // Function to search food using EDAMAM API
  const searchFood = async () => {
    try {
      const response = await axios.get(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${'VrcT9RDOlvlDus5BlnfPM4gQbxiPHrkE3bAsQvGE'}`
          
      );

      setFoodResults(response.data.foods);
    } catch (error) {
      console.error('Error searching food:', error.response ? error.response.data : error.message);
    }
  };

  // Function to add selected food to MongoDB via your backend
  const addFoodToLog = async (foodItem) => {
    const foodData = {
      foodItem, // The food item selected
      mealType: selectedMealType,
    };
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    console.log('Food Data to be sent:', foodData);

    try {
      console.log('Selected Meal Type:', selectedMealType);

      if (!selectedMealType) {
        console.error('Selected meal type is undefined');
        Alert.alert('Please select a meal type before adding food.');
        return; // Exit the function if meal type is not selected
      }

      const response = await axios.post(`${apiUrl}/food-log/add`, foodData); // Your backend URL
      Alert.alert(response.data.message);
    } catch (error) {
      console.error(error);
      Alert.alert('Error adding food log');
    }
  };

  return (
    <View style={styles.container}>

        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Nutritions/nutritionHome')}>
              <Icon name="arrow-left" size={24} color="#191952" />
          </TouchableOpacity>

          <Text style={styles.title}>SEARCH FOOD</Text>

          <TouchableOpacity>
            <Icon style={styles.usericon} name="user" size={34} color="#191952" onPress={() => navigation.navigate('ProfilePage')}/>
          </TouchableOpacity>
        </View>  
      
      <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search for food"
        value={query}
        onChangeText={setQuery}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginB: 20 }}>

      <TouchableOpacity style={styles.searchButton} onPress={searchFood}>
          <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>


       {/* Meal Type Selector */}
       <Picker
          selectedValue={selectedMealType}
          style={{ height: 50, width: 140, marginBottom: 20 }}
          onValueChange={(itemValue) => {
            console.log('Selected meal type changed to:', itemValue);
            setSelectedMealType(itemValue);
          }}
        >
          <Picker.Item label="Breakfast" value="Breakfast" />
          <Picker.Item label="Lunch" value="Lunch" />
          <Picker.Item label="Dinner" value="Dinner" />
          <Picker.Item label="Snack" value="Snack" />
        </Picker>
      </View>

      <FlatList
        data={foodResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          // Extract calories (nutrientId 1008 = Calories)
          const calories = item.foodNutrients.find(nutrient => nutrient.nutrientId === 1008)?.value || 0;

          return (
          <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text>{item.description}</Text>
              <Text>{calories} kcal per serving</Text>
            </View>

            <TouchableOpacity onPress={() => addFoodToLog(item)}>
              <Text>
                <Icon name="plus" size={24} color="#191952" />
              </Text>
          </TouchableOpacity>

            
          </View>)
        }}
      />

      </View>
      {/*<NutriNavBar style={styles.navigation} />*/}
      <NavBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',          // Align items in a row
    justifyContent: 'space-between',  // Distribute items with space between them
    alignItems: 'center',          // Align items vertically centered
    paddingHorizontal: 20,         // Add some horizontal padding
    paddingVertical: 10,           // Add some vertical padding
    backgroundColor: '#FFFDE7',
    marginBottom: 25,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28,
    color: '#191952', // Your green color
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchContainer: {
    paddingTop: 5,
    padding: 30,
  },
    searchButton: {
      backgroundColor: 'transparent',
      borderColor: '#191952', 
      borderWidth: 5, 
      borderRadius: 20, 
      color: '#3B3B3B', 
      width: '35%',
      minHeight: 40,
      padding: 7,
      cursor: 'pointer', 
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#191952',
      textAlign: 'center',
    },
    searchButtonDisabled: {
      pointerEvents: 'none', 
    },
    searchButtonHover: {
      color: '#fff', 
      backgroundColor: '#1A1A1A', 
      shadowColor: 'rgba(0, 0, 0, 0.25)', 
      shadowOffset: { width: 0, height: 8 }, 
      shadowOpacity: 0.15,
      shadowRadius: 15, 
      transform: [{ translateY: -2 }], 
    },
    searchButtonActive: {
      shadowColor: 'transparent', 
      transform: [{ translateY: 0 }], 
    },  
  mealTypeButton: {
    width: 150,
    backgroundColor: '#191952',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mealTypeText: {
    paddingTop: 20,
    paddingBottom: 20,
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: 250,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalItem: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#191952',
    fontWeight: 'bold',
  },
});

