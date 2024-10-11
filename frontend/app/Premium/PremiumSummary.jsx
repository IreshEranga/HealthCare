import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../../components/NavBar';

export default function PremiumSummary() {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('Premium/PremiumForm'); // Replace 'NextPage' with your target page name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Premium Membership</Text>
      <Text style={styles.summary}>
        Elevate your fitness journey with our Premium Membership. Enjoy exclusive access to personalized workout plans, expert advice, and a supportive community. With premium, you'll unlock all the tools you need to stay motivated and achieve your goals faster!
      </Text>
      <Text style={styles.price}>$49.99 / month</Text>
      <Text style={styles.featuresTitle}>Features:</Text>
      <Text style={styles.features}>
        • Tailored fitness routines{'\n'}
        • Advanced tracking and insights{'\n'}
        • Access to expert coaches{'\n'}
        • Exclusive community challenges{'\n'}
        • Priority customer support
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleNavigate}>
        <Text style={styles.buttonText}>Explore Premium</Text>
      </TouchableOpacity>
      <NavBar style={styles.nav}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',  // A soft blue background for premium experience
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#00796b',  // Dark teal color
  },
  summary: {
    fontSize: 16,
    color: '#004d40',  // Darker teal for text
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    padding: 20,
  },
  price: {
    fontSize: 32,  // Large font for price
    fontWeight: 'bold',
    color: '#d32f2f',  // Red color for the price to make it stand out
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
  },
  features: {
    fontSize: 16,
    color: '#004d40',
    textAlign: 'left',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#00796b',  // Dark teal button background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',  // White text for the button
    fontSize: 18,
    fontWeight: 'bold',
  },
});
