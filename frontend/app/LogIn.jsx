import { Text, StyleSheet, View, Image, TouchableOpacity, Button } from 'react-native';
import React, { Component } from 'react';
import medication from '../assets/images/medi.png';
import { useNavigation } from '@react-navigation/native'; 


export default function LogIn() {
  const navigation = useNavigation();

  handleLogin = () => {
    navigation.navigate('LogInPage');
  };

  handleSignUp = () => {  
    navigation.navigate('SignUp');    
  };
 
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 100,
    marginLeft:40
  },
  name: {
    textAlign: 'center',
    paddingTop: 40,
    fontSize: 30,
  },
  button: {
    backgroundColor: '#7B9F31', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 100,
    width:150,
    marginLeft:120,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 20,
    textAlign: 'center',
    fontStyle:'bold',
    fontWeight:'bold'
  },
  signup: {
    textAlign: 'center',
    marginTop: 30,
  },
  signupLink: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
