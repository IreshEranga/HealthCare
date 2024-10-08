import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const FitNavBar = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.navBar}>
      {/* Fitness Home */}
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Fitness/FitnessPlan')}>
        <Icon name="home-outline" size={24} color="white" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      {/* Personalized Workout */}
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Fitness/FitnessHome')}>
        <Icon name="barbell-outline" size={24} color="white" />
        <Text style={styles.navText}>Workout</Text>
      </TouchableOpacity>

      {/* Schedule */}
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Fitness/WorkoutLog')}>
        <Icon name="calendar-outline" size={24} color="white" />
        <Text style={styles.navText}>Schedule</Text>
      </TouchableOpacity>

      {/* Reminder */}
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Fitness/Reminder')}>
        <Icon name="notifications-outline" size={24} color="white" />
        <Text style={styles.navText}>Reminder</Text>
      </TouchableOpacity>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0e1138',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    elevation: 5,
    borderTopWidth: 2,
    borderTopColor: '#8090d2',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});

export default FitNavBar;
