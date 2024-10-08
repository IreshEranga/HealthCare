import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import NavBar from '../../components/NavBar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function Quiz() {
  const [userID, setUserID] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0); // Track current question index
  const [selectedAnswers, setSelectedAnswers] = useState([]); // Track selected answers for all questions
  const [error, setError] = useState(''); // Track if an error needs to be shown
  const [score, setScore] = useState(0); // Track the user's total score

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

  // Function to handle answer selection
  const handleAnswerSelect = (answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = answer; // Store answer for the current question
    setSelectedAnswers(updatedAnswers);
    setError(''); // Clear error if an answer is selected
  };

  // Function to handle "Next" button
  const handleNext = () => {
    if (!selectedAnswers[currentQuestion]) {
      setError('Please select an answer');
    } else {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setError(''); // Clear error when moving to the next question
      }
    }
  };

  // Function to handle "Back" button
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setError(''); // Clear error
    }
  };

  // Function to calculate the total score
  const calculateTotalScore = () => {
    let totalScore = 0;
    selectedAnswers.forEach(answer => {
      totalScore += answer.score;
    });
    setScore(totalScore);
  };

  // Function to handle quiz submission
  /*
  const handleSubmit = async () => {
    if (!selectedAnswers[currentQuestion]) {
      setError('Please select an answer');
    } else {
      calculateTotalScore();

      try {
        // Gather the answers according to your schema
        const quizData = {
          userID: userID,  // Replace with the actual user ID
          feelings: selectedAnswers[0].text,  // First question's answer
          stress: selectedAnswers[1].text,    // Second question's answer
          sleep: selectedAnswers[2].text,     // Third question's answer
          relax: selectedAnswers[3].text,     // Fourth question's answer
          workbalance: selectedAnswers[4].text, // Fifth question's answer
          anxious: selectedAnswers[5].text,    // Sixth question's answer
          meditation: selectedAnswers[6].text, // Seventh question's answer
          totalScore: score,                   // Total score
        };

        // Send POST request to the backend
        const response = await fetch(`${apiUrl}/users/quiz`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(quizData),
        });

        if (response.ok) {
          const result = await response.json();
          alert("Quiz submitted successfully! Your score is: " + score);

          // Navigate after submission
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
  */

  // Function to handle quiz submission
const handleSubmit = async () => {
  if (!selectedAnswers[currentQuestion]) {
    setError('Please select an answer');
  } else {
    calculateTotalScore(); // Calculate total score

    // Ensure that the score state is updated before proceeding
    const currentTotalScore = score; // Capture the current score

    try {
      // Gather the answers according to your schema
      const quizData = {
        userID: userID,  // Replace with the actual user ID
        feelings: selectedAnswers[0].text,  // First question's answer
        stress: selectedAnswers[1].text,    // Second question's answer
        sleep: selectedAnswers[2].text,     // Third question's answer
        relax: selectedAnswers[3].text,     // Fourth question's answer
        workbalance: selectedAnswers[4].text, // Fifth question's answer
        anxious: selectedAnswers[5].text,    // Sixth question's answer
        meditation: selectedAnswers[6].text, // Seventh question's answer
        totalScore: currentTotalScore,      // Total score
      };

      // Send POST request to the backend
      const response = await fetch(`${apiUrl}/users/quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Quiz submitted successfully! Your score is: " + currentTotalScore); // Show the captured score

        // Navigate after submission
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
      <LinearGradient 
        colors={['#E0BBE4','#aec2b6', '#60768d']}
        style={styles.background}
      >
        <View>
          <Text style={styles.topic}>Personalize Goals</Text>
        </View>

        <View>
          <Icon style={styles.usericon} name="user" size={34} color="#2E4057" />
        </View>

        <View>
          <Text style={styles.details}>
            First fill the form to get an idea about your mental condition. Then we will suggest a set of goals for you.
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.quizContainer}>
          <Text style={styles.question}>{questions[currentQuestion].question}</Text>

          {/* Render answers as buttons */}
          {questions[currentQuestion].answers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.answerButton,
                selectedAnswers[currentQuestion]?.text === answer.text ? styles.selectedAnswer : null
              ]}
              onPress={() => handleAnswerSelect(answer)}
            >
              <Text style={styles.answerText}>{answer.text}</Text>
            </TouchableOpacity>
          ))}

          {/* Display error message */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.navigationButtons}>
            {/* Back button with icon */}
            {currentQuestion > 0 && (
              <TouchableOpacity style={styles.navButton} onPress={handleBack}>
                <Icon name="arrow-left" size={16} color="white" />
                <Text style={styles.navButtonText}>Back</Text>
              </TouchableOpacity>
            )}

            {/* Next/Submit button with icon */}
            {currentQuestion < questions.length - 1 ? (
              <TouchableOpacity
                style={styles.navButton}
                onPress={handleNext}
              >
                <Text style={styles.navButtonText}>Next</Text>
                <Icon name="arrow-right" size={16} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.navButton}
                onPress={handleSubmit}
              >
                <Text style={styles.navButtonText}>Submit</Text>
                <Icon name="check" size={16} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    padding: 20,
  },
  topic: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4057',
    textAlign: 'center',
    marginBottom: 20,
  },
  usericon: {
    textAlign: 'center',
  },
  details: {
    fontSize: 16,
    color: '#2E4057',
    textAlign: 'center',
    marginBottom: 20,
  },
  quizContainer: {
    padding: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  answerButton: {
    backgroundColor: '#B39CD0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedAnswer: {
    backgroundColor: '#6D6875',
  },
  answerText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E4057',
    padding: 10,
    borderRadius: 5,
  },
  navButtonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
});
