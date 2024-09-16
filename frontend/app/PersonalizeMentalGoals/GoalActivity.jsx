import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function GoalActivity() {
  const route = useRoute();
  const { existingGoal } = route.params; // Get the goal data from route params

  // Render the goal details based on existingGoal data
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.goalDetails}>
          <Text style={styles.goalName}>{existingGoal.name}</Text>
          <Text style={styles.goalType}>Type: {existingGoal.type}</Text>
          <Text style={styles.goalStatus}>Status: {existingGoal.goalStatus}</Text>
          {existingGoal.activities.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <Text style={styles.activityDay}>Day {activity.day}</Text>
              <Text style={styles.activityInstruction}>{activity.instruction}</Text>
              {activity.image ? (
                <Image 
                  source={{ uri: activity.image }} 
                  style={styles.activityImage} 
                  resizeMode='cover' // Adjust this as needed
                />
              ) : (
                <Text style={styles.noImageText}>No image available</Text>
              )}
              <Text style={styles.activityStatus}>Status: {activity.status}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
  },
  goalDetails: {
    marginBottom: 20,
  },
  goalName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  goalType: {
    fontSize: 18,
    marginVertical: 10,
  },
  goalStatus: {
    fontSize: 16,
    marginBottom: 10,
  },
  activityItem: {
    marginBottom: 20,
  },
  activityDay: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityInstruction: {
    fontSize: 14,
    marginBottom: 10,
  },
  activityImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10, // Optional: adds rounded corners
  },
  noImageText: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
  },
  activityStatus: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});
