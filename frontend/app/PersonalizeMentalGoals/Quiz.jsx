import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Button } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

export default function Quiz() {
  // Sample questions
  const questions = [
    {
      question: "How are you feeling today?",
      answers: ["Great", "Good", "Okay", "Bad"]
    },
    {
      question: "How often do you feel stressed?",
      answers: ["Rarely", "Sometimes", "Often", "Always"]
    },
    {
      question: "Do you exercise regularly?",
      answers: ["Yes", "No", "Occasionally"]
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0); // Track current question index
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer

  // Function to handle answer selection
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  // Function to handle "Next" button
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null); // Reset the selected answer for the next question
    }
  };

  // Function to handle "Back" button
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null); // Reset the selected answer for the previous question
    }
  };

  // Function to handle quiz submission
  const handleSubmit = () => {
    // Handle form submission logic here (e.g., save responses, show results)
    alert("Quiz submitted!");
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
                selectedAnswer === answer ? styles.selectedAnswer : null
              ]}
              onPress={() => handleAnswerSelect(answer)}
            >
              <Text style={styles.answerText}>{answer}</Text>
            </TouchableOpacity>
          ))}

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
                disabled={!selectedAnswer}
              >
                <Text style={styles.navButtonText}>Next</Text>
                <Icon name="arrow-right" size={16} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.navButton}
                onPress={handleSubmit}
                disabled={!selectedAnswer}
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
    backgroundColor: '#0e1138',
    flex: 1, // Ensure the container takes full height
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  usericon: {
    marginLeft: 340,
    marginTop: -30,
  },
  topic: {
    color: '#2E4057',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 30,
    textAlign: 'center',
  },
  details: {
    color: 'black',
    fontSize: 18,
    padding: 20,
    textAlign: 'center',
    marginTop: 20
  },
  quizContainer: {
    padding: 25,
    alignItems: 'center',
    backgroundColor:'white',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    // Shadow for iOS
    shadowColor: '#00e9e9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
    
    // Shadow for Android
    elevation: 50,
  },
  question: {
    fontSize: 20,
    color: '#2E4057',
    marginBottom: 20,
  },
  answerButton: {
    backgroundColor: '#d3d3d3',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  selectedAnswer: {
    backgroundColor: '#60768d',
  },
  answerText: {
    fontSize: 18,
    color: '#2E4057',
  },
  navigationButtons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E4057',
    padding: 10,
    borderRadius: 10,
  },
  navButtonText: {
    color: 'white',
    marginHorizontal: 5,
    fontSize: 16,
  }
});
