/*import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MealPlanner = () => {
    const [userType, setUserType] = useState('normal'); // Default to normal user
    const [mealsPerDay, setMealsPerDay] = useState(7); // Default to 7 meals
    const [filters, setFilters] = useState({
        allergies: [],
        calories: { min: 0, max: 2000 },
        nutrients: {},
    });
    const [mealPlan, setMealPlan] = useState(null);
    const [loading, setLoading] = useState(false);    
    const [allergies, setAllergies] = useState([]); // Allergies
    const [dishTypes, setDishTypes] = useState([]); // Dish types
    const [calories, setCalories] = useState({ min: 0, max: 2000 }); // Caloric intake limits

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('loggedInUser');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser) {
          setUserType(parsedUser.type); // Assuming the user object has a 'type' field
        }
      } catch (error) {
        console.log('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleMealPlanGeneration = async () => {
    if (userType !== 'premium') {
      Alert.alert('Access Denied', 'This feature is available for premium users only.');
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post('https://api.edamam.com/api/meal-planner', {
        size: mealsPerDay,
        plan: {
          sections: {
            Breakfast: {
              accept: {
                all: [
                  { dish: dishTypes }, // Use user-defined dish types
                  { meal: ['breakfast'] },
                ],
              },
              fit: {
                ENERC_KCAL: {
                  min: calories.min,
                  max: calories.max,
                },
              },
            },
            Lunch: {
              accept: {
                all: [
                  { dish: dishTypes },
                  { meal: ['lunch/dinner'] },
                ],
              },
              fit: {
                ENERC_KCAL: {
                  min: calories.min,
                  max: calories.max,
                },
              },
            },
            Dinner: {
              accept: {
                all: [
                  { dish: dishTypes },
                  { meal: ['lunch/dinner'] },
                ],
              },
              fit: {
                ENERC_KCAL: {
                  min: calories.min,
                  max: calories.max,
                },
              },
            },
          },
        },
      });
  
      setMealPlan(response.data); // Store the meal plan
    } catch (error) {
      console.error('Error generating meal plan:', error);
      Alert.alert('Error', 'Unable to generate meal plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Planner</Text>

      {userType === 'premium' ? (
        <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Meals per day"
          keyboardType="numeric"
          value={String(mealsPerDay)}
          onChangeText={(text) => setMealsPerDay(Number(text))}
        />
      
        <TextInput
          style={styles.input}
          placeholder="Allergies (comma separated)"
          value={allergies.join(', ')}
          onChangeText={(text) => setAllergies(text.split(',').map(item => item.trim()))}
        />
      
        <TextInput
          style={styles.input}
          placeholder="Dish Types (comma separated)"
          value={dishTypes.join(', ')}
          onChangeText={(text) => setDishTypes(text.split(',').map(item => item.trim()))}
        />
      
        <TextInput
          style={styles.input}
          placeholder="Min Calories"
          keyboardType="numeric"
          value={String(calories.min)}
          onChangeText={(text) => setCalories({ ...calories, min: Number(text) })}
        />
      
        <TextInput
          style={styles.input}
          placeholder="Max Calories"
          keyboardType="numeric"
          value={String(calories.max)}
          onChangeText={(text) => setCalories({ ...calories, max: Number(text) })}
        />
      
        <Button title="Generate Meal Plan" onPress={handleMealPlanGeneration} />
      </ScrollView>
      
      ) : (
        <Text style={styles.accessDenied}>Premium access required to use this feature.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  mealPlanContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  mealPlanTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  accessDenied: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default MealPlanner;*/

