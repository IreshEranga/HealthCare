import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import NutritionHome from '@/app/Nutritions/nutritionHome';

const NutriNavBar = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.navBar}>

            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Nutritions/nutritionHome')}>
                <Icon name="home-outline" size={24} color="white" />
                <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Nutritions/addFood')}>
                <Icon name="search-outline" size={24} color="white" />
                <Text style={styles.navText}>Search Food</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Nutritions/dailyNutrition')}>
                <Icon name="book-outline" size={24} color="white" />
                <Text style={styles.navText}>Food Diary</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton}>
                <Icon name="calculator-outline" size={24} color="white" onPress={() => navigation.navigate('Nutritions/nutritionGoals')}/>
                <Text style={styles.navText}>BMI</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(71, 127, 73, 0.8)',
        paddingVertical: 5,
        paddingBottom: 15,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        elevation: 5,
        borderTopWidth: 2,
        borderTopColor: '#477F49',
    },
    navButton: {
      alignItems: 'center',
      marginTop:2,
      top:10,
    },
    navText: {
      color: 'white',
      fontSize: 12,
      marginTop: 5,
    },
  });

export default NutriNavBar;