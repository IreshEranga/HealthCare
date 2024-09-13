import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import relaximg from '../assets/images/relax.jpg';

export default function HomeScreen() {
  const navigation = useNavigation(); // Get navigation prop using useNavigation hook

  useEffect(() => {
    // Navigate to the LogIn screen after 5 seconds
    const timer = setTimeout(() => {
      navigation.navigate('LogIn');
    }, 3000);

    // Clear the timer if the component unmounts before 5 seconds
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={relaximg} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text1}>Ready to Thrive?</Text>
        <Text style={styles.text}>
          Smiling Mind’s app is expanding from a mindfulness app into full mental and physical fitness.
          Mental fitness is our foundation for thriving. Here, you’ll learn essential skills to support your wellbeing and build lifelong habits to navigate the ups and downs.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 300,
  },
  textContainer: {
    backgroundColor: '#718353',
    padding: 15,
    borderRadius:0,
    alignItems: 'center'
  },
  text1: {
    fontSize: 40,
    color: '#333',
    textAlign: 'center',
    marginTop:40,
    paddingBottom:40,
  },
  text: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom:180,
  },
});
