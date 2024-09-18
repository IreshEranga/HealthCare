import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ErrorAnimation from '../../assets/videos/error.gif';
import { LinearGradient } from 'expo-linear-gradient';


export default function GoalDetail() {
  const route = useRoute();
  const { activity } = route.params || {}; // Destructure the activity from the route parameters

  console.log(activity);
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
      {activity.image ? (
                  <Image 
                    source={{ uri: activity.image }} 
                    style={styles.activityImage} 
                    resizeMode='cover'
                  />
                ) : (
                  <Text style={styles.noImageText}>No image available</Text>
        )}

<Text style={styles.instruction}>Instruction: {activity.instruction}</Text>
<Text style={styles.status}>Status: {activity.status}</Text>

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
  day: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center',
    marginTop:20,
    marginBottom:50,
  },
  instruction: {
    fontSize: 18,
    marginVertical: 10,
  },
  status: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  activityImage: {
    width: '100%',
    height:300,
    marginBottom: 10,
    borderRadius: 10,
  },
});
