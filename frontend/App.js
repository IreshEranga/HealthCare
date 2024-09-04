import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/HomeScreen'; // Adjust the path as necessary
import LogIn from './app/LogIn'; // Adjust the path as necessary
import SignUp from './app/SignUp';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: 'SignUp' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
