import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';


const NavBar = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home/Welcome')}>
        <Icon name="home-outline" size={24} color="white" />
        <Text style={styles.navText}>{/*Home*/}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('PersonalizeMentalGoals/Suggestions')}>
        <Icon name="fitness-outline" size={24} color="white" />
        <Text style={styles.navText}>{/**Mental Fitness */}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Journey/JourneyPage')}>
        <Icon name="book-outline" size={24} color="white" />
        <Text style={styles.navText}>{/**Journey */}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Icon name="walk" size={24} color="white" onPress={() => navigation.navigate('Fitness/FitnessPlan')}/>
        <Text style={styles.navText}>{/**Meals */}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Icon name="fast-food" size={24} color="white" onPress={() => navigation.navigate('Nutritions/nutritionHome')}/>
        <Text style={styles.navText}>{/**Physical fitness */}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0e1138',
    paddingVertical: 5,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    elevation: 5,
    borderTopWidth: 2, // Border width for the top of the NavBar
    borderTopColor: '#8090d2',
  },
  navButton: {
    alignItems: 'center',
    marginTop:2,
    top:10,
  },
  navText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});

export default NavBar;
