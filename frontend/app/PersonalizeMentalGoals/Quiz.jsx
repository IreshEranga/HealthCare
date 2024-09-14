import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
//import { ScrollView } from 'react-native-gesture-handler';

export default function Quiz() {
  return (
    <SafeAreaView style={styles.container}>
        <LinearGradient 
        colors={['#E0BBE4','#aec2b6', '#60768d', ]}
        style={styles.background}>
        <View >
            <Text style={styles.topic}>Personalize Goals</Text>
            
        </View>

        <View>
          <Icon style={styles.usericon} name="user" size={34} color="#2E4057" />
        </View>

        <View>
          <Text style={styles.details}>
          First fill the form to get and idea about your mental condition. Then we will suggest set of goals for you.
          </Text>
        </View>

        <ScrollView>

        </ScrollView>




        </LinearGradient>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0e1138',
        flex: 1, // Ensure the container takes full height
      },
    background:{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 1000,
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
        textAlign:'center',
        fontSize:20,
      },
    details:{
      color:'black',
      fontSize:18,
      padding:20,
      textAlign:'center',
      marginTop:20
    }
})