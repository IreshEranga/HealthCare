import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
//import LoadingAnimation from '../../assets/videos/loadingAnimation.gif'; // Ensure correct path
import LoadingAnimation from '../../assets/videos/square.gif';
import { useNavigation } from '@react-navigation/native';


export default function Loading() {

  const navigation = useNavigation();

  useEffect(() => {
    // Set a timeout to navigate after 5 seconds
    const timeout = setTimeout(() => {
      navigation.navigate('PersonalizeMentalGoals/Suggestions'); 
      console.log("Naviagtion success")
    }, 5000);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient 
        colors={['#E0BBE4','#aec2b6', '#60768d']}
        style={styles.background}>

        <View>
          <Text style={styles.topic}>Personalize Goals</Text>
        </View>

        <View>
          <Icon style={styles.usericon} name="user" size={34} color="#2E4057" />
        </View>

        <View style={styles.loadingContainer}>
          <Image source={LoadingAnimation} style={styles.loadingGif} />
          <Text style={styles.loadingText}>Please wait, personalizing your goals...</Text>
        </View>

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingGif: {
    width: 500,
    height: 200,
    padding:50,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#2E4057',
  },
});
