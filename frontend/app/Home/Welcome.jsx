import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity,ScrollView } from 'react-native';
import React from 'react';
//import bgnight from '../../assets/images/homenight.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import vector from '../../assets/images/Vector.png'
import rightArrow from '../../assets/images/rightArrow.png'
import mental from '../../assets/images/mentalFit2.png';

export default function Welcome() {
  const currentHour = new Date().getHours();

  const date = new Date().getDate();
  const month = new Date().getMonth() + 1; 
  const year = new Date().getFullYear();

  let greetingMessage = '';

  if (currentHour < 12) {
    greetingMessage = 'Good Morning';
  } else if (currentHour < 18) {
    greetingMessage = 'Good Afternoon';
  } else {
    greetingMessage = 'Good Night';
  }

  return (
    <SafeAreaView style={styles.container}>
      {/*<Image source={bgnight} style={styles.backgroundImage} />*/}
      <View>
        {/* <Text style={styles.hometext}>Home</Text> */}
        <Text style={styles.greeting}>{greetingMessage}</Text>
        <View>
          <Icon style={styles.usericon} name="user" size={34} color="white" />
        </View>

        <View style={styles.daydate}>
          
          <Text style={styles.date}>
            {date}/{month}/{year}
          </Text>
        </View>

        {/* Card Component for Tasks */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.topic1}>Routing Plan</Text>
        <View style={styles.card}>
          <Image source={vector} style={styles.vector}/>
          <Text style={styles.cardTitle}>
            Personalize your Routines.
          </Text>
          <Text style={styles.cardDetails}>Take the test and discover daily practices that align with your personality.</Text>

          <TouchableOpacity style={styles.button} onPress={this.handleTakeTask}>
            <Text style={styles.buttonText}>Take Task {' '} <Image 
            source={rightArrow}/></Text>
        </TouchableOpacity>

        </View>

        <Text style={styles.topic1}>Mental Fitness  Plan</Text>

        <View style={styles.card}>
        
          <Image source={mental} style={styles.mental}/>
          <Text style={styles.cardTitle}>
            Personalize your Goals.
          </Text>
          <Text style={styles.cardDetails}>Take the test and discover daily practices that align with your personality.</Text>

          <TouchableOpacity style={styles.button} onPress={this.handleTakeTask}>
            <Text style={styles.buttonText}>Take Task {' '} <Image 
            source={rightArrow}/></Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.topic1}>Personalize Diet Plan</Text>
        <View style={styles.card}>
          <Image source={vector} style={styles.vector}/>
          <Text style={styles.cardTitle}>
            Personalize your Goals.
          </Text>
          <Text style={styles.cardDetails}>Take the test and discover daily practices that align with your personality.</Text>

          <TouchableOpacity style={styles.button} onPress={this.handleTakeTask}>
            <Text style={styles.buttonText}>Take Task {' '} <Image 
            source={rightArrow}/></Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.topic1}>Personalize Fitness Plan</Text>
        <View style={styles.card}>
          <Image source={vector} style={styles.vector}/>
          <Text style={styles.cardTitle}>
            Personalize your Goals.
          </Text>
          <Text style={styles.cardDetails}>Take the test and discover daily practices that align with your personality.</Text>

          <TouchableOpacity style={styles.button} onPress={this.handleTakeTask}>
            <Text style={styles.buttonText}>Take Task {' '} <Image 
            source={rightArrow}/></Text>
          </TouchableOpacity>

        </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e1138',
    marginBottom: 100,
  },
  scrollContainer: {
    paddingBottom: 200,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    height: 800,
    width: 'auto',
    position: 'absolute',
  },
  hometext: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 20,
    color: 'white',
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
    marginLeft: 280,
    position:'sticky'
  },
  daydate: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  // Card Component Styles
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
    marginTop:40,
    opacity:0.8
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,
    textAlign:'center',
  },
  cardDetails: {
    fontSize: 16,
    color: '#000000',
    textAlign:'center',
    marginTop:5,
  },
  vector:{
    marginLeft:135
  },
  mental:{
    marginLeft:110
  },
  button: {
    backgroundColor: '#3A63F4', // Button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 13,
    width:160,
    marginLeft:80,
  },
  buttonText: {
    color: '#fff', // Button text color
    fontSize: 20,
    textAlign: 'center',
    fontStyle:'bold',
    fontWeight:'bold'
  },
});
