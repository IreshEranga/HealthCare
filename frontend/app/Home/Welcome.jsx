import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import vector from '../../assets/images/Vector.png';
import rightArrow from '../../assets/images/rightArrow.png';
import mental from '../../assets/images/mentalFit2.png';
import NavBar from '../../components/NavBar';


export default function Welcome() {
  const [greetingMessage, setGreetingMessage] = useState('');
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('loggedInUser');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser && parsedUser.first_name) {
          setUserName(parsedUser.first_name);
        }
      } catch (error) {
        console.log('Error fetching user data', error);
      }
    };

    fetchUserData();

    const currentHour = new Date().getHours();
    let message = '';

    if (currentHour < 12) {
      message = 'Good Morning ';
    } else if (currentHour < 18) {
      message = 'Good Afternoon ';
    } else {
      message = 'Good Evening ';
    }

    setGreetingMessage(message);
  }, []);

  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();


  const handleMentalGoalSetup =async() => {
    navigation.navigate('PersonalizeMentalGoals/Quiz');
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.greeting}>
          {greetingMessage}, {userName ? userName : 'Guest'}
        </Text>
        <View>
          <Icon style={styles.usericon} name="user" size={34} color="white" />
        </View>

        <View style={styles.daydate}>
          <Text style={styles.date}>
            {date}/{month}/{year}
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.topic1}>Routine Plan</Text>
          <View style={styles.card}>
            <Image source={vector} style={styles.vector} />
            <Text style={styles.cardTitle}>Personalize your Routines.</Text>
            <Text style={styles.cardDetails}>Take the test and discover daily practices that align with your personality.</Text>

            <TouchableOpacity 
              style={styles.button} 
              onPress={() => navigation.navigate('Journey/JourneyPage')}
            >
              <Text style={styles.buttonText}>
                Take Task   <Image source={rightArrow} />
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.topic1}>Mental Fitness Plan</Text>
          <View style={styles.card}>
            <Image source={mental} style={styles.mental} />
            <Text style={styles.cardTitle}>Personalize your Goals.</Text>
            <Text style={styles.cardDetails}>Take the test and discover daily practices that align with your personality.</Text>

            <TouchableOpacity style={styles.button} onPress={handleMentalGoalSetup}>
              <Text style={styles.buttonText}>
                Setup          <Image source={rightArrow} />
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.topic1}>Personalize Diet Plan</Text>
          <View style={styles.card}>
            <Image source={vector} style={styles.vector} />
            <Text style={styles.cardTitle}>Personalize your Goals.</Text>
            <Text style={styles.cardDetails}>Take the test and discover daily practices that align with your personality.</Text>

            <TouchableOpacity style={styles.button} onPress={() => { /* Handle Task */ }}>
              <Text style={styles.buttonText}>
                Take Task <Image source={rightArrow} />
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.topic1}>Personalize Fitness Plan</Text>
          <View style={styles.card}>
            <Image source={vector} style={styles.vector} />
            <Text style={styles.cardTitle}>Personalize your Goals.</Text>
            <Text style={styles.cardDetails}>Take the test and discover daily practices that align with your personality.</Text>

            <TouchableOpacity style={styles.button} onPress={() => { /* Handle Task */ }}>
              <Text style={styles.buttonText}>
                Take Task <Image source={rightArrow} />
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
    
        {/* Add NavBar after ScrollView */}
        <Text style={styles.test}>Hi</Text>
        <NavBar  style={styles.navigation}/>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e1138',
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 200,
  },
  greeting: {
    textAlign: 'left',
    fontSize: 20,
    marginTop: 30,
    marginLeft: 25,
    color: 'white',
  },
  usericon: {
    marginLeft: 320,
    marginTop: -30,
  },
  topic1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
    marginLeft: 25,
  },
  date: {
    color: 'white',
    fontSize: 18,
    marginTop: -5,
    marginLeft:25,
    paddingBottom:10
  },
  daydate: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#d9d9d9',
    borderRadius: 10,
    padding: 20,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginTop: 40,
    opacity: 0.8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  cardDetails: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginTop: 5,
  },
  vector: {
    marginLeft: 135,
  },
  mental: {
    marginLeft: 110,
  },
  button: {
    backgroundColor: '#3A63F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 13,
    width: 160,
    marginLeft: 80,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  navigation : {
    marginTop:-150,
  },
  test : {
    marginTop:-120
  }
  
});