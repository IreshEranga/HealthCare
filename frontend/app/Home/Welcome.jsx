import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Welcome() {

  const currentHour = new Date().getHours();

  let greetingMessage = '';

  if (currentHour < 12){
    greetingMessage = 'Good Morning';
  } else if (currentHour < 18){
    greetingMessage = 'Good Afternoon';
  } else{
    greetingMessage = 'Good Night';
  }


  return (
    <View>
      <Text style={styles.hometext}>Home</Text>
      <Text style={styles.greetingMessage}>{greetingMessage}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  hometext:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:30,
    marginTop:20
  },
  greetingMessage:{
    textAlign:'left',
    fontSize:20,
    marginTop:10,
    marginLeft:25,
  }
})