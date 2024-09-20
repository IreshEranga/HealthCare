import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Platform, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import axios from 'axios';
import NavBar from '../../../components/NavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddDailyRoutinePage = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [morning, setMorning] = useState('');
  const [day, setDay] = useState('');
  const [evening, setEvening] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigation = useNavigation();

  const showDatepicker = () => setShowDatePicker(true);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const storedUser = await AsyncStorage.getItem('loggedInUser');
      const userID = storedUser ? JSON.parse(storedUser).userID : null;
      const formattedDate = moment(date).format('YYYY-MM-DD');
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;

      const response = await axios.post(`${apiUrl}/daily-routines`, {
        userID,
        date: formattedDate,
        morning: { content: morning, status: 'pending..' },
        day: { content: day, status: 'pending..' },
        evening: { content: evening, status: 'pending..' },
      });

      if (response.status === 201) {
        setIsSaving(false);
        Alert.alert('Success', 'Routine added successfully');
        navigation.navigate('Journey/DailyRoutine/DoneAddDailyRoutinePage');
      } else {
        Alert.alert('Error', 'Unexpected response from server');
      }
    } catch (error) {
      setIsSaving(false);
      console.log('Error adding routine:', error.response ? error.response.data : error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to add routine');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" color="black" size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>Daily Plan</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isSaving}>
          <Text style={styles.saveButtonText}>{isSaving ? 'Saving...' : 'Save'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container1}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity onPress={showDatepicker} style={styles.datePickerButton}>
            <Text style={styles.datePickerText}>{moment(date).format('MMMM Do YYYY')}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}

          <Text style={styles.label}>Morning</Text>
          <View style={styles.planContainer}>
            <TextInput
              placeholder="Add morning plan..."
              value={morning}
              onChangeText={setMorning}
              style={styles.input}
              multiline={true}
            />
          </View>

          <Text style={styles.label}>Day</Text>
          <View style={styles.planContainer}>
            <TextInput
              placeholder="Add day plan..."
              value={day}
              onChangeText={setDay}
              style={styles.input}
              multiline={true}
            />
          </View>

          <Text style={styles.label}>Evening</Text>
          <View style={styles.planContainer}>
            <TextInput
              placeholder="Add evening plan..."
              value={evening}
              onChangeText={setEvening}
              style={styles.input}
              multiline={true}
            />
          </View>
        </ScrollView>
      </View>
      {/* Fixed Navigation Bar */}
      <View style={styles.navbarContainer}>
          <NavBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9c8e6',
  },
  container: { flex: 1, backgroundColor: '#f9c8e6' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft:15,
    marginRight:15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    flex: 1, 
    marginLeft:-20,
  },
  datePickerButton: {
    padding: 15,
    backgroundColor: '#6a1b9a',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  datePickerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  scrollContainer: {
    //paddingHorizontal: 30,
    paddingBottom: 300,  // Adjust for navbar
    marginTop:10,
  },
  planContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#b39ddb',
    backgroundColor: '#ce93d8',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    height:100,
  },
  /*addButton: {
    backgroundColor: '#4a148c',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },*/
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4a148c',
  },
  saveButton: {
    backgroundColor: '#8e44ad',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    position: 'absolute',
    right: 0,
    marginTop:20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
/*
  container1: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9c8e6',
  },
  container: { flex: 1, backgroundColor: '#f9c8e6' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'black' },
  saveButton: { padding: 10, backgroundColor: '#e67e22', borderRadius: 5 },
  saveButtonText: { fontSize: 18, color: 'white' },
  scrollContainer: { paddingBottom: 20 },
  datePickerButton: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginVertical: 15 },
  datePickerText: { fontSize: 18, textAlign: 'center', color: '#333' },
  label: { fontSize: 18, marginVertical: 10 },
  planContainer: { backgroundColor: '#fff', padding: 10, borderRadius: 10 },
  input: { fontSize: 16 },*/
});

export default AddDailyRoutinePage;