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
      <Text>Feelings: {quiz.feelings}</Text>
      <Text>Stress: {quiz.stress}</Text>
      <Text>Sleep: {quiz.sleep}</Text>
      <Text>Relax: {quiz.relax}</Text>
      <Text>Work Balance: {quiz.workbalance}</Text>
      <Text>Anxious: {quiz.anxious}</Text>
      <Text>Meditation: {quiz.meditation}</Text>
      <Text style={styles.progressText}>Progress: {quiz.progress}%</Text>
    </View>
  );
};

export default function QuizProgress() {
  const [userID, setUserID] = useState('');
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setQuizData(response.data.data);
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
            
          <FlatList
            data={quizData}
            renderItem={({ item }) => <QuizCard quiz={item} />}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContent}
            //ListFooterComponent={<NavBar />} // Move NavBar here
          />
        )}
      </LinearGradient>
      <NavBar/>
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
    marginLeft:30,
    marginRight:30,
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
  loadingText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 18,
  },
  listContent: {
    paddingBottom: 50,
  },
});
