import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import NavBar from '../../components/NavBar';

export default function PremiumForm() {
  const navigation = useNavigation();
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [price, setprice] = useState('');
  const [name, setName] = useState('');
  const [_id, set_id] = useState('');

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('loggedInUser');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        console.log('Parsed User:', parsedUser); // Debugging log

        if (parsedUser && parsedUser._id) {
          set_id(parsedUser._id);
        }
      } catch (error) {
        console.log('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  // Replace with the actual user ID (you can get this from your app's state or context)
  

  const validateForm = () => {
    if (!cardNumber || cardNumber.length !== 16) {
      ToastAndroid.show('Invalid card number', ToastAndroid.SHORT);
      return false;
    }
    if (!expiryDate || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiryDate)) {
      ToastAndroid.show('Invalid expiry date. Use MM/YY format', ToastAndroid.SHORT);
      return false;
    }
    if (!cvv || cvv.length !== 3) {
      ToastAndroid.show('Invalid CVV', ToastAndroid.SHORT);
      return false;
    }
    if (!name) {
      ToastAndroid.show('Cardholder name is required', ToastAndroid.SHORT);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // Make the API call to update the user type to premium
        const response = await axios.put(`${apiUrl}/users/users/${_id}/type/premium`);
        
        if (response.status === 200) {
          ToastAndroid.show('Payment Successful! User upgraded to Premium.', ToastAndroid.SHORT);
          navigation.navigate('Home/Welcome');  // Navigate to Home page after success
        } else {
          ToastAndroid.show('Failed to upgrade to Premium. Try again.', ToastAndroid.SHORT);
        }
      } catch (error) {
        console.error('Error upgrading to premium:', error);
        ToastAndroid.show('Error processing payment. Please try again.', ToastAndroid.SHORT);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Card Details</Text>

      <View style={styles.form}>

      <TextInput
          style={styles.input}
          placeholder="Cardholder Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Card Number"
          keyboardType="numeric"
          maxLength={16}
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        <TextInput
          style={styles.input}
          placeholder="Expiry Date (MM/YY)"
          keyboardType="numeric"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />

        <TextInput
          style={styles.input}
          placeholder="CVV"
          keyboardType="numeric"
          maxLength={3}
          value={cvv}
          onChangeText={setCvv}
        />

        <TextInput
          style={styles.input}
          placeholder="$49.99"
          value={price}
          onChangeText={setprice}
          readOnly
        />

        

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <NavBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#00796b',
    padding: 20,
    paddingHorizontal:20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#ffffff',
    paddingHorizontal:20,
  },
  button: {
    backgroundColor: '#00796b',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  form:{
    padding:20,
  }
});
