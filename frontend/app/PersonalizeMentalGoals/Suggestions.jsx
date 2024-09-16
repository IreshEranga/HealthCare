import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../../components/NavBar';



// Sample goal data
/*
const goalData = [
  {
    type: 'Stress Management',
    goals: [
      {
        id: 1,
        name: 'Reduce Work Stress',
        summary:'This goal is focused on helping you manage and reduce work-related stress by incorporating daily activities that promote relaxation and mindfulness. Over three days, you"ll engage in practices such as deep breathing, taking a break to walk, and reflecting on stressors. Each activity is designed to be simple, practical, and easy to integrate into your workday, helping you build habits that contribute to overall stress reduction and mental well-being.',

        activities: [
          {
            day: 1,
            instruction: 'Start your day with 5 minutes of deep breathing exercises.',
            image: require('../../assets/images/breathing.png'),
            status: 'pending',
          },
          {
            day: 2,
            instruction: 'Take a 10-minute walk during your lunch break.',
            image: 'https://example.com/day2_image.jpg',
            status: 'pending',
          },
          {
            day: 3,
            instruction: 'Write down 3 things that stressed you today and how you handled them.',
            image: 'https://example.com/day3_image.jpg',
            status: 'pending',
          },
        ],
      },
      {
        id: 2,
        name: 'Mindful Breathing',
        activities: [
          {
            day: 1,
            instruction: 'Spend 10 minutes focusing on your breath, counting each inhale and exhale.',
            image: 'https://example.com/day1_image_breathing.jpg',
            status: 'pending',
          },
          {
            day: 2,
            instruction: 'Practice box breathing (inhale for 4 seconds, hold for 4, exhale for 4, and hold for 4).',
            image: 'https://example.com/day2_image_breathing.jpg',
            status: 'pending',
          },
          {
            day: 3,
            instruction: 'Do a body scan meditation, focusing on relaxing each part of your body.',
            image: 'https://example.com/day3_image_breathing.jpg',
            status: 'pending',
          },
        ],
      },
    ],
  },
  {
    type: 'Emotional Regulation',
    goals: [
      {
        id: 3,
        name: 'Daily Journaling',
        activities: [
          {
            day: 1,
            instruction: 'Write about your emotions today and what triggered them.',
            image: 'https://example.com/day1_image_journaling.jpg',
            status: 'pending',
          },
          {
            day: 2,
            instruction: 'Reflect on a difficult situation and how you handled it.',
            image: 'https://example.com/day2_image_journaling.jpg',
            status: 'pending',
          },
          {
            day: 3,
            instruction: 'Write down a moment you felt proud of yourself recently.',
            image: 'https://example.com/day3_image_journaling.jpg',
            status: 'pending',
          },
        ],
      },
      {
        id: 4,
        name: 'Gratitude Practice',
        activities: [
          {
            day: 1,
            instruction: 'Write down 3 things you are grateful for today.',
            image: 'https://example.com/day1_image_gratitude.jpg',
            status: 'pending',
          },
          {
            day: 2,
            instruction: 'Send a message to someone you appreciate, expressing gratitude.',
            image: 'https://example.com/day2_image_gratitude.jpg',
            status: 'pending',
          },
          {
            day: 3,
            instruction: 'Reflect on a difficult time and how it made you stronger.',
            image: 'https://example.com/day3_image_gratitude.jpg',
            status: 'pending',
          },
        ],
      },
    ],
  },
];
*/

