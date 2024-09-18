import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import ErrorAnimation from '../../assets/videos/error.gif';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavBar from '../../components/NavBar';

export default function GoalDetail() {
  const route = useRoute();
  const navigation = useNavigation(); 
  const { activity } = route.params || {}; 

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
        {/* Back Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#2E4057" />
          </TouchableOpacity>
          <Text style={styles.day}>Day {activity.day}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollView}>
        
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

        <Text style={styles.instructionTopic}>Instructions :</Text>
        <View style={styles.insView}>
          <Text style={styles.instruction}>👉 {activity.instruction}</Text>
          <Text style={styles.status}>Status: {activity.status}</Text>
        </View>

        
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
        </ScrollView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 10,
  },
  day: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
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
  instructionTopic: {
    marginLeft: 20,
    fontSize: 16,
  },
  insView: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
  },
  doneButton: {
    marginTop: 30,
    backgroundColor: '#2E4057',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 30,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
