import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

const AnimatedCounter = ({ value }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 1000, // Duration in milliseconds
      useNativeDriver: false, // Set to false as we are animating non-transform styles
    }).start();
  }, [value, animatedValue]);

  // Interpolate the animated value to get the displayed value
  const displayValue = animatedValue.interpolate({
    inputRange: [0, value],
    outputRange: [0, value],
  });

  return (
    <Animated.Text style={styles.counterText}>
      {displayValue}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  counterText: {
    fontSize: 32,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default AnimatedCounter;
