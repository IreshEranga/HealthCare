import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Ensure this is imported correctly
import bg2 from '../assets/images/bg2.jpg'
const SignUp = () => {
  
  const data = [
    { key: '1', value: 'Male' },
    { key: '2', value: 'Female' },
    { key: '3', value: 'Other' },
    
  ];

  const [selectedValue, setSelectedValue] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image */}
      <Image
        source={bg2} 
        style={styles.backgroundImage}
      />

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.formContainer}>
          <Text style={styles.signuptxt}>Sign Up</Text>

          {/* Form Fields */}
          <TextInput
            style={styles.input}
            placeholder="First Name"
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile"
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Profession"
          />
          {/* Gender Picker */}
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
          />
          <TextInput
            style={styles.input1}
            placeholder="Re-type Password"
            secureTextEntry
          />

          {/* Submit Button */}
          <Button title="Sign Up" onPress={() => { /* Handle Sign Up */ }}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
container: {
    backgroundColor: '#fff',
    marginBottom:100,
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white background
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
});

export default SignUp;
