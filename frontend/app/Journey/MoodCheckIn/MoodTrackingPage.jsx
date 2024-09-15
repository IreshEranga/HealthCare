import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../../../components/NavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';



const MoodTrackingPage = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  const [userID, setUserID] = useState('');
  const navigation = useNavigation();


  const fetchUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('loggedInUser');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      if (parsedUser /*&& parsedUser.first_name*/ && parsedUser.userID) {
        //setUserName(parsedUser.first_name);
        setUserID(parsedUser.userID);
      }
    } catch (error) {
      console.log('Error fetching user data', error);
    }
  };

  fetchUserData();

  const moodIcons = [
    { id: 1, emoji: '😭', color: '#e74c3c' }, // Very Sad
    { id: 2, emoji: '😟', color: '#e67e22' }, // Sad
    { id: 3, emoji: '😐', color: '#f1c40f' }, // Neutral
    { id: 4, emoji: '😊', color: '#2ecc71' }, // Happy
    { id: 5, emoji: '😄', color: '#27ae60' }, // Very Happy
  ];

  const gridSize = 23;

  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" type="ionicon" color="black" size={30} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Mood Stats {userID}</Text>
        <TouchableOpacity>
          <Icon name="person" type="ionicon" color="black" size={30} />
        </TouchableOpacity>
      </View>

      {/* Subtitle */}
      <Text style={styles.subTitle}>Year in pixels</Text>

      {/* Mood Icons */}
      <View style={styles.moodSelector}>
        {moodIcons.map((mood) => (
          <TouchableOpacity
            key={mood.id}
            style={[
              styles.moodIcon,
              { backgroundColor: selectedMood === mood.id ? mood.color : 'transparent' },
            ]}
            onPress={() => handleMoodSelect(mood.id)}
          >
            <Text style={styles.emojiText}>{mood.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Mood Grid */}
      <ScrollView style={styles.gridContainer}>
        <View style={styles.grid}>
          {Array(gridSize)
            .fill(0)
            .map((_, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {Array(gridSize)
                  .fill(0)
                  .map((_, colIndex) => (
                    <View key={colIndex} style={styles.gridCell} />
                  ))}
              </View>
            ))}
        </View>
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('Journey/MoodCheckIn/AddMoodCheckInPage')}>
        <Icon name="add" type="ionicon" color="white" size={30} />
      </TouchableOpacity>

      {/* Nav Bar */}
      <NavBar  style={styles.navigation}/>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9c8e6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f49fb6', 
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    color: 'black',
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  moodIcon: {
    padding: 10,
    borderRadius: 50,
  },
  emojiText: {
    fontSize: 24,
  },
  gridContainer: {
    flex: 1,
    marginVertical: 10,
  },
  grid: {
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
  },
  gridCell: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#c0392b', // Red floating button
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});

export default MoodTrackingPage;