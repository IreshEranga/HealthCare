import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const QuizCard = ({ quiz }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Quiz Date: {new Date(quiz.createdAt).toLocaleDateString()}</Text>
      <Text>Feelings: {quiz.feelings} (Score: {quiz.feelingsScore})</Text>
      <Text>Stress: {quiz.stress} (Score: {quiz.stressScore})</Text>
      <Text>Sleep: {quiz.sleep} (Score: {quiz.sleepScore})</Text>
      <Text>Relax: {quiz.relax} (Score: {quiz.relaxScore})</Text>
      <Text>Work Balance: {quiz.workbalance} (Score: {quiz.workbalanceScore})</Text>
      <Text>Anxious: {quiz.anxious} (Score: {quiz.anxiousScore})</Text>
      <Text>Meditation: {quiz.meditation} (Score: {quiz.meditationScore})</Text>
      <Text style={styles.progressText}>Total Score: {quiz.totalScore}</Text>
    </View>
  );
};

export default function QuizProgress() {
  const [userID, setUserID] = useState('');
  const [quizData, setQuizData] = useState([]);
  const [totalScore, setTotalScore] = useState(0); // State for total score
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(''); // State for feedback message
  const [message1, setMessage1] = useState(''); // State for feedback message

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

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/quiz/${userID}`);
        const quizzes = response.data.results;

        setQuizData(quizzes); // Set quiz results
        setTotalScore(response.data.totalScore); // Set total score

        // Check for today's quiz and compare scores
        const today = new Date().toLocaleDateString();
        const todayQuiz = quizzes.find(quiz => new Date(quiz.createdAt).toLocaleDateString() === today);

        // If today's quiz is not found, show message
        if (!todayQuiz) {
          setMessage1('You have not completed today\'s quiz. Please do the quiz!');
        } else if (todayQuiz.totalScore >= (quizzes[quizzes.length - 1]?.totalScore || 0)) {
          setMessage('Great job! Your score today is greater than  to last day\'s score.');
        } else {
          setMessage1('You Have to try more Mental Fitness Exercices.');
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchQuizData();
    }
  }, [userID]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#E0BBE4', '#aec2b6', '#60768d']} style={styles.background}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <>
            
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>{message}</Text>
              <Text style={styles.messageText1}>{message1}</Text>
            </View>
            <FlatList
              data={quizData}
              renderItem={({ item }) => <QuizCard quiz={item} />}
              keyExtractor={(item) => item.id} // Use id from the quiz
              contentContainerStyle={styles.listContent}
            />
          </>
        )}
      </LinearGradient>
      <NavBar />
    </SafeAreaView>
  );
}

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
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,
    marginLeft: 30,
    marginRight: 30,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  progressText: {
    marginTop: 10,
    fontWeight: 'bold',
    color: '#60768d',
  },
  totalScoreText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginVertical: 15,
  },
  messageContainer: {
    backgroundColor: '#ffffff', // Background color for message container
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,
  },
  messageText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333333', // Darker text color for contrast
  },
  messageText1: {
    textAlign: 'center',
    fontSize: 16,
    color: '#ff0000', // Darker text color for contrast
  },
  loadingText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 18,
  },
  listContent: {
    paddingBottom: 50,
  },
});
