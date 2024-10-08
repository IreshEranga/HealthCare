import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity, // Use TouchableOpacity for custom button styling
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import FitNavBar from "./FitNavBar";

const RestScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { completedWorkouts, totalCalories, totalMinutes, totalWorkouts } =
    route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Workout Summary</Text>

        <View style={styles.summaryContainer}>
          <Text style={styles.statLabel}>Total Workouts:</Text>
          <Text style={styles.statValue}>{totalWorkouts || 0}</Text>

          <Text style={styles.statLabel}>Total Calories:</Text>
          <Text style={styles.statValue}>{totalCalories || 0} KCAL</Text>

          <Text style={styles.statLabel}>Total Minutes:</Text>
          <Text style={styles.statValue}>{totalMinutes || 0} MINS</Text>
        </View>

        <View style={styles.completedWorkoutsContainer}>
          <Text style={styles.completedHeader}>Completed Workouts:</Text>
          {completedWorkouts && completedWorkouts.length > 0 ? (
            completedWorkouts.map((workout, index) => (
              <Text key={index} style={styles.completedWorkout}>
                - {workout}
              </Text>
            ))
          ) : (
            <Text style={styles.noWorkouts}>No workouts completed.</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            // Navigate back to FitnessHome or any other desired screen
            navigation.navigate("Fitness/FitnessHome");
          }}
        >
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* Fixed Navigation Bar */}
      <View style={styles.navbarContainer}>
        <FitNavBar />
      </View>
    </SafeAreaView>
  );
};

export default RestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA", // Light purple background
  },
  scrollContainer: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4B0082", // Indigo color for header
  },
  summaryContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  statLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333", // Dark gray for labels
  },
  statValue: {
    fontSize: 18,
    marginBottom: 10,
    color: "#555", // Slightly lighter gray for values
  },
  completedWorkoutsContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  completedHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4B0082", // Indigo color for completed workouts header
  },
  completedWorkout: {
    fontSize: 18,
    color: "#333", // Dark gray for completed workouts
    marginVertical: 5,
  },
  noWorkouts: {
    fontSize: 16,
    color: "gray",
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#4B0082", // Indigo button background
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff", // White text for button
    fontSize: 18,
    fontWeight: "bold",
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
