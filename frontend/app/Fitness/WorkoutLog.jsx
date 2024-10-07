// components/WorkoutLog.jsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  ScrollView,
  Alert,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import FitNavBar from './FitNavBar';

const WorkoutLog = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [exercise, setExercise] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [category, setCategory] = useState('Arm');
  const API_URL = process.env.EXPO_PUBLIC_API_URL; // Replace with your backend IP and port

  const navigation = useNavigation();

  const addWorkoutLog = async () => {
    // Validate input fields
    if (!exercise || !reps || !category) {
      Alert.alert('Error', 'Please provide exercise name, reps, and category.');
      return;
    }

    // Prepare data to send to the backend
    const workoutData = {
      date: date.toISOString().split('T')[0], // Format: YYYY-MM-DD
      exercise,
      reps: Number(reps),
      weight: weight ? Number(weight) : 0, // Default to 0 if not provided
      category,
    };

    try {
      const response = await axios.post(`${API_URL}/workoutlog/add`, workoutData);
      Alert.alert('Success', response.data.message);
      navigation.navigate('Fitness/PersonalizedWorkout'); // Navigate directly to PersonalizedWorkout after adding
    } catch (error) {
      console.error('Error adding workout log:', error.response ? error.response.data : error.message);
      Alert.alert('Error', `Failed to add workout: ${error.response ? error.response.data.error : error.message}`);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // Keep the picker open on iOS
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Date Picker */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Date:</Text>
          <TouchableOpacity 
            style={styles.dateButton} 
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.buttonText}>Pick a Date</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeDate}
              style={styles.datePicker}
            />
          )}
        </View>

        {/* Exercise Input */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Exercise:</Text>
          <TextInput
            placeholder="e.g., Push-ups"
            value={exercise}
            onChangeText={setExercise}
            style={styles.input}
          />
        </View>

        {/* Reps Input */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Reps:</Text>
          <TextInput
            placeholder="e.g., 15"
            value={reps}
            onChangeText={setReps}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        {/* Weight Input */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Weight (kg):</Text>
          <TextInput
            placeholder="e.g., 50"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        {/* Category Picker */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Category:</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Arm" value="Arm" />
            <Picker.Item label="Chest" value="Chest" />
            <Picker.Item label="Abs" value="Abs" />
          </Picker>
        </View>

        {/* Add Workout Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={addWorkoutLog}
          >
            <Text style={styles.buttonText}>Add Workout Log</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Fixed Navigation Bar */}
      <View style={styles.navbarContainer}>
        <FitNavBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2', // Light background for better contrast
  },
  fieldContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#007FFF', // Color matching the button
    borderRadius: 25, // Make inputs rounded
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff', // White background for inputs
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#007FFF',
    borderRadius: 25, // Make picker rounded
    backgroundColor: '#fff',
  },
  datePicker: {
    marginTop: 5,
    width: '100%',
    height: 200,
  },
  buttonContainer: {
    marginTop: 20,
  },
  dateButton: {
    backgroundColor: '#FF6347', // Tomato color
    borderRadius: 25, // Make button rounded
    paddingVertical: 15,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#007FFF', // Button color
    borderRadius: 25, // Make button rounded
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default WorkoutLog;
