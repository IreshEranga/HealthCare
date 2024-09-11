import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Or another icon set

const NavBar = () => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.navButton}>
        <Icon name="home-outline" size={24} color="white" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Icon name="search-outline" size={24} color="white" />
        <Text style={styles.navText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Icon name="notifications-outline" size={24} color="white" />
        <Text style={styles.navText}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Icon name="person-outline" size={24} color="white" />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Icon name="settings-outline" size={24} color="white" />
        <Text style={styles.navText}>Settings</Text>
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
    elevation: 5, // For Android shadow effect
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

export default NavBar;
