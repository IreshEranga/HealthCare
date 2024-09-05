import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/HomeScreen'; // Adjust the path as necessary
import LogIn from './app/LogIn'; // Adjust the path as necessary
import SignUp from './app/SignUp';
import LogInPage from './app/LogInPage';
import HomePage from './app/Home/HomePage';
import Welcome from './app/Home/Welcome';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: 'HomeScreen' }}
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
        <Stack.Screen
          name="LogInPage"
          component={LogInPage}
          options={{ title: 'LogInPage' }}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ title: 'HomePage' }}
        />
         <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ title: 'Welcome' }}
        />
      </Stack.Navigator>
      <Stack.Navigator>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
