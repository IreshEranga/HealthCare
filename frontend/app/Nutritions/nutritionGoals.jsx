import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker

export default function NutritionGoals() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male'); // Default gender
  const [activityLevel, setActivityLevel] = useState('sedentary'); // Default activity level
  const [bmi, setBmi] = useState(null);
  const [calorieGoal, setCalorieGoal] = useState(null);

  const calculateBMI = () => {
    if (weight && height) {
      const bmiValue = (weight / (height / 100) ** 2).toFixed(2);
      setBmi(bmiValue);
      calculateCalorieGoal(bmiValue); // Call to calculate calorie goal based on BMI
    }
  };

  const calculateCalorieGoal = (bmi) => {
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

      <Button title="Calculate BMI & Calorie Goal" onPress={calculateBMI} />

      {bmi && (
        <Text style={styles.result}>Your BMI is: {bmi}</Text>
      )}
      {calorieGoal && (
        <Text style={styles.result}>Your Daily Calorie Goal is: {calorieGoal} kcal</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  result: {
    fontSize: 20,
    marginTop: 20,
  },
});
