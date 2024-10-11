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
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon for back arrow
import NavBar from '../../components/NavBar';

const WorkoutLog = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [exercise, setExercise] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [category, setCategory] = useState('Arm');
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const navigation = useNavigation();

  const addWorkoutLog = async () => {
    if (!exercise || !reps || !category) {
      Alert.alert('Error', 'Please provide exercise name, reps, and category.');
      return;
    }

    const workoutData = {
      date: date.toISOString().split('T')[0],
      exercise,
      reps: Number(reps),
      weight: weight ? Number(weight) : 0,
      category,
    };

    try {
      const response = await axios.post(`${API_URL}/workoutlog/add`, workoutData);
      Alert.alert('Success', response.data.message);
      navigation.navigate('Fitness/PersonalizedWorkout');
    } catch (error) {
      console.error('Error adding workout log:', error.response ? error.response.data : error.message);
      Alert.alert('Error', `Failed to add workout: ${error.response ? error.response.data.error : error.message}`);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Arrow and Title */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.navigate('Fitness/PersonalizedWorkout')}
        >
          <Icon name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Workout</Text>
      </View>

      <ScrollView>
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

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Exercise:</Text>
          <TextInput
            placeholder="e.g., Push-ups"
            value={exercise}
            onChangeText={setExercise}
            style={styles.input}
          />
        </View>

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

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={addWorkoutLog}
          >
            <Text style={styles.buttonText}>Add Workout Log</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
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
    borderColor: '#007FFF',
    borderRadius: 25,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#007FFF',
    borderRadius: 25,
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
    backgroundColor: '#FF6347',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#007FFF',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
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
