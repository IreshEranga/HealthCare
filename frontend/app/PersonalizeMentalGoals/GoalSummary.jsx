import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import man from '../../assets/images/man2.png';
import NavBar from '../../components/NavBar';

export default function GoalSummary() {
  const route = useRoute();
  const { goal } = route.params; // Get the selected goal from route params

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#E0BBE4', '#aec2b6', '#60768d']}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View>
            <Text style={styles.topic}>{goal.name}</Text>
          </View>

          <View>
            <Icon style={styles.usericon} name="user" size={34} color="#2E4057" />
          </View>

          <Text style={styles.sumtopic}>Summary:</Text>

          {/* Summary and image overlay */}
          <View style={styles.overlayContainer}>
            <Image source={man} style={styles.manImage} width={200} height={400} />
            <View style={styles.summaryWrapper}>
              <Text style={styles.summary}>{goal.summary}</Text>
            </View>
          </View>

          {/* Uncomment the section below if you want to display activities */}
          {/* 
          <Text style={styles.sectionTitle}>Activities:</Text>
          {goal.activities.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <Text style={styles.activityDay}>Day {activity.day}</Text>
              <Text style={styles.activityInstruction}>{activity.instruction}</Text>

              {activity.image && typeof activity.image === 'string' ? (
                <Image source={{ uri: activity.image }} style={styles.activityImage} />
              ) : (
                <Image source={activity.image} style={styles.activityImage} />
              )}

              <Text style={styles.activityStatus}>Status: {activity.status}</Text>
            </View>
          ))} 
          */}
        </ScrollView>
        <NavBar style={styles.navigation} />
      </LinearGradient>
    </SafeAreaView>
  );
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
    marginTop: 30,
    textAlign: 'center',
  },
  sumtopic: {
    marginLeft: 30,
    marginTop: 30,
    fontSize: 18,
  },
   overlayContainer: {
     position: 'relative',
     marginTop: 30,
     marginHorizontal: 50,
     marginBottom: 30,
   },
  summaryWrapper: {
    position: 'absolute',
    top: -150,
    left: -30,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summary: {
    fontSize: 16,
    color: '#333',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
    borderRadius: 20,
    padding: 20,
    textAlign: 'center',
    zIndex: 1, // Ensure the summary text is on top
  },
  manImage: {
    width: '100%',
    height: 605,
    // resizeMode: 'cover',
    opacity:1,
    zIndex:1,
    marginLeft:100 // Full opacity for the image
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
  },
  activityStatus: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});
