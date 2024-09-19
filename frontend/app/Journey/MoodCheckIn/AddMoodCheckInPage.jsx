import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../../../components/NavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddMoodCheckInPage = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedFeeling, setSelectedFeeling] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigation = useNavigation();
  const [userID, setUserID] = useState('');

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

  // Fetch current date and format it
  useEffect(() => {
    const today = new Date();
    const date = today.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setCurrentDate(date);
  }, []);

  const moodIcons = [
    { id: 1, emoji: '😭', color: '#e74c3c', label: 'Very Sad' },
    { id: 2, emoji: '😟', color: '#e67e22', label: 'Worried' },
    { id: 3, emoji: '😐', color: '#f1c40f', label: 'Okay' },
    { id: 4, emoji: '😊', color: '#2ecc71', label: 'Happy' },
    { id: 5, emoji: '😄', color: '#27ae60', label: 'Very Happy' },
  ];

  const feelings = ['Calm', 'Relaxed', 'Tired', 'Energetic', 'Sad', 'Proud', 'Lonely'];
  const companyIcons = [
    { id: 1, name: 'user', label: 'Alone' },
    { id: 2, name: 'heart', label: 'Partner' },
    { id: 3, name: 'users', label: 'Colleagues' },
    { id: 4, name: 'home', label: 'Family' },
    { id: 5, name: 'link', label: 'Friends' },
  ];

  const activities = ['Working', 'Relaxing', 'Studying', 'Socialising', 'Exercising', 'Social Media', 'Housework'];
  const locations = [
    { id: 1, name: 'home', label: 'Home' },
    { id: 2, name: 'briefcase', label: 'Work' },
    { id: 3, name: 'university', label: 'Uni/School' },
    { id: 4, name: 'globe', label: 'City/Outdoor' },
    { id: 5, name: 'car', label: 'Commuting' },
  ];

  const handleSelection = (item, selectedList, setSelectedList) => {
    if (selectedList.includes(item)) {
      setSelectedList(selectedList.filter(i => i !== item));
    } else {
      setSelectedList([...selectedList, item]);
    }
  };

  const handleSave = async () => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    console.log(apiUrl);

    if (!selectedMood || !selectedCompany || !selectedLocation) {
      Alert.alert('Missing Info', 'Please fill in all required sections.');
      return;
    }

    const moodData = {
      selectedMood,
      selectedFeeling,
      selectedCompany,
      selectedActivity,
      selectedLocation,
      date: currentDate,
      userID,
    };

    setIsSaving(true);

    try {
      // Check if a mood check-in exists for the current date
      const response = await axios.get(`${apiUrl}/mood-checks/${userID}/check?date=${currentDate}`);
      if (response.data.exists) {
        setIsSaving(false);
        Alert.alert('Error', 'You have already checked in your mood for today.');
        return;
      }

      await axios.post(`${apiUrl}/mood-checks/add`, moodData);
      setIsSaving(false);
      Alert.alert('Success', 'Mood check-in saved successfully!');
      navigation.navigate('Journey/MoodCheckIn/DoneAddMoodCheckInPage');
    } catch (error) {
      setIsSaving(false);
      Alert.alert('Error', 'Failed to save mood check-in. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" color="black" size={30} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Mood Check-In {userID}</Text>
          <TouchableOpacity>
            <Icon name="user" type="font-awesome" color="black" size={30} />
          </TouchableOpacity>
        </View>

        {/* Date */}
        <Text style={styles.dateText}>{currentDate}</Text>

        {/* How was your day? */}
        <Text style={styles.sectionTitle}>How was your day?</Text>
        <View style={styles.moodSelector}>
          {moodIcons.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodIcon,
                { backgroundColor: selectedMood === mood.id ? mood.color : '#eee' },
              ]}
              onPress={() => setSelectedMood(mood.id)}
            >
              <Text style={styles.emojiText}>{mood.emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Feelings */}
        <Text style={styles.sectionTitle}>How do you feel?</Text>
        <View style={styles.multiSelectContainer}>
          {feelings.map((feeling) => (
            <TouchableOpacity
              key={feeling}
              style={[
                styles.multiSelectItem,
                selectedFeeling.includes(feeling) ? styles.selectedItem : styles.unselectedItem,
              ]}
              onPress={() => handleSelection(feeling, selectedFeeling, setSelectedFeeling)}
            >
              <Text style={styles.multiSelectText}>{feeling}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Company */}
        <Text style={styles.sectionTitle}>Who are you with?</Text>
        <View style={styles.iconSelector}>
          {companyIcons.map((company) => (
            <TouchableOpacity
              key={company.id}
              style={[
                styles.companyIcon,
                { backgroundColor: selectedCompany === company.id ? '#9b59b6' : '#ddd' },
              ]}
              onPress={() => setSelectedCompany(company.id)}
            >
              <Icon name={company.name} type="font-awesome" color="white" size={24} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Activity */}
        <Text style={styles.sectionTitle}>What are you doing?</Text>
        <View style={styles.multiSelectContainer}>
          {activities.map((activity) => (
            <TouchableOpacity
              key={activity}
              style={[
                styles.multiSelectItem,
                selectedActivity.includes(activity) ? styles.selectedItem : styles.unselectedItem,
              ]}
              onPress={() => handleSelection(activity, selectedActivity, setSelectedActivity)}
            >
              <Text style={styles.multiSelectText}>{activity}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Location */}
        <Text style={styles.sectionTitle}>Where are you?</Text>
        <View style={styles.iconSelector}>
          {locations.map((location) => (
            <TouchableOpacity
              key={location.id}
              style={[
                styles.companyIcon,
                { backgroundColor: selectedLocation === location.id ? '#2980b9' : '#ddd' },
              ]}
              onPress={() => setSelectedLocation(location.id)}
            >
              <Icon name={location.name} type="font-awesome" color="white" size={24} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={isSaving}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <NavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9c8e6' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#f49fb6' },
  headerText: { fontSize: 24, fontWeight: 'bold', color: 'black' },
  dateText: { textAlign: 'center', fontSize: 18, marginVertical: 10, color: 'black' },
  sectionTitle: { fontSize: 18, marginLeft: 15, marginVertical: 10, color: 'black' },
  moodSelector: { flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff', borderRadius: 10 },
  moodIcon: { padding: 10, borderRadius: 50, alignItems: 'center' },
  emojiText: { fontSize: 24 },
  multiSelectContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginHorizontal: 20, paddingVertical: 10, backgroundColor: '#fff', borderRadius: 10 },
  multiSelectItem: { padding: 10, margin: 5, borderRadius: 20 },
  selectedItem: { backgroundColor: '#7f8c8d' },
  unselectedItem: { backgroundColor: '#eee' },
  multiSelectText: { fontSize: 16, color: 'black' },
  iconSelector: { flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff', borderRadius: 10 },
  companyIcon: { padding: 10, borderRadius: 50, alignItems: 'center' },
  saveButton: { backgroundColor: '#3498db', paddingVertical: 15, margin: 20, borderRadius: 10, marginBottom:120 },
  saveButtonText: { textAlign: 'center', fontSize: 18, color: '#fff' },
  alreadyCheckedInText: { textAlign: 'center', fontSize: 24, fontWeight: 'bold', color: 'black', marginVertical: 50 },
});

export default AddMoodCheckInPage;