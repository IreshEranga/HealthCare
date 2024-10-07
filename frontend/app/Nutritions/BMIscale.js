import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BMIScale = ({ bmi }) => {
    const getScaleColor = (bmi) => {
        if (bmi < 18.5) return '#8BC34A'; // Green for Underweight
        if (bmi < 25) return '#FFD54F'; // Yellow for Normal weight
        if (bmi < 30) return '#FF9800'; // Orange for Overweight
        return '#FF7043'; // Red for Obesity
    };

    const scalePosition = (bmi) => {
        if (bmi < 18.5) return ((bmi / 18.5) * 100) - 10; // Scale for Underweight
        if (bmi < 25) return ((bmi / 24.9) * 100) - 5; // Scale for Normal
        if (bmi < 30) return ((bmi / 29.9) * 100) + 5; // Scale for Overweight
        return 90; // Fixed position for Obesity
    };

    return (
        <View style={styles.scaleContainer}>
            <View style={styles.scale}>
                <View
                    style={[
                        styles.bmiIndicator,
                        {
                            left: `${scalePosition(bmi)}%`,
                            backgroundColor: getScaleColor(bmi),
                        },
                    ]}
                >
                    <Text style={styles.bmiValue}>{bmi ? bmi.toFixed(1) : 'N/A'}</Text>
                </View>
            </View>
            <Text style={styles.scaleLabel}>Underweight   Normal   Overweight   Obese</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    scaleContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    scale: {
        width: '90%',
        height: 20,
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        position: 'relative',
        justifyContent: 'center',
    },
    bmiIndicator: {
        position: 'absolute',
        top: -10,
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    bmiValue: {
        color: 'white',
        fontWeight: 'bold',
    },
    scaleLabel: {
        marginTop: 5,
        textAlign: 'center',
        color: '#777',
    },
});

export default BMIScale;