import React, { useState, useEffect } from 'react';
//import { View, Text, TextInput, CheckBox, Button, StyleSheet } from 'react-native';
import { View, Text, Modal, Button, ActivityIndicator, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput} from 'react-native';
//import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomCheckbox = ({ label, onChange, value }) => {
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
      onPress={() => onChange(!value)}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderWidth: 1,
          borderColor: '#000',
          backgroundColor: value ? '#000' : '#FFF',
          marginRight: 10,
        }}
      />
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const MealPlanner = () => {
  const [mealPlan, setMealPlan] = useState({
    mealsPerDay: [],
    allergies: [],
    diets: [],
    calories: { min: '', max: '' },
    nutrients: [],
    meals: {
      Breakfast: [],
      Lunch: [],
      Dinner: [],
    },
  });

  const [isPremiumUser, setIsPremiumUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('loggedInUser');
        if (userData) {
          const parsedData = JSON.parse(userData);
          // Use the parsed data (e.g., set state or handle user details)
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCalorieChange = (event) => {
    const { name, value } = event.target;
    setMealPlan(prevState => ({
      ...prevState,
      calories: {
        ...prevState.calories,
        [name]: value
      }
    }));
  };

  const handleCheckboxChange = (checked, mealType, name) => {
    setMealPlan(prevState => {
      const updatedMeals = { ...prevState.meals };
      const updatedMeal = [...updatedMeals[mealType]];

      if (checked) {
        updatedMeal.push(name);
      } else {
        const index = updatedMeal.indexOf(name);
        if (index > -1) updatedMeal.splice(index, 1);
      }

      return {
        ...prevState,
        meals: {
          ...updatedMeals,
          [mealType]: updatedMeal,
        },
      };
    });
  };

  const handleSubmit = async () => {
    if (!isPremiumUser) {
      alert('This feature is only available for premium users.');
      return;
    }

    try {
      const response = await axios.post('/api/meal-planner', mealPlan);
      console.log('Meal Plan created successfully:', response.data);
    } catch (error) {
      console.error('Error creating meal plan:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Planner</Text>
      <ScrollView>
        <View>
        <Text style={{ fontSize: 18 }}>Meals Per Day</Text>
        <CustomCheckbox
          label="Breakfast"
          value={mealPlan.mealsPerDay.includes('Breakfast')}
          onChange={(value) => handleCheckboxChange(value, 'mealsPerDay', 'Breakfast')}
        />
        <CustomCheckbox
          label="Lunch"
          value={mealPlan.mealsPerDay.includes('Lunch')}
          onChange={(value) => handleCheckboxChange(value, 'mealsPerDay', 'Lunch')}
        />
        <CustomCheckbox
          label="Dinner"
          value={mealPlan.mealsPerDay.includes('Dinner')}
          onChange={(value) => handleCheckboxChange(value, 'mealsPerDay', 'Dinner')}
        />
      </View>

      <View>
        <Text style={{ fontSize: 18 }}>Allergies</Text>
        <CustomCheckbox
          label="Celery-Free"
          value={mealPlan.allergies.includes('celery-free')}
          onChange={(value) => handleCheckboxChange(value, 'allergies', 'celery-free')}
        />
        <CustomCheckbox
          label="Dairy-Free"
          value={mealPlan.allergies.includes('dairy-free')}
          onChange={(value) => handleCheckboxChange(value, 'allergies', 'dairy-free')}
        />
      </View>

      <View>
        <Text style={{ fontSize: 18 }}>Diets</Text>
        <CustomCheckbox
          label="Balanced"
          value={mealPlan.diets.includes('balanced')}
          onChange={(value) => handleCheckboxChange(value, 'diets', 'balanced')}
        />
        <CustomCheckbox
          label="Keto"
          value={mealPlan.diets.includes('keto')}
          onChange={(value) => handleCheckboxChange(value, 'diets', 'keto')}
        />
      </View>

      <View>
        <Text style={{ fontSize: 18 }}>Calories</Text>
        <Text>Min:</Text>
        <TextInput value={mealPlan.calories.min} onChangeText={(text) => handleCalorieChange({ target: { name: 'min', value: text } })} />
        <Text>Max:</Text>
        <TextInput value={mealPlan.calories.max} onChangeText={(text) => handleCalorieChange({ target: { name: 'max', value: text } })} />
      </View>

      <View>
        <Text style={{ fontSize: 18 }}>Macro Nutrients</Text>
        <CustomCheckbox
          label="Protein"
          value={mealPlan.nutrients.includes('protein')}
          onChange={(value) => handleCheckboxChange(value, 'nutrients', 'protein')}
        />
        <CustomCheckbox
          label="Carbs"
          value={mealPlan.nutrients.includes('carbs')}
          onChange={(value) => handleCheckboxChange(value, 'nutrients', 'carbs')}
        />
      </View>

        <View>
          <Text style={{ fontSize: 18 }}>Meals for Each Section</Text>
          
          <Text>Breakfast</Text>
          <CustomCheckbox
            label="Egg"
            value={mealPlan.meals.Breakfast.includes('egg')}
            onChange={(value) => handleCheckboxChange(value, 'Breakfast', 'egg')}
          />
          <CustomCheckbox
            label="Sandwich"
            value={mealPlan.meals.Breakfast.includes('sandwich')}
            onChange={(value) => handleCheckboxChange(value, 'Breakfast', 'sandwich')}
          />

          <Text>Lunch</Text>
          <CustomCheckbox
            label="Egg"
            value={mealPlan.meals.Lunch.includes('egg')}
            onChange={(value) => handleCheckboxChange(value, 'Lunch', 'egg')}
          />
          <CustomCheckbox
            label="Sandwich"
            value={mealPlan.meals.Lunch.includes('sandwich')}
            onChange={(value) => handleCheckboxChange(value, 'Lunch', 'sandwich')}
          />

          <Text>Dinner</Text>
          <CustomCheckbox
            label="Egg"
            value={mealPlan.meals.Dinner.includes('egg')}
            onChange={(value) => handleCheckboxChange(value, 'Dinner', 'egg')}
          />
          <CustomCheckbox
            label="Sandwich"
            value={mealPlan.meals.Dinner.includes('sandwich')}
            onChange={(value) => handleCheckboxChange(value, 'Dinner', 'sandwich')}
          />
        </View>

        <Button title="Search Meal Plans" onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  mealPlanContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  mealPlanTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  accessDenied: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default MealPlanner;

