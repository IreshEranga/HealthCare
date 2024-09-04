import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/index'; 
import LogIn from './app/LogIn'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ title: 'Home' }} // Optionally, you can set the screen title here
        />
        <Stack.Screen 
          name="LogIn" 
          component={LogIn} 
          options={{ title: 'LogIn' }} // Optionally, set the screen title here
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
