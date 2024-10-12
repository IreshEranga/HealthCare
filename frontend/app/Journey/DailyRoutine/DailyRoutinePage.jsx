import React, { useState, useEffect } from 'react'; 
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import completeGif from '../../../assets/videos/complete.gif'; 
import NavBar from '../../../components/NavBar';


const DailyRoutinePage = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [routine, setRoutine] = useState(null);
  const [userID, setUserID] = useState('');
  const [searchDate, setSearchDate] = useState('');
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

  useEffect(() => {
    if (userID) {
      // Fetch routine for today's date on component mount
      fetchRoutine(moment());
    }
  }, [userID]);
  
  useEffect(() => {
    if (userID && selectedDate) {
      fetchRoutine(selectedDate);
    }
  }, [userID, selectedDate]);

  const handleSearchDateChange = (input) => {
    setSearchDate(input);
    const date = moment(input, 'YYYY-MM-DD', true); // Parse input in 'YYYY-MM-DD' format
    if (date.isValid()) {
      setSelectedDate(date); // Set valid date
    } else {
      Alert.alert("Invalid Date", "Please enter a valid date in the format: YYYY-MM-DD");
    }
  };

  // Get All Routines Function
  const fetchRoutine = async (date) => {
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const formattedDate = date.format('YYYY-MM-DD');
      const response = await axios.get(`${apiUrl}/daily-routines/${userID}?date=${formattedDate}`);
      setRoutine(response.data);
    } catch (error) {
      //console.log('Error fetching routine:', error);
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

  // Delete Routine Function
  const deleteRoutine = async () => {
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      await axios.delete(`${apiUrl}/daily-routines/${userID}?date=${selectedDate.format('YYYY-MM-DD')}`);
      setRoutine(null);
      Alert.alert("Routine Deleted", "Your routine has been deleted.");
    } catch (error) {
      console.log('Error deleting routine:', error);
    }
  };

  // Update Routine Function (navigates to an edit page)
  const editRoutine = () => {
    navigation.navigate('Journey/DailyRoutine/EditDailyRoutinePage', { routine, date: selectedDate });
  };

  const morningEnd = moment().hour(11).minute(59);
  const dayEnd = moment().hour(17).minute(59);
  const now = moment();

  // Update Status Function
  const updateStatus = async (section) => {
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const formattedDate = selectedDate.format('YYYY-MM-DD');

      const updatedRoutine = { ...routine };
      updatedRoutine[section].status = 'completed'; 

      await axios.put(`${apiUrl}/daily-routines/status/${userID}`, {
        date: formattedDate,
        section: section,
        status: 'completed',
      });

      setRoutine(updatedRoutine); 
    } catch (error) {
      //console.log('Error updating status:', error);
    }
  }; 

  // Update the status checks in the renderDoneButton function
  const renderDoneButton = (section) => {
    const activity = routine[section];

    if (activity.status === 'completed') {
        return null; 
    }

    const isPastSection = selectedDate.isBefore(moment(), 'day') || 
        (selectedDate.isSame(moment(), 'day') && moment().isAfter((section === 'morning') ? morningEnd : dayEnd));

    const isCurrentSection = (section === 'morning' && selectedDate.isSame(moment(), 'day') && now.isBefore(morningEnd)) ||
                            (section === 'day' && selectedDate.isSame(moment(), 'day') && now.isBetween(morningEnd, dayEnd)) ||
                            (section === 'evening' && selectedDate.isSame(moment(), 'day') && now.isAfter(dayEnd));

    if (isPastSection || (isCurrentSection && selectedDate.isSame(moment(), 'day'))) {
        return (
            <TouchableOpacity
                onPress={updateStatus.bind(null, section)}
                style={styles.doneButton}
            >
                <Text style={styles.doneButtonText}>✅</Text>
            </TouchableOpacity>
        );
    }

    return null; 
  };

  // Render date buttons for past 7 days and future dates
  const renderDateButtons = () => {
    const futureDate = moment().add(3, 'months'); 
    const startDate = moment().subtract(7, 'days');
    const dates = [];
    let currentDate = startDate.clone();
  
    while (currentDate.isBefore(futureDate)) {
      dates.push(currentDate.clone());
      currentDate = currentDate.add(1, 'day');
    }
  
    return dates.map((date, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.dateButton,
          date.isSame(moment(), 'day') && styles.todayDateButton,
          date.isSame(selectedDate, 'day') && styles.selectedDateButton
        ]}
        onPress={() => setSelectedDate(date)}
      >
        <Text
          style={[
            styles.dateText,
            date.isSame(moment(), 'day') && styles.todayDateText,
            date.isSame(selectedDate, 'day') && styles.selectedDateText
          ]}
        >
          {date.format('ddd DD MMM')}
        </Text>
      </TouchableOpacity>
    ));
  };  
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" color="black" size={30} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Daily Plans</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')}>
          <Icon name="user" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.currentDateText}>{selectedDate.format('Do MMMM, YYYY')}</Text>
      </View>

      {/* Search Bar with Search Icon */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by date (e.g., 2024-09-22)"
          value={searchDate}
          onChangeText={handleSearchDateChange}
          placeholderTextColor="#666"
        />
        <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateScrollView}>
        {renderDateButtons()}
      </ScrollView>

      <ScrollView>
        {routine ? (
          <View style={styles.allContainer}>
            <View style={styles.iconsContainer}>
              <Text style={styles.routineDate}>{selectedDate.format('Do MMMM, YYYY')}</Text>
              
              {/* Check if the selected date is in the past */}
              {!selectedDate.isBefore(moment(), 'day') && (
                <>
                  <TouchableOpacity onPress={editRoutine}>
                    <Icon name="edit" size={25} color="#27ae60" style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={deleteRoutine}>
                    <Icon name="trash" size={25} color="#e74c3c" style={styles.icon} />
                  </TouchableOpacity>
                </>
              )}
            </View>

            {['morning', 'day', 'evening'].map((section) => {
              const isPastSection = selectedDate.isBefore(moment(), 'day') || 
                (selectedDate.isSame(moment(), 'day') && moment().isAfter((section === 'morning') ? morningEnd : dayEnd));
              
              return (
                <View style={styles.section} key={section}>
                  <View style={styles.statusContainer}>
                    <Text style={styles.sectionTitle}>{section.charAt(0).toUpperCase() + section.slice(1)}</Text>
                    {renderDoneButton(section)}
                    {routine[section].status === 'completed' && (
                      <Image source={completeGif} style={styles.completeGif} />
                    )}
                  </View>
                  {/*{!isPastSection && <Text style={styles.statusText}>{routine[section].status}</Text>}*/}
                  <Text style={styles.sectionContent}>{routine[section].content}</Text>
                </View>
              );
            })}
          </View>
        ) : (
          <Text style={{textAlign:'center'}}>No routine for this day.</Text>
        )}

      </ScrollView>

      <TouchableOpacity style={styles.floatingButton} onPress={addRoutine}>
        <Icon name="plus" color="white" size={30} />
      </TouchableOpacity>
      
      <NavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'white' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20, 
    marginTop: -50, 
    backgroundColor: '#ffc1cb'
  },
  headerText: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: 'black' 
  },
  dateScrollView: { 
    paddingBottom: 0, 
    paddingTop: 5, 
    paddingLeft: 10 
  },
  dateButton: { 
    marginHorizontal: 4, 
    padding: 8, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    height: 38, 
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  todayDateButton: { 
    backgroundColor: '#db8694' 
  },
  selectedDateButton: { 
    backgroundColor: '#2980b9' 
  },
  dateText: { 
    fontSize: 16, 
    color: '#333' 
  },
  searchBarContainer: {
    height: 50,
    flexDirection: 'row', 
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  searchBar: { 
    flex: 1, 
    fontSize: 16, 
    color: '#333' 
  },
  searchIcon: { 
    marginRight: 10 
  },
  currentDateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    padding: 8,
  },
  todayDateText: { 
    color: '#fff' 
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  currentDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  selectedDateText: { 
    color: '#fff' 
  },
  allContainer: { 
    padding: 20, 
    backgroundColor: '#e3e3e3', 
    marginHorizontal: 15, 
    borderRadius: 10,   
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 0
  },
  iconsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginBottom: 20, 
  },
  icon: { 
    marginHorizontal: 10 
  },
  routineDate: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: 'black', 
    textAlign: 'center' 
  },
  section: { 
    marginBottom: 15, 
    padding: 15, 
    backgroundColor: '#fff', 
    borderRadius: 10 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    color: '#db8694' 
  },
  sectionContent: { 
    fontSize: 16, 
    color: '#333' 
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  statusText: {
    fontSize: 16,
    color: '#333',
  },
  completeGif: {
    width: 80, 
    height: 35,
    marginTop: -10,
    marginRight:-15
  },  
  doneButton: {
    backgroundColor: '#2E4057',
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
    marginRight:6,
  },
  disabledDoneButton: {
    backgroundColor: '#5b8179',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#db8694',
    borderRadius: 50,
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default DailyRoutinePage;