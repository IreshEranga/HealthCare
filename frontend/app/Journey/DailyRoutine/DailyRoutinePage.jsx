import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../../../components/NavBar';

const DailyRoutinePage = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [routine, setRoutine] = useState(null);
  const [userID, setUserID] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = await AsyncStorage.getItem('loggedInUser');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      if (parsedUser && parsedUser.userID) {
        setUserID(parsedUser.userID);
      }
    };
    fetchUserData();
  }, []);

  const fetchRoutine = async (date) => {
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const formattedDate = date.format('YYYY-MM-DD');
      const response = await axios.get(`${apiUrl}/daily-routines/${userID}?date=${formattedDate}`);
      setRoutine(response.data);
    } catch (error) {
      console.log('Error fetching routine:', error);
      setRoutine(null);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchRoutine(selectedDate);
    }
  }, [userID, selectedDate]);

  const addRoutine = () => {
    navigation.navigate('Journey/DailyRoutine/AddDailyRoutinePage');
  };

  const renderDateButtons = () => {
    const futureYear = moment().add(1, 'year');
    const dates = [];
    let currentDate = moment();

    while (currentDate.isBefore(futureYear)) {
      dates.push(currentDate.clone());
      currentDate = currentDate.add(1, 'day');
    }

    return dates.map((date, index) => (
      <TouchableOpacity
        key={index}
        style={styles.dateButton}
        onPress={() => setSelectedDate(date)}
      >
        <Text style={styles.dateText}>{date.format('ddd DD MMM')}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" color="black" size={30} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Daily Reflections</Text>
        <TouchableOpacity>
          <Icon name="user" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {renderDateButtons()}
      </ScrollView>

      <View style={styles.routineContainer}>
        {routine ? (
          <View>
            <Text>{`Morning: ${routine.morning}`}</Text>
            <Text>{`Day: ${routine.day}`}</Text>
            <Text>{`Evening: ${routine.evening}`}</Text>
          </View>
        ) : (
          <Text>No routine for this day.</Text>
        )}

        <TouchableOpacity style={styles.floatingButton} onPress={addRoutine}>
          <Icon name="plus" color="white" size={30} />
        </TouchableOpacity>
      </View>

      <NavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9c8e6' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
  headerText: { fontSize: 24, fontWeight: 'bold', color: 'black' },
  dateButton: { marginHorizontal: 5, padding: 10, backgroundColor: '#fff', borderRadius: 10, height: 50 },
  dateText: { fontSize: 16, color: '#333' },
  routineContainer: { padding: 20 },
  floatingButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#c0392b',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default DailyRoutinePage;