const goalData = [
  {
    type: 'Stress Management',
    goals: [
      {
        id: 1,
        name: 'Reduce Work Stress',
        summary: 'This goal is focused on helping you manage and reduce work-related stress by incorporating daily activities that promote relaxation and mindfulness. Over 10 days, you\'ll engage in practices such as deep breathing, taking breaks to walk, and reflecting on stressors. Each activity is designed to be simple, practical, and easy to integrate into your workday, helping you build habits that contribute to overall stress reduction and mental well-being.',
        activities: [
          { day: 1, instruction: 'Start your day with 5 minutes of deep breathing exercises.', image: require('../../assets/images/breathing.png'), status: 'pending' },
          { day: 2, instruction: 'Take a 10-minute walk during your lunch break.', image: 'https://example.com/day2_image.jpg', status: 'pending' },
          { day: 3, instruction: 'Write down 3 things that stressed you today and how you handled them.', image: 'https://example.com/day3_image.jpg', status: 'pending' },
          { day: 4, instruction: 'Practice progressive muscle relaxation for 10 minutes.', image: 'https://example.com/day4_image.jpg', status: 'pending' },
          { day: 5, instruction: 'Engage in 15 minutes of mindfulness meditation.', image: 'https://example.com/day5_image.jpg', status: 'pending' },
          { day: 6, instruction: 'Identify and write down one positive thing that happened today.', image: 'https://example.com/day6_image.jpg', status: 'pending' },
          { day: 7, instruction: 'Practice deep breathing exercises during a stressful moment.', image: 'https://example.com/day7_image.jpg', status: 'pending' },
          { day: 8, instruction: 'Take a 15-minute walk outside.', image: 'https://example.com/day8_image.jpg', status: 'pending' },
          { day: 9, instruction: 'Write a reflection on your progress and any changes you noticed.', image: 'https://example.com/day9_image.jpg', status: 'pending' },
          { day: 10, instruction: 'Spend 10 minutes in quiet reflection or meditation.', image: 'https://example.com/day10_image.jpg', status: 'pending' },
        ],
      },
      {
        id: 2,
        name: 'Mindful Breathing',
        summary: 'This goal is designed to enhance your mindfulness and focus through various breathing techniques. Over 10 days, you\'ll practice different methods of breathing and relaxation to help reduce stress and increase overall well-being.',
        activities: [
          { day: 1, instruction: 'Spend 10 minutes focusing on your breath, counting each inhale and exhale.', image: 'https://example.com/day1_image_breathing.jpg', status: 'pending' },
          { day: 2, instruction: 'Practice box breathing (inhale for 4 seconds, hold for 4, exhale for 4, and hold for 4).', image: 'https://example.com/day2_image_breathing.jpg', status: 'pending' },
          { day: 3, instruction: 'Do a body scan meditation, focusing on relaxing each part of your body.', image: 'https://example.com/day3_image_breathing.jpg', status: 'pending' },
          { day: 4, instruction: 'Try 5 minutes of alternate nostril breathing.', image: 'https://example.com/day4_image_breathing.jpg', status: 'pending' },
          { day: 5, instruction: 'Practice diaphragmatic breathing for 10 minutes.', image: 'https://example.com/day5_image_breathing.jpg', status: 'pending' },
          { day: 6, instruction: 'Engage in 5 minutes of slow, deep breathing.', image: 'https://example.com/day6_image_breathing.jpg', status: 'pending' },
          { day: 7, instruction: 'Incorporate a breathing technique while doing a daily activity.', image: 'https://example.com/day7_image_breathing.jpg', status: 'pending' },
          { day: 8, instruction: 'Spend 10 minutes on mindful breathing with guided meditation.', image: 'https://example.com/day8_image_breathing.jpg', status: 'pending' },
          { day: 9, instruction: 'Practice breathing exercises before bedtime.', image: 'https://example.com/day9_image_breathing.jpg', status: 'pending' },
          { day: 10, instruction: 'Reflect on how mindful breathing has affected your stress levels.', image: 'https://example.com/day10_image_breathing.jpg', status: 'pending' },
        ],
      },
    ],
  },
  {
    type: 'Emotional Regulation',
    goals: [
      {
        id: 3,
        name: 'Daily Journaling',
        summary: 'This goal encourages you to explore and express your emotions through daily journaling. Over 10 days, you\'ll reflect on various aspects of your emotional experiences and reactions, which can help improve emotional awareness and resilience.',
        activities: [
          { day: 1, instruction: 'Write about your emotions today and what triggered them.', image: 'https://example.com/day1_image_journaling.jpg', status: 'pending' },
          { day: 2, instruction: 'Reflect on a difficult situation and how you handled it.', image: 'https://example.com/day2_image_journaling.jpg', status: 'pending' },
          { day: 3, instruction: 'Write down a moment you felt proud of yourself recently.', image: 'https://example.com/day3_image_journaling.jpg', status: 'pending' },
          { day: 4, instruction: 'Describe a positive interaction you had today and how it made you feel.', image: 'https://example.com/day4_image_journaling.jpg', status: 'pending' },
          { day: 5, instruction: 'Write about a challenge you faced and how you overcame it.', image: 'https://example.com/day5_image_journaling.jpg', status: 'pending' },
          { day: 6, instruction: 'Jot down three things you appreciate about yourself.', image: 'https://example.com/day6_image_journaling.jpg', status: 'pending' },
          { day: 7, instruction: 'Reflect on a moment when you felt anxious and how you managed it.', image: 'https://example.com/day7_image_journaling.jpg', status: 'pending' },
          { day: 8, instruction: 'Write about an interaction that made you happy and why.', image: 'https://example.com/day8_image_journaling.jpg', status: 'pending' },
          { day: 9, instruction: 'Describe your feelings about a recent accomplishment.', image: 'https://example.com/day9_image_journaling.jpg', status: 'pending' },
          { day: 10, instruction: 'Reflect on your journaling journey and any insights gained.', image: 'https://example.com/day10_image_journaling.jpg', status: 'pending' },
        ],
      },
      {
        id: 4,
        name: 'Gratitude Practice',
        summary: 'This goal focuses on cultivating a sense of gratitude through daily practices. Over 10 days, you\'ll engage in activities designed to help you recognize and appreciate the positive aspects of your life, fostering a greater sense of well-being and positivity.',
        activities: [
          { day: 1, instruction: 'Write down 3 things you are grateful for today.', image: 'https://example.com/day1_image_gratitude.jpg', status: 'pending' },
          { day: 2, instruction: 'Send a message to someone you appreciate, expressing gratitude.', image: 'https://example.com/day2_image_gratitude.jpg', status: 'pending' },
          { day: 3, instruction: 'Reflect on a difficult time and how it made you stronger.', image: 'https://example.com/day3_image_gratitude.jpg', status: 'pending' },
          { day: 4, instruction: 'Write a letter of thanks to someone who has had a positive impact on you.', image: 'https://example.com/day4_image_gratitude.jpg', status: 'pending' },
          { day: 5, instruction: 'Create a list of things you are grateful for about yourself.', image: 'https://example.com/day5_image_gratitude.jpg', status: 'pending' },
          { day: 6, instruction: 'Share a moment of gratitude with a friend or family member.', image: 'https://example.com/day6_image_gratitude.jpg', status: 'pending' },
          { day: 7, instruction: 'Write about a recent positive experience and how it made you feel.', image: 'https://example.com/day7_image_gratitude.jpg', status: 'pending' },
          { day: 8, instruction: 'Reflect on how practicing gratitude has affected your mood.', image: 'https://example.com/day8_image_gratitude.jpg', status: 'pending' },
          { day: 9, instruction: 'Write down something positive that happened today and how it impacted you.', image: 'https://example.com/day9_image_gratitude.jpg', status: 'pending' },
          { day: 10, instruction: 'Create a gratitude jar and add a note of thanks each day.', image: 'https://example.com/day10_image_gratitude.jpg', status: 'pending' },
        ],
      },
    ],
  },
  {
    type: 'Self-Care',
    goals: [
      {
        id: 5,
        name: 'Establish a Healthy Routine',
        summary: 'This goal aims to help you create and maintain a healthy daily routine over 10 days. By incorporating various self-care practices into your daily life, you can improve your overall well-being and create a more balanced lifestyle.',
        activities: [
          { day: 1, instruction: 'Start your day with a nutritious breakfast.', image: 'https://example.com/day1_image_routine.jpg', status: 'pending' },
          { day: 2, instruction: 'Set aside 30 minutes for physical exercise.', image: 'https://example.com/day2_image_routine.jpg', status: 'pending' },
          { day: 3, instruction: 'Drink at least 8 glasses of water throughout the day.', image: 'https://example.com/day3_image_routine.jpg', status: 'pending' },
          { day: 4, instruction: 'Spend 20 minutes doing a relaxing activity such as reading or listening to music.', image: 'https://example.com/day4_image_routine.jpg', status: 'pending' },
          { day: 5, instruction: 'Prepare a healthy and balanced dinner.', image: 'https://example.com/day5_image_routine.jpg', status: 'pending' },
          { day: 6, instruction: 'Practice a 10-minute mindfulness meditation.', image: 'https://example.com/day6_image_routine.jpg', status: 'pending' },
          { day: 7, instruction: 'Go to bed at a consistent time and aim for 7-8 hours of sleep.', image: 'https://example.com/day7_image_routine.jpg', status: 'pending' },
          { day: 8, instruction: 'Engage in a hobby or activity that brings you joy.', image: 'https://example.com/day8_image_routine.jpg', status: 'pending' },
          { day: 9, instruction: 'Spend time outdoors, enjoying nature for at least 15 minutes.', image: 'https://example.com/day9_image_routine.jpg', status: 'pending' },
          { day: 10, instruction: 'Reflect on your self-care routine and any positive changes you’ve noticed.', image: 'https://example.com/day10_image_routine.jpg', status: 'pending' },
        ],
      },
    ],
  },
];


