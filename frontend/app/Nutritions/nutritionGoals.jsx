import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function NutritionGoals() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male'); // Default gender
  const [activityLevel, setActivityLevel] = useState('sedentary'); // Default activity level
  const [bmi, setBmi] = useState(null);
  const [calorieGoal, setCalorieGoal] = useState(null);
  const navigation = useNavigation();

  const calculateBMI = () => {
    if (weight && height) {
      const bmiValue = (weight / (height / 100) ** 2);
      setBmi(bmiValue);
    }
    else{ 
      setBmi(null);
    }
  };

  const getBMICategoryAndColor = () => {
    if (bmi < 18.5) return { category: 'Underweight', color: '#FFD54F' };
    if (bmi < 25) return { category: 'Normal weight', color: '#8BC34A' };
    if (bmi < 30) return { category: 'Overweight', color: '#FF9800' };
    return { category: 'Obesity', color: '#FF7043' };
  };

  const calculateCalorieGoal = () => {
    let bmr;

    // Calculate BMR based on gender
    if (gender === 'male') {
      bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    } else {
      bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    }

    // Adjust calorie needs based on activity level
    let calorieMultiplier = 1.2; // Default sedentary
    switch (activityLevel) {
      case 'light':
        calorieMultiplier = 1.375;
        break;
      case 'moderate':
        calorieMultiplier = 1.55;
        break;
      case 'active':
        calorieMultiplier = 1.725;
        break;
      case 'very active':
        calorieMultiplier = 1.9;
        break;
      default:
        calorieMultiplier = 1.2;
    }

    const dailyCalorieNeeds = (bmr * calorieMultiplier).toFixed(0);
    setCalorieGoal(dailyCalorieNeeds);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Nutritions/nutritionHome')}>
          <Icon name="arrow-left" size={24} color="#8BC34A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>  
        <View style={styles.goalContainer}>
          <Text style={styles.label}>Enter Weight (kg):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Weight"
            value={weight}
            onChangeText={setWeight}
          />

          <Text style={styles.label}>Enter Height (cm):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Height"
            value={height}
            onChangeText={setHeight}
          />
  
          <TouchableOpacity style={styles.button} onPress={calculateBMI}>
            <Text style={styles.buttonText}>Calculate BMI</Text>
          </TouchableOpacity>    

          {bmi && (
            <View style={[styles.resultContainer, { backgroundColor: getBMICategoryAndColor(bmi).color }]}>
            <Text style={styles.result}>
              BMI: {bmi.toFixed(1)}{' '}
              <Text style={styles.category}>
                ({getBMICategoryAndColor(bmi).category})
              </Text>
            </Text>
          </View>
          )}

        </View>

        <View style={styles.goalContainer}>
          <Text style={styles.label}>Enter Age:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Age"
            value={age}
            onChangeText={setAge}
          />

          <Text style={styles.label}>Select Gender:</Text>
          <Picker
            selectedValue={gender}
            style={styles.picker}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>

          <Text style={styles.label}>Select Activity Level:</Text>
          <Picker
            selectedValue={activityLevel}
            style={styles.picker}
            onValueChange={(itemValue) => setActivityLevel(itemValue)}
          >
            <Picker.Item label="Sedentary (little to no exercise)" value="sedentary" />
            <Picker.Item label="Light (light exercise)" value="light" />
            <Picker.Item label="Moderate (moderate exercise)" value="moderate" />
            <Picker.Item label="Active (hard exercise)" value="active" />
            <Picker.Item label="Very Active (very hard exercise)" value="very active" />
          </Picker>

          <TouchableOpacity style={styles.buttonGoal} onPress={calculateCalorieGoal}>
            <Text style={styles.buttonText}> Calculate Calorie Goal</Text>
          </TouchableOpacity> 

          {calorieGoal && (
            <View style={styles.resultContainer}> 
              <Text style={styles.result}>Your Daily Calorie Goal: {calorieGoal} kcal</Text> 
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  goalContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'rgba(71, 127, 73, 0.35)',
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  resultContainer: {
    backgroundColor: '#FFFDE7', // Light background
    borderRadius: 15,
    padding: 20,
    margin: 20,
    marginLeft: 25,
    marginRight: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  result: {
    fontSize: 18,
    margin: 'auto',
    fontWeight: 'bold',
    alignContent: 'center',
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 13,
    width: 130,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#477F49',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonGoal: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 13,
    width: 180,
    alignSelf: 'center',
  },
});
