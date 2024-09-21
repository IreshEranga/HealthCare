import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import NavBar from '../../../components/NavBar';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axios from 'axios'; 


const AddMoodCheckInPage = () => {
  const [currentDate, setCurrentDate] = useState(moment().format('Do MMMM, YYYY'));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [error, setError] = useState('');
  const [filteredFeelings, setFilteredFeelings] = useState([]); 
  const [userID, setUserID] = useState('');
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

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const moodIcons = [
    { id: 1, emoji: '😭', color: '#e74c3c', label: 'Very Sad' },
    { id: 2, emoji: '😟', color: '#e67e22', label: 'Worried' },
    { id: 3, emoji: '😐', color: '#f1c40f', label: 'Okay' },
    { id: 4, emoji: '😊', color: '#2ecc71', label: 'Happy' },
    { id: 5, emoji: '😄', color: '#27ae60', label: 'Very Happy' },
  ];

  const positiveFeelings = ['Joyful', 'Excited', 'Grateful', 'Content', 'Hopeful', 'Energetic', 'Proud', 'Calm'];
  const negativeFeelings = ['Sad', 'Anxious', 'Frustrated', 'Tired', 'Lonely', 'Overwhelmed', 'Disappointed', 'Angry'];
  const neutralFeelings = ['Content', 'Neutral', 'Calm', 'Fine', 'Balanced', 'Satisfied', 'Unbothered', 'Relaxed'];

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
    { id: 3, name: 'university', label: 'Institute' },
    { id: 4, name: 'globe', label: 'Outdoor' },
    { id: 5, name: 'car', label: 'Commuting' },
    { id: 6, name: 'university', label: 'Institute' },
  ];

  const questions = [
    { question: "How was your day ?", answers: moodIcons, type: 'icon', iconKey: 'emoji' },
    { question: "How do you feel today ?", answers: [], type: 'text' }, 
    { question: "Who are you with today ?", answers: companyIcons, type: 'icon', iconKey: 'name' },
    { question: "What were you doing ?", answers: activities, type: 'text' },
    { question: "Where were you today?", answers: locations, type: 'icon', iconKey: 'name' }
  ];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setError('');

    if (currentQuestion === 0) {
      if (answer === 1 || answer === 2) {
        setFilteredFeelings(negativeFeelings); 
      } else if (answer === 3) {
        setFilteredFeelings(neutralFeelings); 
      } else if (answer === 4 || answer === 5) {
        setFilteredFeelings(positiveFeelings);
      }
    }
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      setError('Please select an answer');
    } else {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setError('');
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setError('');
    }
  };

// In your handleSubmit function on the frontend

const handleSubmit = async () => {
  if (!selectedAnswer) {
    setError('Please select an answer');
    return;
  }

  let moodLabel = '';
  let feelingsLabel = '';
  let companyLabel = '';
  let activityLabel = '';
  let locationLabel = '';

  questions.forEach((question, index) => {
    if (index === 0) {
      moodLabel = moodIcons.find(icon => icon.id === selectedAnswer)?.label || '';
    } else if (index === 1) {
      feelingsLabel = selectedAnswer; 
    } else if (index === 2) {
      companyLabel = companyIcons.find(icon => icon.id === selectedAnswer)?.label || '';
    } else if (index === 3) {
      activityLabel = selectedAnswer; 
    } else if (index === 4) {
      locationLabel = locations.find(icon => icon.id === selectedAnswer)?.label || '';
    }
  });

  try {
    const response = await axios.post(`${apiUrl}/mood-check-in/add`, {
      userID,
      date: moment().format('YYYY-MM-DD'), 
      mood: moodLabel,
      feelings: feelingsLabel ? [feelingsLabel] : [],
      company: companyLabel,
      activity: activityLabel,
      location: locationLabel,
    });

      if (response.status !== 201) {
        throw new Error('Failed to submit mood check-in');
      }
  
      const result = response.data;
      console.log('Mood check-in submitted:', result);
      navigation.navigate('Journey/MoodCheckIn/DoneAddMoodCheckInPage');
    } catch (error) {
      console.error('Error submitting mood check-in:', error);
      setError('Error submitting mood check-in. Please try again.');
    }
  };  

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#E0BBE4', '#aec2b6', '#60768d']} style={styles.background}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" color="black" size={30} />
          </TouchableOpacity>
          <View>
            <Text style={styles.topic}>Mood Check-In</Text>
          </View>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.currentDate}>{currentDate}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.quizContainer}>
          <Text style={styles.question}>{questions[currentQuestion].question}</Text>

          {questions[currentQuestion].type === 'icon' ? (
            <View style={styles.iconContainer}>
              {questions[currentQuestion].answers.map((answer, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.iconButton,
                    selectedAnswer === answer.id ? styles.selectedIcon : null
                  ]}
                  onPress={() => handleAnswerSelect(answer.id)}
                >
                  {questions[currentQuestion].iconKey === 'emoji' ? (
                    <Text style={styles.emojiText}>{answer.emoji}</Text>
                  ) : (
                    <Icon name={answer.name} size={24} color="white" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.multiSelectContainer}>
              {(currentQuestion === 1 ? filteredFeelings : questions[currentQuestion].answers).map((answer) => (
                <TouchableOpacity
                  key={answer}
                  style={[
                    styles.multiSelectItem,
                    selectedAnswer === answer ? styles.selectedItem : styles.unselectedItem,
                  ]}
                  onPress={() => handleAnswerSelect(answer)}
                >
                  <Text style={styles.multiSelectText}>{answer}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.navigationButtons}>
            {currentQuestion > 0 && (
              <TouchableOpacity style={styles.navButton} onPress={handleBack}>
                <Icon name="arrow-left" size={16} color="white" />
                <Text style={styles.navButtonText}>Back</Text>
              </TouchableOpacity>
            )}

            {currentQuestion < questions.length - 1 ? (
              <TouchableOpacity style={styles.navButton} onPress={handleNext}>
                <Text style={styles.navButtonText}>Next</Text>
                <Icon name="arrow-right" size={16} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.navButton} onPress={handleSubmit}>
                <Text style={styles.navButtonText}>Submit</Text>
                <Icon name="check" size={16} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
        <NavBar style={styles.navigation} />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e1138',
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 85,
    paddingLeft:20,
  },
  topic: {
    color: '#2E4057',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 60,
    marginBottom:20,
  },
  dateContainer: {
    marginBottom: -20,
    alignItems: 'center'
  },
  currentDate: {
    fontSize: 18,
    color: '#2E4057',
  },
  quizContainer: {
    flexGrow: 1,
    paddingHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 40,
  },
  iconButton: {
    margin: 10,
    padding: 15,
    borderRadius: 50,
    backgroundColor: '#8b8b8b',
  },
  emojiText: {
    fontSize: 30,
  },
  selectedIcon: {
    backgroundColor: '#4c7f7f',
  },
  multiSelectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  multiSelectItem: {
    padding: 10,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
  },
  selectedItem: {
    backgroundColor: '#4c7f7f',
    borderColor: 'white',
  },
  unselectedItem: {
    backgroundColor: 'transparent',
    borderColor: '#4c7f7f',
  },
  multiSelectText: {
    color: 'white',
    fontSize: 16,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    padding: 10,
    borderRadius: 5,
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
  navigation: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  }
});

export default AddMoodCheckInPage;