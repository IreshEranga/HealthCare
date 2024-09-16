import { Feather } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

// Define an interface for the item prop
interface FoodItem {
    label: string;
    cal: number;
    brand?: string; // Use '?' if brand is optional
  }
  
  type FoodListItemProps = {
    item: FoodItem;
  };


const FoodListItem = ({item}: FoodListItemProps) => {
    return(
      <View 
        style={styles.container}>
  
          <View style={{flex: 1, gap: 5}}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.label}</Text>
            <Text style={{color: 'dimgray'}}>{item.cal} cal, {item.brand}</Text>
          </View>
          <View>
            <Feather name="plus-circle" size={24} color="royalblue" />
          </View>
          
  
        </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gainsboro', 
          padding: 10, 
          borderRadius: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        alignItems: 'center'
    }
  });

  export default FoodListItem;