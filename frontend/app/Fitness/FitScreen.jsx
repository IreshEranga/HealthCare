import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const FitScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  
  const [completed, setCompleted] = useState([]);
  const [minutes, setMinutes] = useState(0);
  const [calories, setCalories] = useState(0);
  const [workoutCount, setWorkoutCount] = useState(0);
  
  const exercises = route.params.excersises;

  // Check if current exercise is defined
  const current = exercises[index];

  const handleDone = () => {
    if (current) {
      // Update completed workouts and stats
      const updatedCalories = calories + 6.3;
      const updatedMinutes = minutes + 2.5;
      const updatedWorkoutCount = workoutCount + 1;

      setCompleted((prev) => [...prev, current.name]);
      setWorkoutCount(updatedWorkoutCount);
      setMinutes(updatedMinutes);
      setCalories(updatedCalories);

      // Check if it's the last exercise
      if (index + 1 >= exercises.length) {
        // Navigate to Fitness/RestScreen with calculated stats
        navigation.navigate("Fitness/RestScreen", {
          completedWorkouts: [...completed, current.name],
          totalCalories: updatedCalories,
          totalMinutes: updatedMinutes,
          totalWorkouts: updatedWorkoutCount,
        });
      } else {
        // Move to the next exercise immediately
        setIndex(index + 1);
      }
    }
  };

  return (
    <SafeAreaView>
      {/* Check if current is defined before rendering */}
      {current ? (
        <>
          <Image
            style={{ width: "100%", height: 370 }}
            source={{ uri: current.image }}
          />
          <Text style={styles.exerciseName}>{current.name}</Text>
          <Text style={styles.setsText}>x{current.sets}</Text>
        </>
      ) : (
        <Text style={styles.exerciseName}>No more exercises</Text>
      )}

      <Pressable
        onPress={handleDone}
        style={styles.doneButton}
        disabled={!current} // Disable if current is undefined
      >
        <Text style={styles.buttonText}>DONE</Text>
      </Pressable>

      <Pressable style={styles.navigationContainer}>
        <Pressable
          disabled={index === 0}
          onPress={() => {
            setIndex(index - 1);
          }}
          style={styles.prevButton}
        >
          <Text style={styles.buttonText}>PREV</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            if (index + 1 < exercises.length) {
              setIndex(index + 1);
            }
          }}
          style={styles.skipButton}
        >
          <Text style={styles.buttonText}>SKIP</Text>
        </Pressable>
      </Pressable>
    </SafeAreaView>
  );
};

export default FitScreen;

const styles = StyleSheet.create({
  exerciseName: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
  setsText: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    fontSize: 38,
    fontWeight: "bold",
  },
  doneButton: {
    backgroundColor: "blue",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    borderRadius: 20,
    padding: 10,
    width: 150,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  navigationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
  },
  prevButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 20,
    width: 100,
  },
  skipButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 20,
    width: 100,
  },
});
