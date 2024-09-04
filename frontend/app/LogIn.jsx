import { Text, StyleSheet, View, Image, TouchableOpacity, Button } from 'react-native';
import React, { Component } from 'react';
import medication from '../assets/images/medi.png';

export default class LogIn extends Component {
  handleLogin = () => {
    // Handle login logic here
  };

  render() {
    return (
      <View >
        <Image source={medication} style={styles.image} />
        <Text style={styles.name}>Welcome To FitPro</Text>
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.signup}>
          New to FitPro?{'  '}
          <Text style={styles.signupLink} onPress={this.handleSignUp}>
             Sign Up
          </Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 80,
    marginLeft:40
  },
  name: {
    textAlign: 'center',
    paddingTop: 40,
    fontSize: 30,
  },
  button: {
    backgroundColor: '#7B9F31', // Button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 130,
    width:150,
    marginLeft:120,
  },
  buttonText: {
    color: '#fff', // Button text color
    fontSize: 20,
    textAlign: 'center',
    fontStyle:'bold',
  },
  signup: {
    textAlign: 'center',
    marginTop: 30, // Adjusted for better spacing
  },
  signupLink: {
    color: '#007BFF', // Color for the sign-up link
    fontSize: 16,
    fontWeight: 'bold',
  },
});
