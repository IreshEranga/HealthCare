import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import vector from '../../assets/images/Vector.png';
import rightArrow from '../../assets/images/rightArrow.png';
import mental from '../../assets/images/mentalFit2.png';
import NavBar from '../../components/NavBar';
import Premium from '../../assets/images/premeum.png';
import Diet from '../../assets/images/diet.png';

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
      message = 'Good Morning 🌤️';
    } else if (currentHour < 18) {
      message = 'Good Afternoon 🌞';
    } else {
      message = 'Good Evening 🌛';
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
          <Icon style={styles.usericon} name="user" size={34} color="white" onPress={() => navigation.navigate('ProfilePage')}/>
        </View>

        <View style={styles.daydate}>
          <Text style={styles.date}>
            {date}/{month}/{year}
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>

          <Text style={styles.topic1}>Journey to Balance 📈</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Journey/JourneyPage')}>
            <View style={styles.card}>
              <Image source={vector} style={styles.vector} />
              
              <Text style={styles.cardTitle}>Track Your Progress..</Text>
              <Text style={styles.cardDetails}>
                Keep an eye on your daily routines, mood trends, and journal entries to see how you’re growing day by day.
              </Text>
              {/*<TouchableOpacity 
                      style={styles.button} 
                      onPress={() => navigation.navigate('Journey/JourneyPage')}
                    >
                      <Text style={styles.buttonText}>
                        Take Task   <Image source={rightArrow} />
                      </Text>
              </TouchableOpacity>*/}
            </View>
          </TouchableOpacity>

          <Text style={styles.topic1}>Mental Fitness Goals 🎯</Text>
          <TouchableOpacity onPress={handleMentalGoalSetup}>
          <View style={styles.card}>
            <Image source={mental} style={styles.mental} />
            <Text style={styles.cardTitle}>Personalize your Goals..</Text>
            <Text style={styles.cardDetails}>Take the test and discover daily practices that align with your personality.</Text>

            {/*<TouchableOpacity style={styles.button} onPress={handleMentalGoalSetup}>
              <Text style={styles.buttonText}>
                Setup          <Image source={rightArrow} />
              </Text>
            </TouchableOpacity>*/}
          </View>
          </TouchableOpacity>

          <Text style={styles.topic1}>Personalize Diet Plan 🍴</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Nutritions/nutritionHome')}>
          <View style={styles.card}>
            <Image source={Diet} style={styles.diet} />
            <Text style={styles.cardTitle}>Personalize Your Daily Meal...</Text>
            <Text style={styles.cardDetails}>Log your daily food diary and maintain calorie goal to practice a healthy lifestyle</Text>

            {/*<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Nutritions/nutritionHome')}>
              <Text style={styles.buttonText}>
                Take Task <Image source={rightArrow} />
              </Text>
            </TouchableOpacity>*/}
          </View>
          </TouchableOpacity>

          <Text style={styles.topic1}>Personalize Fitness Plan 🏃</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Fitness/FitnessPlan')}>
          <View style={styles.card}>
            <Image source={vector} style={styles.vector} />
            <Text style={styles.cardTitle}>Personalize your Goals..</Text>
            <Text style={styles.cardDetails}>Discover personalized fitness routines designed to fit your unique lifestyle!</Text>

            {/*<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Fitness/FitnessPlan')}>
              <Text style={styles.buttonText}>
                Take Task <Image source={rightArrow} />
              </Text>
            </TouchableOpacity>*/}
          </View>
          </TouchableOpacity>

          <Text style={styles.topic1}>Upgrade Membership </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Premium/PremiumSummary')}>
          <View style={styles.card}>
            <View style={styles.imgborder}><Image source={Premium} style={styles.premImg} /></View>
            <Text style={styles.cardTitle}>Personalize your Goals..</Text>
            <Text style={styles.cardDetailsPrem}>Unlock exclusive fitness plans, expert guidance, and more with our Premium Membership!</Text>


            {/*<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Fitness/FitnessPlan')}>
              <Text style={styles.buttonText}>
                Take Task <Image source={rightArrow} />
              </Text>
            </TouchableOpacity>*/}
          </View>
          </TouchableOpacity>
        </ScrollView>
    
        {/* Add NavBar after ScrollView */}
        <Text style={styles.test}></Text>
        <NavBar  style={styles.navigation}/>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    color: '#0e1138',
  },
  usericon: {
    marginLeft: 320,
    marginTop: -30,
    color:'#0e1138',
  },
  topic1: {
    color: '#0e1138',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
    marginLeft: 25,
    textAlign:'center',
    marginBottom:0,
  },
  date: {
    color: '#0e1138',
    fontSize: 18,
    marginTop: -5,
    marginLeft:25,
    paddingBottom:30
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
    margin: 20,
    shadowColor: '##0e1138',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginTop: 30,
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
  cardDetailsPrem:{
    fontSize: 20,
    color: '#ad0303',
    textAlign: 'center',
    marginTop: 5,
  },
  vector: {
    marginLeft: 135,
  },
  mental: {
    marginLeft: 110,
  },
  diet: {
    height: 80,
    width: 80,
    margin: 'auto',
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
    marginTop:-150
  },
  premImg : {
    width:100,
    height:110,
    left:5,
    borderWidth:50,
    borderColor:'#0000'
  },
  imgborder:{
    backgroundColor:'rgb(137, 106, 1)',
    padding:20,
    width:150,
    left:80,
    borderRadius:100,
  }  
});