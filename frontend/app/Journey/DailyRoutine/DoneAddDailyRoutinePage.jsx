import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../../../components/NavBar';
//import LinearGradient from 'react-native-linear-gradient';


const DoneAddDailyRoutinePage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Set a timeout to navigate after 5 seconds
    const timeout = setTimeout(() => {
      navigation.navigate('Journey/DailyRoutine/DailyRoutinePage'); 
      console.log("Naviagtion success")
    }, 3000);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Apply gradient to the container */}
      {/*<LinearGradient 
        colors={['#f0f0f5', '#d0e8f2']} 
        style={styles.container}
      >*/}
        <View style={styles.container1}>
          <Text style={styles.successText}>Routine Added Successfully!</Text>
          <Image
            source={require('../../../assets/images/success.png')}
            style={styles.successImage}
          />
          <Text style={styles.messageText}>
            Your daily routine has been added successfully..
          </Text>

          {/*<Button title="✔ Done" onPress={() => navigation.navigate('Journey/DailyRoutine/DailyRoutinePage')} />*/}
        </View>
        <NavBar />
      {/*</LinearGradient>*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 20,
  },
  successImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  messageText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default DoneAddDailyRoutinePage;