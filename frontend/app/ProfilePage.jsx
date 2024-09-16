import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavBar from './../components/NavBar';
import axios from 'axios';


const ProfilePage = () => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    profession: '',
    gender:'',
  });
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log(apiUrl);

  useEffect(() => {
    // Fetch user data from backend
    axios.get(`${apiUrl}/users/profile`) // Replace with your API URL
      .then((response) => setUserData(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Text style={styles.profileTitle}>Profile</Text>
        <Icon name="edit" size={30} color="black" />
      </View>

      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image
          source={require('../assets/images/ProfileImage.png')} // Add a local image or dynamic source
          style={styles.profileImage}
        />
      </View>

      {/* User Name */}
      <Text style={styles.userName}>
        {userData.first_name} {userData.last_name}
      </Text>

      {/* Profile Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={userData.first_name}
          editable={false}
          placeholder="First Name :"
        />
        <TextInput
          style={styles.input}
          value={userData.last_name}
          editable={false}
          placeholder="Last Name :"
        />
        <TextInput
          style={styles.input}
          value={userData.mobile}
          editable={false}
          placeholder="Phone No :"
        />
        <TextInput
          style={styles.input}
          value={userData.email}
          editable={false}
          placeholder="Email :"
        />
        <TextInput
          style={styles.input}
          value={userData.profession}
          editable={false}
          placeholder="Profession :"
        />
        <TextInput
          style={styles.input}
          value={userData.gender}
          editable={false}
          placeholder="Gender :"
        />
      </View>
      {/* Fixed Navigation Bar */}
      <View style={styles.navbarContainer}>
        <NavBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#000',
  },
  userName: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#ecf0f1',
    marginBottom: 10,
    fontSize: 16,
    color: '#2c3e50',
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ProfilePage;