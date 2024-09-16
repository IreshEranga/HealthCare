import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import man from '../../assets/images/man2.png';
import NavBar from '../../components/NavBar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function GoalActivity() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#E0BBE4', '#aec2b6', '#60768d']}
        style={styles.background}
      >

      <ScrollView contentContainerStyle={styles.scrollView}>

          <View>
            <Text style={styles.topic}>Goal Activity</Text>
          </View>

          <View>
            <Icon style={styles.usericon} name="user" size={34} color="#2E4057" />
          </View>

          <TouchableOpacity /*onPress={handleBackPress}*/>
            <Icon name="arrow-left" size={30} color="#2E4057" marginLeft={20} marginTop={-40} />
          </TouchableOpacity> 

      </ScrollView>

      </LinearGradient>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e1138',
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  scrollView: {
    flexGrow: 1,
  },
  usericon: {
    marginLeft: 340,
    marginTop: -30,
  },
  topic: {
    color: '#2E4057',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 40,
    textAlign: 'center',
  },
})