export default function Suggestions() {
  const navigation = useNavigation();

  // Function to handle goal selection
  const handleGoalSelect = (goal, goalType) => {
    // Navigate to the GoalSummary screen, passing the selected goal as a parameter
    navigation.navigate('PersonalizeMentalGoals/GoalSummary', { goal, goalType });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#E0BBE4', '#aec2b6', '#60768d']}
        style={styles.background}
      >
        <View>
          <Text style={styles.topic}>Personalize Goals</Text>
        </View>

        <View>
          <Icon style={styles.usericon} name="user" size={34} color="#2E4057" />
        </View>

        <View>
          <Text style={styles.details}>
            Here are some goals that may be helpful for you. Select a goal and start the activities in it. After finishing one goal, you can proceed to the next.
          </Text>
        </View>

        {/* Display goal types and goals */}
        <ScrollView style={styles.scrollContainer}>
          {goalData.map((goalType, index) => (
            <View key={index}>
              {/* Goal type */}
              <Text style={styles.goalType}>{goalType.type}</Text>

              {/* List of goals under the type */}
              {goalType.goals.map((goal) => (
                <View key={goal.id} style={styles.goalItem}>
                  <Text style={styles.goalName}>{goal.name}</Text>
                  <TouchableOpacity
                    style={styles.rightButton}
                    onPress={() => handleGoalSelect(goal, goalType.type)}
                  >
                    <Text style={styles.buttonText}>Start</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
        <NavBar/>
      </LinearGradient>
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
  usericon: {
    marginLeft: 340,
    marginTop: -30,
  },
  topic: {
    color: '#2E4057',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 30,
    textAlign: 'center',
  },
  details: {
    color: 'black',
    fontSize: 15,
    padding: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  scrollContainer: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  goalType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4057',
    marginTop: 15,
    marginBottom: 5,
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  goalName: {
    fontSize: 16,
    color: '#2E4057',
  },
  rightButton: {
    backgroundColor: '#60768d',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
