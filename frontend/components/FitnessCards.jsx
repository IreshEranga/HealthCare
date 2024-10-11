import { StyleSheet, Text, View, Pressable, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import fitness from "../data/fitness"; // Ensure this is your fitness data
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Premium from '../assets/images/prem.png'; // Importing the Premium image
import AsyncStorage from '@react-native-async-storage/async-storage';

const FitnessCards = () => {
  const FitnessData = fitness; // Fetch fitness data
  const navigation = useNavigation();
  
  const [isPremium, setIsPremium] = useState(false); // State to hold premium status
  const [userType, setUserType] = useState(''); // State to hold user type

  // Fetch premium status and user type from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('loggedInUser');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser && parsedUser.type) {
          setUserType(parsedUser.type);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    const fetchPremiumStatus = async () => {
      try {
        const premiumStatus = await AsyncStorage.getItem('isPremium');
        console.log("Premium Status Retrieved: ", premiumStatus); // Log the retrieved value
        setIsPremium(premiumStatus === 'true'); // Set premium status based on retrieved value
      } catch (error) {
        console.error("Error fetching premium status: ", error);
      }
    };

    fetchUserData();
    fetchPremiumStatus();
  }, []);

  const handlePress = (item) => {
    // Check if the user is trying to access the full-body workout
    if (item.name === "FULL BODY" && userType !== 'premium') {
      Alert.alert("Premium Required", "Upgrade to access the full-body workout.");
    } else {
      navigation.navigate("Fitness/WorkoutScreen", {
        image: item.image,
        excersises: item.excersises, // Make sure this matches your fitness data structure
        id: item.id,
      });
    }
  };

  return (
    <View style={styles.container}>
      {FitnessData.map((item, key) => (
        <Pressable
          onPress={() => handlePress(item)}
          style={styles.card}
          key={key}
        >
          <Image
            style={styles.image}
            source={{ uri: item.image }}
          />
          <Text style={styles.cardTitle}>
            {item.name}
          </Text>
          <MaterialCommunityIcons
            style={styles.icon}
            name="lightning-bolt"
            size={24}
            color="white"
          />
          {isPremium && ( // Display the Premium image if the user is a premium member
            <Image source={Premium} style={styles.premiumIcon} />
          )}
          {/* Display the Premium image on the FULL BODY card */}
          {item.name === "FULL BODY" && !isPremium && (
            <Image source={Premium} style={styles.premiumIcon} />
          )}
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 7,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 7,
  },
  cardTitle: {
    position: "absolute",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    left: 20,
    top: 20,
  },
  icon: {
    position: "absolute",
    color: "white",
    bottom: 15,
    left: 20,
  },
  premiumIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 50,
    height: 50,
  },
});

export default FitnessCards;
