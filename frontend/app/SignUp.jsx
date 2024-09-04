import { Text, StyleSheet, View, TextInput, Button, ScrollView } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    mobile: '',
    profession: '',
    gender: '',
    password: '',
    retypePassword: '',
  });

  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.signuptxt}>Sign Up</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(value) => handleChange('email', value)}
        value={formData.email}
      />
      
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={(value) => handleChange('firstName', value)}
        value={formData.firstName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(value) => handleChange('lastName', value)}
        value={formData.lastName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Mobile"
        onChangeText={(value) => handleChange('mobile', value)}
        value={formData.mobile}
        keyboardType="phone-pad"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Profession"
        onChangeText={(value) => handleChange('profession', value)}
        value={formData.profession}
      />
      
      <DropDownPicker
        open={genderOpen}
        value={genderValue}
        items={genderItems}
        setOpen={setGenderOpen}
        setValue={(value) => {
          setGenderValue(value);
          handleChange('gender', value);
        }}
        setItems={setGenderItems}
        placeholder="Select Gender"
        style={styles.input}
        dropDownContainerStyle={styles.dropdown}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(value) => handleChange('password', value)}
        value={formData.password}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Re-type Password"
        secureTextEntry={true}
        onChangeText={(value) => handleChange('retypePassword', value)}
        value={formData.retypePassword}
      />
      
      <Button title="Sign Up" onPress={handleSubmit} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  signuptxt: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    borderRadius: 5,
  },
  dropdown: {
    borderColor: '#ccc',
  },
});
