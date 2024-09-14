import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import bg2 from '../assets/images/bgsignup.jpg';



const SignUp = () => {

  

  const data = [
    { key: '1', value: 'Male' },
    { key: '2', value: 'Female' },
    { key: '3', value: 'Other' },
  ];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [profession, setProfession] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [signUp, setSignUp] = useState([]);

  const navigation = useNavigation(); // Use navigation hook

  const handleSignUp = async () => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log(apiUrl);
  
    if (password !== retypePassword) {
      setErrorMessage('Passwords do not match!');
    } else {
      setErrorMessage('');
      console.log("Password Match");

      try {
        const response = await axios.post(/*'http://192.168.203.63:8000/users/signUp'*/`${apiUrl}/users/signUp`, {
          first_name: firstName,
          last_name: lastName,
          email: email,
          mobile: mobile,
          profession: profession,
          gender: selectedValue,
          password: password
        });

        setSignUp(response.data);
        console.log(response.data);

        // Show success toast
        Toast.show({
          type: 'success',
          text1: 'Sign Up Successful!',
          text2: 'You have been signed up successfully.'
        });

        // Clear the form
        setFirstName('');
        setLastName('');
        setEmail('');
        setMobile('');
        setProfession('');
        setSelectedValue('');
        setPassword('');
        setRetypePassword('');

        // Navigate to login page after 2 seconds (or immediately)
        setTimeout(() => {
          navigation.navigate('LogInPage'); // Navigate to Login screen
        }, 2000);
        
      } catch (error) {
        if (error.response) {
          console.log("Error Response:", error.response.data);
          Alert.alert("Error", error.response.data.message || "Sign Up Failed");
        } else if (error.request) {
          console.log("No Response:", error.request);
        } else {
          console.log("Error:", error.message);
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={bg2} style={styles.backgroundImage} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.formContainer}>
          <Text style={styles.signuptxt}>Sign Up</Text>

          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile"
            value={mobile}
            keyboardType="phone-pad"
            onChangeText={setMobile}
          />
          <TextInput
            style={styles.input}
            placeholder="Profession"
            value={profession}
            onChangeText={setProfession}
          />
          <Text style={styles.label}>Gender</Text>
          <Picker
            selectedValue={selectedValue}
            style={styles.picker}
            mode="dropdown"
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            {data.map(item => (
              <Picker.Item key={item.key} label={item.value} value={item.value} />
            ))}
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input1}
            placeholder="Re-type Password"
            secureTextEntry
            value={retypePassword}
            onChangeText={setRetypePassword}
          />
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

          <Button title="Sign Up" onPress={handleSignUp} />
        </View>
      </ScrollView>

      {/* Toast Message */}
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
    padding: 16,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 16,
    marginTop: 50,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  input1: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  signuptxt: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default SignUp;
