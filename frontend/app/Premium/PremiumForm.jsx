import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function PremiumForm() {
  const navigation = useNavigation();
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

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

  const handleSubmit = () => {
    if (validateForm()) {
      ToastAndroid.show('Payment Successful!', ToastAndroid.SHORT);
      navigation.navigate('Home/Welcome');  // Navigate to Home page
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Card Details</Text>

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
        placeholder="Cardholder Name"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#00796b',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#ffffff',
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
});
