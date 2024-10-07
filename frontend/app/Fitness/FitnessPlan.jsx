import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import FitNavBar from './FitNavBar';

const FitnessPlan = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to Fitness! 💪</Text>
      </View>

      {/* Today Workout Text with Check Button */}
      <View style={styles.todayWorkoutContainer}>
        <Text style={styles.todayWorkoutText}>Today Workout</Text>
        <TouchableOpacity
          style={styles.checkButton}
          onPress={() => navigation.navigate('Fitness/Reminder')}
        >
          <Text style={styles.checkButtonText}>Check</Text>
        </TouchableOpacity>
      </View>

      {/* Home Workout Image Button with Text and Arrow */}
      <TouchableOpacity
        style={styles.imageButton}
        onPress={() => navigation.navigate('Fitness/FitnessHome')}
      >
        <Image
          style={styles.fullImage}
          source={{
            uri: "https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_842,ar_1.2,q_auto:eco,dpr_2,f_auto,fl_progressive/image/test/sku-card-widget/gold2.png",
          }}
        />
        <View style={styles.textOverlay}>
          <Text style={styles.overlayText}>Home Workout</Text>
          <MaterialIcons name="arrow-forward" size={24} color="white" />
        </View>
      </TouchableOpacity>

      {/* Small gap between Home Workout and Personalized Workout */}
      <View style={styles.spacer} />

      {/* Personalized Workout Button */}
      <TouchableOpacity
        style={styles.personalizedWorkoutButton}
        onPress={() => navigation.navigate('Fitness/PersonalizedWorkout')}
      >
        <Image
          style={styles.fullImage}
          source={{
            uri: "https://img.freepik.com/free-vector/training-home-concept_52683-37093.jpg",
          }}
        />
        <View style={styles.textOverlay}>
          <Text style={styles.overlayText}>Personalized Workout</Text>
          <MaterialIcons name="arrow-forward" size={24} color="white" />
        </View>
      </TouchableOpacity>

      {/* Fixed Navigation Bar */}
      <View style={styles.navbarContainer}>
        <FitNavBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA', // Light purple background color
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  todayWorkoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#6e8af0',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  todayWorkoutText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6e8af0',
  },
  checkButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  checkButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  fullImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  spacer: {
    height: 40, // Set this to a value that creates the desired gap
  },
  personalizedWorkoutButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 80,
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default FitnessPlan;
