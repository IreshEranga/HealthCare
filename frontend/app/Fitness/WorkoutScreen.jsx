import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import {useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const WorkoutScreen = () => {

  const route = useRoute();
  //console.log(route.params);
  const navigation = useNavigation();

  
  return (
    <>
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:"white",marginTop:0,}}>
      
      <Image
          style={{ width: "100%", height: 170 }}
          source={{ uri: route.params.image }}
        />
        <Ionicons
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: 20, left: 20 }}
          name="arrow-back-outline"
          size={28}
          color="white"
        />
        {route.params.excersises.map((item, index) => (
          <Pressable style={{margin:10,flexDirection:"row",alignItems:"center"}}key={index}>
            <Image
              style={{ width: 90, height: 90 }}
              source={{ uri: item.image }}
            />
            <View style ={{marginLeft:10,}}>
              <Text style={{fontSize:17,fontWeight:"bold"}}>{item.name}</Text>
              <Text style={{marginTop:4,fontSize:18,color:"gray"}}>X{item.sets}</Text>
            </View>
          </Pressable>

        ))}
    </ScrollView>

    <Pressable onPress={() => navigation.navigate("Fitness/FitScreen",{
      excersises:route.params.excersises,
    })}
     style={{
          backgroundColor: "blue",
          padding: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginVertical: 20,
          width:120,
          borderRadius:6,
        }}>
      <Text style={{
            textAlign: "center",
            color: "white",
            fontSize: 15,
            fontWeight: "600",
          }}>START</Text>

    </Pressable>
    </>

   
  )
};

export default WorkoutScreen;

const styles = StyleSheet.create({});