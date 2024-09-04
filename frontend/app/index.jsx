import { Image, StyleSheet, Platform, Text, View } from 'react-native';



export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    alignItems:"center",
    flex:1,
    justifyContent:"center",
  },
});
