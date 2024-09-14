import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import bg2 from '../assets/images/bgsignup.jpg';
//import { BACKEND_URL } from '@env'; // Ensure this is correctly set in your environment

export default function LogInPage() {
  const navigation = useNavigation();
  const [username, setUsername] = useState(''); // Add state for username
  const [password, setPassword] = useState(''); // Add state for password

  
  // React Native LogInPage Component
  const handleLogIn = async () => {

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log(apiUrl);
    if (username && password) {
      console.log("Username and password typed");
      try {
        // Make a POST request to the backend
        const response = await fetch(`${apiUrl}/users/logIn`/*'http://192.168.203.63:8000/users/logIn'*/, {
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
        console.log(result);

        if (response.ok) {
          // Handle successful login (e.g., save the token or user data)
          const user = result.user; // Or result.token, depending on what the backend sends

          // Save user data or token in AsyncStorage
          await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));

          // Navigate to the home/welcome screen
          navigation.navigate('Home/Welcome');
          console.log(user);
        } else {
          alert(result.message || 'Login failed'); // Display error message
        }
      } catch (error) {
        console.log('Login error', error);
        alert('An error occurred. Please try again.');
      }
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image */}
      <Image
        source={bg2}
        style={styles.backgroundImage}
      />

      <View style={styles.formContainer}>
        <Text style={styles.logintxt}>LogIn</Text>

        <TextInput
          style={styles.input}
          placeholder='User Name'
          value={username} // Bind input to username state
          onChangeText={setUsername} // Update state on input change
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password} // Bind input to password state
          onChangeText={setPassword} // Update state on input change
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.logbtn} onPress={handleLogIn}>
          <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>
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
    marginBottom: 80
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white background
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
});
