import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';




// Sample goal data
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

export default function Suggestions() {
  const navigation = useNavigation();

  // Function to handle goal selection
  const handleGoalSelect = (goal) => {
    // Navigate to the GoalSummary screen, passing the selected goal as a parameter
    navigation.navigate('PersonalizeMentalGoals/GoalSummary', { goal });
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
                    onPress={() => handleGoalSelect(goal)}
                  >
                    <Text style={styles.buttonText}>Start</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
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
