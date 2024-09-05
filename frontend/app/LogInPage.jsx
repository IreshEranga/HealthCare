import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import bg2 from '../assets/images/bg2.jpg'

export default function LogInPage() {

    const navigate = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            {/* Background Image */}
            <Image
                source={bg2}
                style={styles.backgroundImage}
            />

            <View style={styles.formContainer}>
                <Text style={styles.logintxt}>LogIn</Text>

                <TextInput
                    style={styles.input}
                    placeholder='User Name'
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                />

                {/* Submit Button */}
                <TouchableOpacity style={styles.logbtn} onPress={() => { /* Handle Sign Up */ }}>
                    <Text style={styles.btnText}>Log In</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logintxt: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 80
    },
    container: {
        backgroundColor: '#fff',
        marginBottom: 100,
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        height: 800,
        width: 'auto',
        position: 'absolute',
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white background
        borderRadius: 30,
        padding: 16,
        marginTop: 190,
        marginLeft:20,
        marginRight:20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 10,
        marginTop: 20,
    },
    logbtn: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 15,
        marginTop: 20,
        alignItems: 'center',
        marginBottom:30,
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
