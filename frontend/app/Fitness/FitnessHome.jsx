import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import FitnessCards from "../../components/FitnessCards";
import { useRoute, useNavigation } from "@react-navigation/native"; // Import useNavigation

// Import Ionicons for the back arrow icon
import Icon from 'react-native-vector-icons/Ionicons';

const FitnessHome = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Initialize navigation

  const { completedWorkouts, totalCalories, totalMinutes, totalWorkouts } = route.params || {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.headerContainer}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Fitness/FitnessPlan')}>
            <Icon name="arrow-back-outline" size={24} color="white" />
          </TouchableOpacity>

          <Text style={styles.headerText}>WORKOUT</Text>

          <View style={styles.imageContainer}>
            <Image
              style={styles.headerImage}
              source={{
                uri: "https://media.istockphoto.com/id/1438034462/photo/latino-and-african-sport-woman-exercising-and-build-muscle-in-stadium-active-strong-beautiful.jpg?s=612x612&w=0&k=20&c=kFwCRkh8Q1v6uCoSTL7sQcsbk02zgSZJ1kDgnJ3DAZc=",
              }}
            />
          </View>
        </View>

        {/* Fitness Cards Component */}
        <FitnessCards />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FitnessHome;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#CD853F",
    padding: 10,
    width: "100%",
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 10,
    zIndex: 1, // Ensure it's on top of other elements
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24, // Increased font size
    marginBottom: 10,
    textAlign: "center", // Center align the header text
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },
  statLabel: {
    color: "#D0D0D0",
    fontSize: 17,
    marginTop: 6,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  headerImage: {
    width: "95%", // Increased width for larger display
    height: 160,  // Increased height for larger display
    borderRadius: 7,
  },
});
