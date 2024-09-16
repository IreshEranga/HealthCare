import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/HomeScreen'; 
import LogIn from './app/LogIn'; 
import SignUp from './app/SignUp';
import LogInPage from './app/LogInPage';
import HomePage from './app/Home/HomePage';
import Welcome from './app/Home/Welcome';
import ProfilePage from './app/ProfilePage';
import JourneyPage from './app/Journey/JourneyPage';
import DailyRoutinePage from './app/Journey/DailyRoutine/DailyRoutinePage';
import AddDailyRoutinePage from './app/Journey/DailyRoutine/AddDailyRoutinePage';
import DoneAddDailyRoutinePage from './app/Journey/DailyRoutine/DoneAddDailyRoutinePage';
import JournalingPage from './app/Journey/Journaling/JournalingPage';
import AddJournalPage from './app/Journey/Journaling/AddJournalPage';
import DoneAddJournalPage from './app/Journey/Journaling/DoneAddJournalPage';
import MoodTrackingPage from './app/Journey/MoodCheckIn/MoodTrackingPage';
import AddMoodCheckInPage from './app/Journey/MoodCheckIn/AddMoodCheckInPage';
import DoneAddMoodCheckInPage from './app/Journey/MoodCheckIn/DoneAddMoodCheckInPage';




import Quiz from './app/PersonalizeMentalGoals/Quiz';
import Loading from './app/PersonalizeMentalGoals/Loading';
import Suggestions from './app/PersonalizeMentalGoals/Suggestions';
import GoalSummary from './app/PersonalizeMentalGoals/GoalSummary';
import GoalActivity from './app/PersonalizeMentalGoals/GoalActivity';

















import NutritionHome from './app/Nutritions/nutritionHome';


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
          name="ProfilePage"
          component={ProfilePage}
          options={{ title: 'ProfilePage' }}
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
          name="AddDailyRoutinePage"
          component={AddDailyRoutinePage}
          options={{ title: 'AddDailyRoutinePage' }}
        />
        <Stack.Screen
          name="DoneAddDailyRoutinePage"
          component={DoneAddDailyRoutinePage}
          options={{ title: 'DoneAddDailyRoutinePage' }}
        />
        <Stack.Screen
          name="JournalingPage"
          component={JournalingPage}
          options={{ title: 'JournalingPage' }}
        />
        <Stack.Screen
          name="AddJournalPage"
          component={AddJournalPage}
          options={{ title: 'AddJournalPage' }}
        />
        <Stack.Screen
          name="DoneAddJournalPage"
          component={DoneAddJournalPage}
          options={{ title: 'DoneAddJournalPage' }}
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
        <Stack.Screen
          name="DoneAddMoodCheckInPage"
          component={DoneAddMoodCheckInPage}
          options={{ title: 'DoneAddMoodCheckInPage' }}
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
        <Stack.Screen  name="NutritionHome"
          component={NutritionHome}
          options={{ title: 'NutritionHome' }}
          />
        <Stack.Screen  name="GoalSummary"
          component={GoalSummary}
          options={{ title: 'GoalSummary' }}
        />
        <Stack.Screen  name="GoalActivity"
          component={GoalActivity}
          options={{ title: 'GoalActivity' }}
        />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}
