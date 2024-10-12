import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../../../components/NavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const MoodTrackingPage = () => {
  const [moodData, setMoodData] = useState([]);
  const [userID, setUserID] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('loggedInUser');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      if (parsedUser && parsedUser.userID) {
        setUserID(parsedUser.userID);
        fetchMoodData(parsedUser.userID);
      }
    } catch (error) {
      console.log('Error fetching user data', error);
    }
  };

  const fetchMoodData = async (userID) => {
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const response = await axios.get(`${apiUrl}/mood-check-in/${userID}/mood`);
      console.log('Mood Data Response:', response.data);
      setMoodData(response.data);
    } catch (error) {
      //console.error('Error fetching mood data:', error);
      setMoodData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const moodColors = {
    'Very Sad': '#e74c3c',
    'Sad': '#e67e22',
    'Neutral': '#f1c40f',
    'Happy': '#2ecc71',
    'Very Happy': '#27ae60',
  };

  const moodIcons = {
    'Very Sad': '😭',
    'Worried': '😟',
    'Okay': '😐',
    'Happy': '😊',
    'Very Happy': '😄',
  };

  const renderGrid = () => {
    if (loading) {
      return <Text style={{textAlign:'center'}}>Loading...</Text>;
    }

    const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

    return (
      <View style={styles.gridWrapper}>
        <View style={styles.monthsRow}>
          {months.map((month, index) => (
            <Text key={index} style={styles.monthText}>{month}</Text>
          ))}
        </View>

        {Array.from({ length: 31 }).map((_, day) => (
          <View key={day} style={styles.dayRow}>
            <Text style={styles.dayText}>{day + 1}</Text>
            {Array.from({ length: 12 }).map((_, month) => {
              const moodEntry = moodData.find(
                (entry) => new Date(entry.date).getDate() === day + 1 && new Date(entry.date).getMonth() === month
              );
              const moodColor = moodEntry ? moodColors[moodEntry.mood] : '#ecf0f1'; 
              const moodIcon = moodEntry ? moodIcons[moodEntry.mood] : '';

              return (
                <TouchableOpacity
                  key={`${day}-${month}`}
                  style={[styles.gridCell, { backgroundColor: moodColor }]}
                  onPress={() => {
                    if (moodEntry) {
                      navigation.navigate('Journey/MoodCheckIn/DoneAddMoodCheckInPage', {
                        moodCheckInData: moodEntry,
                      });
                    }
                  }}
                >
                  <Text style={styles.emojiText}>{moodIcon}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" color="black" size={30} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Mood Stats</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')}>
          <Icon name="user" size={30} color="black" style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.subTitle}>365 Mood Map</Text>

      <ScrollView style={styles.gridContainer}>
        {renderGrid()}
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Journey/MoodCheckIn/AddMoodCheckInPage')}
      >
        <Icon name="plus" color="white" size={30} />
      </TouchableOpacity>

      <NavBar style={styles.navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffc1cb',
    marginTop:-50,
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
    fontFamily: 'Georgia',
  },
  gridContainer: {
    flex: 1,
    marginVertical: 10,
  },
  gridWrapper: {
    flexDirection: 'column',
  },
  monthsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  monthText: {
    width: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 2.4,
    paddingLeft: 12,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    width: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  gridCell: {
    width: 25,
    height: 25,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  emojiText: {
    fontSize: 14,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#db8694',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default MoodTrackingPage;