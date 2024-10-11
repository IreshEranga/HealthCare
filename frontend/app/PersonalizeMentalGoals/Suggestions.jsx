import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../../components/NavBar';
import Premium from '../../assets/images/prem.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 

const goalData = [
  {
    type: 'Stress Management',
    goals: [
      {
        id: 1,
        name: 'Reduce Work Stress',
        summary: 'This goal is focused on helping you manage and reduce work-related stress by incorporating daily activities that promote relaxation and mindfulness. Over 10 days, you\'ll engage in practices such as deep breathing, taking breaks to walk, and reflecting on stressors. Each activity is designed to be simple, practical, and easy to integrate into your workday, helping you build habits that contribute to overall stress reduction and mental well-being.',
        isPremium: false,
        activities: [
          { day: 1, instruction: 'Start your day with 5 minutes of deep breathing exercises.', image:'https://cdn.painscale.com/cms/imgs/a3fdad40-d477-11eb-80b1-dda9a4b176e4.jpg', status: 'pending' },
          { day: 2, instruction: 'Take a 10-minute walk during your lunch break.', image: 'https://nypost.com/wp-content/uploads/sites/2/2024/06/AdobeStock_216150737.jpg?w=1024', status: 'pending' },
          { day: 3, instruction: 'Write down 3 things that stressed you today and how you handled them.', image: 'https://www.artsacad.net/wp-content/uploads/2021/02/writing-923882_1280-e1612887036943.jpg', status: 'pending' },
          { day: 4, instruction: 'Practice progressive muscle relaxation for 10 minutes.', image: 'https://media.post.rvohealth.io/wp-content/uploads/2020/03/Yoga_Class_732x549-thumbnail-732x549.jpg', status: 'pending' },
          { day: 5, instruction: 'Engage in 15 minutes of mindfulness meditation.', image: 'https://hypnomindclinic.com/wp-content/uploads/2024/03/GettyImages-539661087-58d2e5e65f9b5846830df9aa.jpg', status: 'pending' },
          { day: 6, instruction: 'Identify and write down one positive thing that happened today.', image: 'https://www.artsacad.net/wp-content/uploads/2021/02/writing-923882_1280-e1612887036943.jpg', status: 'pending' },
          { day: 7, instruction: 'Practice deep breathing exercises during a stressful moment.', image: 'https://t4.ftcdn.net/jpg/06/67/73/71/360_F_667737140_zjzYy8S2s3jjsiXW2J8FXknSAK79oKrb.jpg', status: 'pending' },
          { day: 8, instruction: 'Take a 15-minute walk outside.', image: 'https://peakorthopt.com/wp-content/uploads/2021/01/Improve-Your-Fitness-With-These-5-Benefits-of-Walking.jpg.webp', status: 'pending' },
          { day: 9, instruction: 'Write a reflection on your progress and any changes you noticed.', image: 'https://www.betterup.com/hubfs/Young-woman-writing-in-a-notebook-in-front-of-her-laptop-how-to-write-a-professional-email.jpg', status: 'pending' },
          { day: 10, instruction: 'Spend 10 minutes in quiet reflection or meditation.', image: 'https://purespiritualhealing.com/wp-content/uploads/2024/01/Mindfulness-Meditation.jpg', status: 'pending' },
        ],
      },
      {
        id: 2,
        name: 'Mindful Breathing',
        summary: 'This goal is designed to enhance your mindfulness and focus through various breathing techniques. Over 10 days, you\'ll practice different methods of breathing and relaxation to help reduce stress and increase overall well-being.',
        isPremium: true,
        activities: [
          { day: 1, instruction: 'Spend 10 minutes focusing on your breath, counting each inhale and exhale.', image: 'https://t3.ftcdn.net/jpg/08/28/24/34/360_F_828243487_R4O4RJSkvK02pFyJ13BWiHYdI6xqUV7t.jpg', status: 'pending' },
          { day: 2, instruction: 'Practice box breathing (inhale for 4 seconds, hold for 4, exhale for 4, and hold for 4).', image: 'https://images.everydayhealth.com/images/healthy-living/alternative-health/meditation-breathing-techniques-722x406.jpg', status: 'pending' },
          { day: 3, instruction: 'Do a body scan meditation, focusing on relaxing each part of your body.', image: 'https://dabbledoneright-production.s3.amazonaws.com/production/uploads/course/photo/155341/carousel_Chakras_for_ND_Events.jpeg', status: 'pending' },
          { day: 4, instruction: 'Try 5 minutes of alternate nostril breathing.', image: 'https://images.squarespace-cdn.com/content/v1/57fd7420b8a79b729ee524a1/1558031476210-QGHDST2TW0P9833JWQU7/ANB_alternate_nostril_breathing.jpg', status: 'pending' },
          { day: 5, instruction: 'Practice diaphragmatic breathing for 10 minutes.', image: 'https://cdn.prod.website-files.com/5ecc494476c6a82d2cac1f25/5f868c701fcffe0e4f1e8245_Breathing.%20Low%20back%20pain%20relief.jpg', status: 'pending' },
          { day: 6, instruction: 'Engage in 5 minutes of slow, deep breathing.', image: 'https://pharmabay.ng/wp-content/uploads/2023/10/The-Benefits-of-Deep-Breathing-Exercises.jpg', status: 'pending' },
          { day: 7, instruction: 'Incorporate a breathing technique while doing a daily activity.', image: 'https://images.everydayhealth.com/images/arthritis/rheumatoid-arthritis/a-simple-breathing-exercise-for-ra-related-symptoms-alt-1440x810.jpg', status: 'pending' },
          { day: 8, instruction: 'Spend 10 minutes on mindful breathing with guided meditation.', image: 'https://cdn.prod.website-files.com/61384703bca2db472ca04cfa/6448e2301a3c7767450647ab_130-reigate-blog-post-image-20170320220541.jpg', status: 'pending' },
          { day: 9, instruction: 'Practice breathing exercises before bedtime.', image: 'https://cdn.shopify.com/s/files/1/0635/6929/7637/files/Breathing-1.jpg?v=1692269779', status: 'pending' },
          { day: 10, instruction: 'Reflect on how mindful breathing has affected your stress levels.', image: 'https://www.moonbird.life/cdn/shop/articles/gilmoonbird_700x.png?v=1724769962', status: 'pending' },
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
        isPremium: true,
        activities: [
          { day: 1, instruction: 'Write about your emotions today and what triggered them.', image: 'https://pp-blog.paperpal.com/wp-content/uploads/2022/11/pexels-karolina-grabowska-4476376.jpg', status: 'pending' },
          { day: 2, instruction: 'Reflect on a difficult situation and how you handled it.', image: 'https://www.munich-business-school.de/insights/wp-content/uploads/2022/10/Vorstellungsgespraech_Blog-678x381.jpg', status: 'pending' },
          { day: 3, instruction: 'Write down a moment you felt proud of yourself recently.', image: 'https://mac-birmingham.transforms.svdcdn.com/production/Learning-and-Participation/2024/Courses/WR11-_-Creative-Writing-Improvers.png?w=760&h=504&q=100&auto=format&fit=crop&dm=1713454089&s=024b95f9fc38e3d81ca2af397a5c1828', status: 'pending' },
          { day: 4, instruction: 'Describe a positive interaction you had today and how it made you feel.', image: 'https://charityvillage.com/wp-content/uploads/2022/12/Interview-Feature-1.png', status: 'pending' },
          { day: 5, instruction: 'Write about a challenge you faced and how you overcame it.', image: 'https://miro.medium.com/v2/resize:fit:1400/1*roqF8yyhOkBXBhCBH5oWqw.jpeg', status: 'pending' },
          { day: 6, instruction: 'Jot down three things you appreciate about yourself.', image: 'https://miro.medium.com/v2/resize:fit:1400/1*roqF8yyhOkBXBhCBH5oWqw.jpeg', status: 'pending' },
          { day: 7, instruction: 'Reflect on a moment when you felt anxious and how you managed it.', image: 'https://images.squarespace-cdn.com/content/v1/656f4e4dababbd7c042c4946/782d9579-4266-4bd4-ae67-18e34bc3fcf6/presentation-anxiety-3x2.jpg', status: 'pending' },
          { day: 8, instruction: 'Write about an interaction that made you happy and why.', image: 'https://miro.medium.com/v2/resize:fit:1400/1*roqF8yyhOkBXBhCBH5oWqw.jpeg', status: 'pending' },
          { day: 9, instruction: 'Describe your feelings about a recent accomplishment.', image: 'https://www.ielts.net/wp-content/uploads/2024/09/recent-accomplishment-proud-of-66fa7b.webp', status: 'pending' },
          { day: 10, instruction: 'Reflect on your journaling journey and any insights gained.', image: 'https://cdn.shopify.com/s/files/1/0247/8551/8688/t/18/assets/writing_yir_journal_prompts_r-1669998477541_500x.jpg?v=1669998484', status: 'pending' },
        ],
      },
      {
        id: 4,
        name: 'Gratitude Practice',
        summary: 'This goal focuses on cultivating a sense of gratitude through daily practices. Over 10 days, you\'ll engage in activities designed to help you recognize and appreciate the positive aspects of your life, fostering a greater sense of well-being and positivity.',
        isPremium: false,
        activities: [
          { day: 1, instruction: 'Write down 3 things you are grateful for today.', image: 'https://www.jestkeptsecret.com/wp-content/uploads/2020/05/Writing-in-Journal-by-psphotography-Jest-Kept-Secret.jpg', status: 'pending' },
          { day: 2, instruction: 'Send a message to someone you appreciate, expressing gratitude.', image: 'https://i0.wp.com/www.alphr.com/wp-content/uploads/2022/08/featured-32.png?fit=600%2C300&ssl=1', status: 'pending' },
          { day: 3, instruction: 'Reflect on a difficult time and how it made you stronger.', image: 'https://www.comprosition.com/uploads/images/1655365498-Quoteonhardtimes.jpeg', status: 'pending' },
          { day: 4, instruction: 'Write a letter of thanks to someone who has had a positive impact on you.', image: 'https://t4.ftcdn.net/jpg/05/05/39/07/360_F_505390776_8ilykzGiVSpIjUqdEXFhDY1ACRJZPDRD.jpg', status: 'pending' },
          { day: 5, instruction: 'Create a list of things you are grateful for about yourself.', image: 'https://shop.marjoleindelhaas.com/wp-content/uploads/2023/10/C365_ALOT-R9034-front-scaled.jpg', status: 'pending' },
          { day: 6, instruction: 'Share a moment of gratitude with a friend or family member.', image: 'https://as2.ftcdn.net/v2/jpg/01/26/91/19/1000_F_126911952_1LLND2WWiuYcRShjc3la1K4L5PAGwBJo.jpg', status: 'pending' },
          { day: 7, instruction: 'Write about a recent positive experience and how it made you feel.', image: 'https://cpet.tc.columbia.edu/uploads/1/8/4/5/18456699/write-to-learn_orig.png', status: 'pending' },
          { day: 8, instruction: 'Reflect on how practicing gratitude has affected your mood.', image: 'https://cdn.prod.website-files.com/5daf80d1fcdc19a7ca1e6539/63ae40b833698ba197e5b644_nathan-dumlao-fs_l0Xqlc90-unsplash.webp', status: 'pending' },
          { day: 9, instruction: 'Write down something positive that happened today and how it impacted you.', image: 'https://lsme.ac.uk/wp-content/uploads/2023/02/Positive-Thinking-jpg.webp', status: 'pending' },
          { day: 10, instruction: 'Create a gratitude jar and add a note of thanks each day.', image: 'https://mahometdaily.com/wp-content/uploads/2024/01/G-jar.png', status: 'pending' },
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
        isPremium: false,
        activities: [
          { day: 1, instruction: 'Start your day with a nutritious breakfast.', image: 'https://post.healthline.com/wp-content/uploads/2021/10/fruit-salad-best-breakfast-foods-1296x728-body.jpg', status: 'pending' },
          { day: 2, instruction: 'Set aside 30 minutes for physical exercise.', image: 'https://content.ca.healthwise.net/resources/13.9/en-ca/media/medical/hw/bld114121_kb.jpg', status: 'pending' },
          { day: 3, instruction: 'Drink at least 8 glasses of water throughout the day.', image: 'https://northerndentaldesign.com.au/wp-content/uploads/2021/05/Why-Is-Water-Important-16-Reasons-to-Drink-Up-Epping.jpg', status: 'pending' },
          { day: 4, instruction: 'Spend 20 minutes doing a relaxing activity such as reading or listening to music.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-sD-ukxdj4Hn3SMlqHJZxpKkdMIm6NHiOFw&s', status: 'pending' },
          { day: 5, instruction: 'Prepare a healthy and balanced dinner.', image: 'https://www.eatthis.com/wp-content/uploads/sites/4/2019/10/pumpkin-pad-thai-recipe.jpg?quality=82&strip=1', status: 'pending' },
          { day: 6, instruction: 'Practice a 10-minute mindfulness meditation.', image: 'https://www.apa.org/images/tile-stress-mindfulness-meditation_tcm7-264379.jpg', status: 'pending' },
          { day: 7, instruction: 'Go to bed at a consistent time and aim for 7-8 hours of sleep.', image: 'https://www.sleepfoundation.org/wp-content/uploads/2018/10/What-is-Healthy-Sleep.jpg', status: 'pending' },
          { day: 8, instruction: 'Engage in a hobby or activity that brings you joy.', image: 'https://www.acvillage.net/wp-content/uploads/2021/08/3-Reasons-Seniors-Should-Try-a-New-Hobby.jpg', status: 'pending' },
          { day: 9, instruction: 'Spend time outdoors, enjoying nature for at least 15 minutes.', image: 'https://media.istockphoto.com/id/1283852667/photo/touch-of-fresh-moss-in-the-forest.jpg?s=612x612&w=0&k=20&c=I91IV_It_xDEUlUCOg9hcoEw83ym7Q2-1hsCXtO-l7A=', status: 'pending' },
          { day: 10, instruction: 'Reflect on your self-care routine and any positive changes you’ve noticed.', image: 'https://www.nmamilife.com/wp-content/uploads/2021/06/7-June-blog-1.jpg', status: 'pending' },
        ],
      },
    ],
  },
];


export default function Suggestions() {
  const [userID, setUserID] = useState('');
  const [_id, set_id] = useState('');
  const [userType, setUserType] = useState('');
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('loggedInUser');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser && parsedUser.userID && parsedUser._id) {
          setUserID(parsedUser.userID);
          set_id(parsedUser._id);
          console.log("user ID : ", userID);
          console.log("User _id : ", _id);
        }
      } catch (error) {
        console.log('Error fetching user data', error);
      }
    };

   
    

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserType = async () => {
      if (_id) {
        console.log("Id get");
        try {
          const response = await axios.get(`${apiUrl}/users/users/${_id}/type`);
          setUserType(response.data.type); 
        } catch (error) {
          console.error('Error fetching user type:', error);
        }
      }
    };

    fetchUserType();
    console.log("User type : ",userType);
  }, [_id]);
  
  const navigation = useNavigation();

  // Function to handle goal selection
  const handleGoalSelect = (goal, goalType) => {
    // Navigate to the GoalSummary screen, passing the selected goal as a parameter
    navigation.navigate('PersonalizeMentalGoals/GoalSummary', { goal, goalType });
  };

  const handleQuizProgress = ()=>{
    console.log("Handle clicked");
    navigation.navigate('PersonalizeMentalGoals/QuizProgress');
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
          <Icon style={styles.usericon} name="user" size={34} color="#2E4057" onPress={() => navigation.navigate('ProfilePage')} />
        </View>

        <View>
          <Text style={styles.details}>
            Here are some goals that may be helpful for you. Select a goal and start the activities in it. After finishing one goal, you can proceed to the next.
          </Text>
        </View>

        <View>
          <TouchableOpacity style={styles.qprogress} onPress={handleQuizProgress}>
            <Text style={styles.progressText}>Quiz Progress</Text>
            <Icon name="arrow-right" size={16} color="white" style={styles.progressIcon} />
          </TouchableOpacity>
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
                  {goal.isPremium && (
                  <Image
                    source={Premium} // Replace with your premium image URL
                    style={styles.premiumImage}
                  />
                )}
                {!(goal.isPremium && userType === 'normal') && (
                  <TouchableOpacity
                    style={styles.rightButton}
                    onPress={() => handleGoalSelect(goal, goalType.type)}
                  >
                    <Text style={styles.buttonText}>Start</Text>
                  </TouchableOpacity>
                )}
                  {/* <TouchableOpacity
                    style={styles.rightButton}
                    onPress={() => handleGoalSelect(goal, goalType.type)}
                  >
                    <Text style={styles.buttonText}>Start</Text>
                  </TouchableOpacity> */}
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
  qprogress: {
    flexDirection: 'row', // To place the text and icon horizontally
    alignItems: 'center', // To align them vertically
    backgroundColor: '#60768d',
    padding: 10,
    borderRadius: 15,
    width:'40%',
    marginLeft:20,
  },
  progressText: {
    fontSize: 16,
    color: '#ffffff',
  },
  progressIcon: {
    marginLeft: 10, // Add some space between the text and the icon
  },
  premiumImage: {
    width: 30,
    height: 30,
    //marginBottom: 10,
  },
});
