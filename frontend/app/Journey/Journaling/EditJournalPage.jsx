import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';


const EditJournalPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [journal, setJournal] = useState(route.params?.journal || {});
  const [userID, setUserID] = useState('');
  const [note, setNote] = useState(journal.note || '');
  const today = moment().format('YYYY-MM-DD');
  const journalDate = moment(journal.time).format('YYYY-MM-DD');

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

  const handleSave = async () => {
    if (today !== journalDate) {
      Alert.alert('Error', 'You can only edit journals for today.');
      return;
    }
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      await axios.post(`${apiUrl}/journals/update/${journal._id}`, { note });
      Alert.alert('Success', 'Journal entry updated successfully.');
      navigation.goBack();
    } catch (error) {
      console.log('Error updating journal:', error);
      Alert.alert('Error', 'Failed to update journal. Please try again later.');
    }
  };  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" color="black" size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Journal</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.noteContainer}>
        <TextInput
          style={styles.noteInput}
          placeholder="Edit your note..."
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    flex: 1,
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
    marginTop: 20,
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
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditJournalPage;