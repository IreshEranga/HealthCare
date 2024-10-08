import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import NavBar from '../../components/NavBar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function Quiz() {
  const [userID, setUserID] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [error, setError] = useState('');
  const [score, setScore] = useState(0);

 

  const navigation = useNavigation();

  useEffect(() => {
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

    fetchUserData();
  }, []);

  // Sample questions with answers and their respective scores
  const questions = [
    {
      question: "How are you feeling today?",
      answers: [
        { text: "Great", score: 5 },
        { text: "Good", score: 4 },
        { text: "Okay", score: 3 },
        { text: "Bad", score: 1 },
      ]
    },
    {
      question: "How often do you feel stressed?",
      answers: [
        { text: "Rarely", score: 5 },
        { text: "Sometimes", score: 3 },
        { text: "Often", score: 2 },
        { text: "Always", score: 1 },
      ]
    },
    {
      question: "How well do you sleep at night?",
      answers: [
        { text: "Very well", score: 5 },
        { text: "Well", score: 4 },
        { text: "Not great", score: 2 },
        { text: "Terribly", score: 1 },
      ]
    },
    {
      question: "How often do you take time to relax?",
      answers: [
        { text: "Daily", score: 5 },
        { text: "A few times a week", score: 4 },
        { text: "Rarely", score: 2 },
        { text: "Never", score: 1 },
      ]
    },
    {
      question: "How satisfied are you with your work-life balance?",
      answers: [
        { text: "Very satisfied", score: 5 },
        { text: "Satisfied", score: 4 },
        { text: "Neutral", score: 3 },
        { text: "Not satisfied", score: 1 },
      ]
    },
    {
      question: "How often do you feel anxious or overwhelmed?",
      answers: [
        { text: "Rarely", score: 5 },
        { text: "Sometimes", score: 3 },
        { text: "Often", score: 2 },
        { text: "Always", score: 1 },
      ]
    },
    {
      question: "Do you practice mindfulness or meditation?",
      answers: [
        { text: "Yes, regularly", score: 5 },
        { text: "Sometimes", score: 3 },
        { text: "Rarely", score: 2 },
        { text: "Never", score: 1 },
      ]
    },
  ];

  const handleAnswerSelect = (answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = answer;
    setSelectedAnswers(updatedAnswers);
    setError('');
  };

  const handleNext = () => {
    if (!selectedAnswers[currentQuestion]) {
      setError('Please select an answer');
    } else {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setError('');
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setError('');
    }
  };

  const calculateTotalScore = () => {
    let totalScore = 0;
    selectedAnswers.forEach(answer => {
      totalScore += answer?.score || 0;
    });
    setScore(totalScore);
    console.log(totalScore);
    return totalScore;
  };
/*
  const handleSubmit = async () => {
    if (!selectedAnswers[currentQuestion]) {
      setError('Please select an answer');
    } else {
      const currentTotalScore = calculateTotalScore();

      try {
        const quizData = {
          userID: userID,
          feelings: selectedAnswers[0].text,
          stress: selectedAnswers[1].text,
          sleep: selectedAnswers[2].text,
          relax: selectedAnswers[3].text,
          workbalance: selectedAnswers[4].text,
          anxious: selectedAnswers[5].text,
          meditation: selectedAnswers[6].text,
          totalScore: currentTotalScore,
        };

        const response = await fetch(`${apiUrl}/users/quiz`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(quizData),
        });

        if (response.ok) {
          const result = await response.json();
          alert("Quiz submitted successfully! Your score is: " + currentTotalScore);
          setSelectedAnswers([]);
          setCurrentQuestion(0);
          setTimeout(() => {
            navigation.navigate('PersonalizeMentalGoals/Loading');
          }, 3000);
        } else {
          alert("Failed to submit quiz");
        }
      } catch (error) {
        console.error('Error submitting quiz:', error);
        alert("An error occurred during quiz submission");
      }
      setError('');
    }
  };*/
  const handleSubmit = async () => {
    if (!selectedAnswers[currentQuestion]) {
      setError('Please select an answer');
    } else {
      const currentTotalScore = calculateTotalScore();
  
      // Prepare quiz data with scores
      const quizData = {
        userID: userID,
        feelings: selectedAnswers[0],
        stress: selectedAnswers[1],
        sleep: selectedAnswers[2],
        relax: selectedAnswers[3],
        workbalance: selectedAnswers[4],
        anxious: selectedAnswers[5],
        meditation: selectedAnswers[6],
        totalScore: currentTotalScore,
      };
  
      try {
        const response = await fetch(`${apiUrl}/users/quiz`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(quizData),
        });
  
        if (response.ok) {
          const result = await response.json();
          alert("Quiz submitted successfully! Your score is: " + currentTotalScore);
          setSelectedAnswers([]);
          setCurrentQuestion(0);
          setTimeout(() => {
            navigation.navigate('PersonalizeMentalGoals/Loading');
          }, 3000);
        } else {
          alert("Failed to submit quiz");
        }
      } catch (error) {
        console.error('Error submitting quiz:', error);
        alert("An error occurred during quiz submission");
      }
      setError('');
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#ffffff', '#D7E1E8']} style={styles.gradient}>
        <NavBar title="Quiz" />
        <ScrollView style={styles.scrollView}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
            {questions[currentQuestion].answers.map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.answerButton,
                  selectedAnswers[currentQuestion]?.text === answer.text && styles.selectedAnswer,
                ]}
                onPress={() => handleAnswerSelect(answer)}
              >
                <Text style={styles.answerText}>{answer.text}</Text>
              </TouchableOpacity>
            ))}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          {currentQuestion < questions.length - 1 ? (
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    marginBottom: 60,
  },
  questionContainer: {
    padding: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answerButton: {
    padding: 15,
    backgroundColor: '#D7E1E8',
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedAnswer: {
    backgroundColor: '#6C94C4', // Highlighted color
  },
  answerText: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
