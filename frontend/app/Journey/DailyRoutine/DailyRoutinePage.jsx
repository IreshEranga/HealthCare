import React, { useState, useEffect } from 'react'; 
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Image } from 'react-native';
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
      
      // Update the status for the specified section
      const updatedRoutine = { ...routine };
      updatedRoutine[section].status = 'completed'; 

      await axios.put(`${apiUrl}/daily-routines/status/${userID}`, {
        date: formattedDate,
        section: section,
        status: 'completed',
      });

      // Set the updated routine to state
      setRoutine(updatedRoutine); 
    } catch (error) {
      //console.log('Error updating status:', error);
    }
  }; 

  // Update the status checks in the renderDoneButton function
  const renderDoneButton = (section) => {
    const activity = routine[section];

    if (activity.status === 'completed') {
      return null; // Do not render the button if already completed
    }

    const isPastSection = selectedDate.isBefore(moment(), 'day') || 
                          (selectedDate.isSame(moment(), 'day') && moment().isAfter(morningEnd));

    const isCurrentSection = (section === 'morning' && selectedDate.isSame(moment(), 'day') && now.isBefore(morningEnd)) ||
                            (section === 'day' && selectedDate.isSame(moment(), 'day') && now.isAfter(morningEnd) && now.isBefore(dayEnd)) ||
                            (section === 'evening' && selectedDate.isSame(moment(), 'day') && now.isAfter(dayEnd));

    if (isPastSection || isCurrentSection) {
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
        <TouchableOpacity>
          <Icon name="user" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateScrollView}>
        {renderDateButtons()}
      </ScrollView>

      <ScrollView style={styles.routineContainer}>
        {routine ? (
          <View style={styles.routineContainer1}>
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
          <Text>No routine for this day.</Text>
        )}

      </ScrollView>

      <TouchableOpacity style={styles.floatingButton} onPress={addRoutine}>
        <Icon name="plus" color="white" size={30} />
      </TouchableOpacity>

      {/* Fixed Navigation Bar */}
      <View style={styles.navbarContainer}>
        <NavBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9c8e6' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
  headerText: { fontSize: 24, fontWeight: 'bold', color: 'black' },
  dateScrollView: { paddingBottom: 0, paddingTop: 20 },
  dateButton: { marginHorizontal: 5, padding: 10, backgroundColor: '#fff', borderRadius: 10, height: 50 },
  todayDateButton: { backgroundColor: '#c0392b' },
  selectedDateButton: { backgroundColor: '#2980b9' },
  dateText: { fontSize: 16, color: '#333' },
  todayDateText: { color: '#fff' },
  selectedDateText: { color: '#fff' },
  //routineContainer: { padding: 50, backgroundColor: '#8e44ad', margin: 10, borderRadius: 10 },
  routineContainer: { padding: 20, backgroundColor: '#8e44ad', margin: 15, borderRadius: 10 },
  iconsContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20, alignSelf: 'center', marginTop:10 },
  routineContainer1: { padding: 0, backgroundColor: '#8e44ad', margin: 0, borderRadius: 10 },
  //iconsContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 30, marginLeft:0, alignSelf:'center'},
  icon: { marginHorizontal: 10 },
  routineDate: { fontSize: 18, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  section: { marginBottom: 15, padding: 15, backgroundColor: '#fff', borderRadius: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#8e44ad' },
  sectionContent: { fontSize: 16, color: '#333' },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:5, // Adjust as needed
  },
  statusText: {
    fontSize: 16,
    color: '#333',
  },
  completeGif: {
    width: 80, // Adjust as needed
    height: 35, // Adjust as needed
    marginTop: -10,
  },  
  doneButton: {
    marginTop: 0,
    backgroundColor: '#2E4057',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginHorizontal: 0,
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
    backgroundColor: '#c0392b',
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