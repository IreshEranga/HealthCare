import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ErrorAnimation from '../../assets/videos/error.gif';
import { LinearGradient } from 'expo-linear-gradient';
import NavBar from '../../components/NavBar';

export default function GoalDetail() {
  const route = useRoute();
  const { activity } = route.params || {}; // Destructure the activity from the route parameters

  if (!activity) {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={ErrorAnimation} style={styles.errorGif} />
        <Text style={styles.errorText}>No goal data available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#E0BBE4', '#aec2b6', '#60768d']}
        style={styles.background}
      >
        <Text style={styles.day}>Day {activity.day}</Text>

        {/* Add more details if needed */}
        <View style={styles.imageContainer}>
          {activity.image ? (
            <Image
              source={{ uri: activity.image }}
              style={styles.activityImage}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.noImageText}>No image available</Text>
          )}
        </View>

        <Text style={styles.instructionTopic}>Instructions : </Text>
        <View style={styles.insView}>
            <Text style={styles.instruction}> 👉 {activity.instruction}</Text>
            <Text style={styles.status}>Status: {activity.status}</Text>
        </View>
      </LinearGradient>
      <NavBar />
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
  day: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  instruction: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'left',
  },
  status: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'left',
  },
  imageContainer: {
    paddingHorizontal: 20, // Padding left and right
    marginBottom: 20,
  },
  activityImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  noImageText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  errorGif: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#ff4c4c',
  },
  instructionTopic : {
    marginLeft:20,
    fontSize:16,
  },
  insView:{
    padding:20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    marginTop:20,
    marginLeft:30,
    marginRight:30,
    borderRadius:10,
  }
});
