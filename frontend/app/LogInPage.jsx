import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import bg2 from '../assets/images/bg2.jpg';

export default function LogInPage() {
  const navigation = useNavigation();
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [loading, setLoading] = useState(false); // Loading state

  const handleSignUp = () => {
    navigation.navigate('SignUp');    
  };
  
  const handleLogIn = async () => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    if (username && password) {
      setLoading(true);  // Show loading spinner
      try {
        // Make a POST request to the backend
        const response = await fetch(`${apiUrl}/users/logIn`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: username,  // Assuming email is used as the username
            password: password,
          }),
        });

        const result = await response.json(); // Parse the JSON response

        if (response.ok) {
          // Save user data or token in AsyncStorage
          const user = result.user; // Or result.token, depending on what the backend sends
          await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));

          // Navigate to the home/welcome screen
          navigation.navigate('Home/Welcome');
        } else {
          alert(result.message || 'Login failed'); 
        }
      } catch (error) {
        alert('An error occurred. Please try again.');
      } finally {
        setLoading(false); // Hide loading spinner
      }
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image */}
      <Image source={bg2} style={styles.backgroundImage} />

      <View style={styles.formContainer}>
        <Text style={styles.logintxt}>LogIn</Text>

        <TextInput
          style={styles.input}
          placeholder="User Name"
          value={username} 
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password} 
          onChangeText={setPassword}
        />

        {/* Show loading spinner or Log In button based on loading state */}
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : (
          <TouchableOpacity style={styles.logbtn} onPress={handleLogIn}>
            <Text style={styles.btnText}>Log In</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.signup}>
          New to FitPro?{'  '}
          <Text style={styles.signupLink} onPress={handleSignUp}>
             Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logintxt: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40
  },
  container: {
    backgroundColor: '#fff',
    marginBottom: 100,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    height: 800,
    width: 'auto',
    position: 'absolute',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 30,
    padding: 16,
    marginTop: 190,
    marginLeft: 20,
    marginRight: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginTop: 20,
  },
  logbtn: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signup: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom:10,
  },
  signupLink: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
