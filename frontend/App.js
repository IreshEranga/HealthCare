import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/HomeScreen'; 
import LogIn from './app/LogIn'; 
import SignUp from './app/SignUp';
import LogInPage from './app/LogInPage';
import HomePage from './app/Home/HomePage';
import Welcome from './app/Home/Welcome';
import JourneyPage from './app/Journey/JourneyPage';
import DailyRoutinePage from './app/Journey/DailyRoutine/DailyRoutinePage';
import JournalingPage from './app/Journey/Journaling/JournalingPage';
import MoodTrackingPage from './app/Journey/MoodCheckIn/MoodTrackingPage';
import AddMoodCheckInPage from './app/Journey/MoodCheckIn/AddMoodCheckInPage';






import Quiz from './app/PersonalizeMentalGoals/Quiz';
import Loading from './app/PersonalizeMentalGoals/Loading';
import Suggestions from './app/PersonalizeMentalGoals/Suggestions';


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
        <Stack.Screen
          name="JourneyPage"
          component={JourneyPage}
          options={{ title: 'JourneyPage' }}
        />
        <Stack.Screen
          name="DailyRoutinePage"
          component={DailyRoutinePage}
          options={{ title: 'DailyRoutinePage' }}
        />
        <Stack.Screen
          name="JournalingPage"
          component={JournalingPage}
          options={{ title: 'JournalingPage' }}
        />
        <Stack.Screen
          name="MoodTrackingPage"
          component={MoodTrackingPage}
          options={{ title: 'MoodTrackingPage' }}
        />
        <Stack.Screen
          name="AddMoodCheckInPage"
          component={AddMoodCheckInPage}
          options={{ title: 'AddMoodCheckInPage' }}
        />
        <Stack.Screen  name="Quiz"
          component={Quiz}
          options={{ title: 'Quiz' }}
        />
        <Stack.Screen  name="Loading"
          component={Loading}
          options={{ title: 'Loading' }}
        />
        <Stack.Screen  name="Suggestions"
          component={Suggestions}
          options={{ title: 'Suggestions' }}
        />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}
