import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../../../components/NavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import axios from 'axios';


const JournalingPage = () => {
  const [journals, setJournals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [currentDate, setCurrentDate] = useState(moment().format('Do MMMM, YYYY'));
  const [userID, setUserID] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const navigation = useNavigation();

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

  const fetchJournals = async (selectedDate) => {
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const formattedDate = selectedDate.format('YYYY-MM-DD');
      if (!userID) return;

      const response = await axios.get(`${apiUrl}/journals/${userID}?date=${formattedDate}`);
      setJournals(response.data);
    } catch (error) {
      console.log('Error fetching journals', error);
      Alert.alert('Error', 'Failed to fetch journals. Please try again later.');
    }
  };

  useEffect(() => {
    if (userID) {
      fetchJournals(selectedDate);
    }
  }, [userID, selectedDate]);

  const addNewJournal = () => {
    navigation.navigate('Journey/Journaling/AddJournalPage');
  };

  const updateJournal = (journal) => {
    const today = moment().format('YYYY-MM-DD');
    const journalDate = moment(journal.time).format('YYYY-MM-DD');
    if (today !== journalDate) {
      Alert.alert('Error', 'You can only update journals for today.');
      return;
    }
    navigation.navigate('Journey/Journaling/EditJournalPage', { journal });
  };

  const deleteJournal = async (journalID) => {
    const today = moment().format('YYYY-MM-DD');
    const journalDate = moment(journals.find(journal => journal._id === journalID)?.time).format('YYYY-MM-DD');
    if (today !== journalDate) {
      Alert.alert('Error', 'You can only delete journals for today.');
      return;
    }

    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      await axios.delete(`${apiUrl}/journals/${journalID}`);
      fetchJournals(selectedDate); 
      Alert.alert('Success', 'Journal entry deleted successfully.');
    } catch (error) {
      console.log('Error deleting journal:', error);
      Alert.alert('Error', 'Failed to delete journal. Please try again later.');
    }
  };

  const handleSearch = () => {
    const parsedDate = moment(searchDate, 'YYYY-MM-DD', true); 
    if (parsedDate.isValid()) {
      setSelectedDate(parsedDate); 
      setCurrentDate(parsedDate.format('Do MMMM, YYYY'));
      fetchJournals(parsedDate);
    } else {
      Alert.alert('Invalid Date', 'Please enter a valid date in YYYY-MM-DD format.');
    }
  };  

  const renderDateButtons = () => {
    const today = moment();
    const lastYear = moment().subtract(1, 'year');

    const dates = [];
    let currentDate = today;

    while (currentDate.isAfter(lastYear)) {
        dates.push(currentDate.clone());
        currentDate = currentDate.subtract(1, 'day');
    }

    return dates.map((date, index) => {
        const formattedDate = date.format('ddd DD MMM');
        const isSelected = date.isSame(selectedDate, 'day');
        const isToday = date.isSame(moment(), 'day'); 

        return (
            <TouchableOpacity
                key={index}
                style={[
                    styles.dateButton,
                    isSelected ? styles.selectedDateButton : null,
                    isToday ? styles.highlightedDateButton : null, 
                ]}
                onPress={() => setSelectedDate(date)}
            >
                <Text style={styles.dateText}>{formattedDate}</Text>
            </TouchableOpacity>
        );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" color="black" size={30} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Journaling</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')}>
          <Icon name="user" size={30} color="black" style={styles.profileIcon}/>
        </TouchableOpacity>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.currentDate}>{currentDate}</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by date (YYYY-MM-DD)"
          value={searchDate}
          onChangeText={setSearchDate}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateSelector}>
        {renderDateButtons()}
      </ScrollView>

      <ScrollView style={styles.journalList}>
        {journals.length === 0 ? (
          <Text style={styles.noJournals}>No journals for this day.</Text>
        ) : (
          journals.map((journal) => {
            const today = moment().format('YYYY-MM-DD');
            const journalDate = moment(journal.time).format('YYYY-MM-DD');
            const isToday = today === journalDate;

            return (
              <View key={journal._id} style={styles.journalEntry}>
                <Text style={styles.journalTime}>{moment(journal.time).format('hh:mm A')}</Text>
                <View style={styles.journalContent}>
                  <Text style={styles.journalText}>{journal.note}</Text>
                  <View style={styles.journalActions}>
                    {isToday && (
                      <>
                        <TouchableOpacity onPress={() => updateJournal(journal)}>
                          <Icon name="edit" size={25} color="blue" style={styles.actionIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteJournal(journal._id)}>
                          <Icon name="trash" size={25} color="red" style={styles.actionIcon} />
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton} onPress={addNewJournal}>
        <Icon name="plus" color="white" size={30} />
      </TouchableOpacity>

      <NavBar />
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
    padding: 20,
    backgroundColor: '#f49fb6',
    marginTop:-50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  searchContainer: {
    height: 50,
    flexDirection: 'row', alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
    margin:15,
  },
  searchBar: { flex: 1, fontSize: 16, color: '#333' },
  searchIcon: { marginRight: 10 },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  currentDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop:10,
  },
  dateSelector: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  dateButton: {
    marginHorizontal: 4,
    padding: 8, 
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 38,
  },
  selectedDateButton: {
    backgroundColor: '#d3a4ff',
  },
  highlightedDateButton: {
    backgroundColor: '#2980b9',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  journalList: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: -450, 
  },
  noJournals: {
    textAlign: 'center',
    color: '#888',
    marginTop: 0,
  },
  journalEntry: {
    backgroundColor: '#e3e3e3',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  journalTime: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  journalContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  journalText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  journalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionIcon: {
    marginHorizontal: 10,
  },
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

export default JournalingPage;