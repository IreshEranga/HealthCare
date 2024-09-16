import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddJournalPage = () => {
  const [note, setNote] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [userID, setUserID] = useState('');
  const navigation = useNavigation();

  // Fetch current date
  useEffect(() => {
    const today = moment().format('Do MMMM, YYYY');
    setCurrentDate(today);
  }, []);

  // Fetch user data from AsyncStorage
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

  // Save journal entry to API
  const handleSave = async () => {
    if (!note.trim()) {
      Alert.alert('Empty Note', 'Please write something before saving.');
      return;
    }

    const journalData = {
      userID,
      date: currentDate,
      note,
    };

    setIsSaving(true);

    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      await axios.post(`${apiUrl}/journals/add`, journalData);
      setIsSaving(false);
      Alert.alert('Success', 'Journal entry saved successfully!');
      setNote(''); 
      navigation.goBack(); 
    } catch (error) {
      setIsSaving(false);
      console.log('Error saving journal entry:', error);
      Alert.alert('Error', 'Failed to save journal entry. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button and save button */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" type="ionicon" color="black" size={30} />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Journaling</Text>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isSaving}>
          <Text style={styles.saveButtonText}>
            {isSaving ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Current date */}
      <Text style={styles.date}>{currentDate}</Text>

      {/* Note input */}
      <View style={styles.noteContainer}>
        <TextInput
          style={styles.noteInput}
          placeholder="Add your note..."
          placeholderTextColor="#888"
          multiline={true}
          value={note}
          onChangeText={(text) => setNote(text)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f49fb6',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    flex: 1, 
  },
  date: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
  },
  noteContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  noteInput: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#8e44ad',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    position: 'absolute',
    right: 0,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddJournalPage;