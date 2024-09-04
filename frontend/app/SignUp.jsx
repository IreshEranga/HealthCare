import React, { useState } from 'react';
import { View, FlatList, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Ensure this is imported correctly

const SignUp = () => {
  // Sample data for Picker
  const data = [
    { key: '1', value: 'Male' },
    { key: '2', value: 'Female' },
    { key: '3', value: 'Other' },
    // Add more options as needed
  ];

  const [selectedValue, setSelectedValue] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.signuptxt}>SignUp</Text>

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
        style={styles.input}
        placeholder="Re-type Password"
        secureTextEntry
      />

     

      {/* Submit Button */}
      <Button title="Sign Up" style={styles.button} onPress={() => { /* Handle Sign Up */ }}  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius:10,
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
    marginTop: 20,
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 80,
  },
  button:{
    borderRadius:20
  },
});

export default SignUp;
