import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLoginPress = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Successful login
                console.log('Logged in:', userCredential.user);
                navigation.navigate('Home');
            })
            .catch((error) => {
                // Login failed
                Alert.alert('Authentication Failed', error.message);
            });
    };

    const handleSignUpPress = () => {
        navigation.navigate('Signup');
    };

    return (
        <SafeAreaView style={GlobalStyles.screenContainer}>
            <TextInput 
                style={GlobalStyles.inputField} 
                placeholder="Email" 
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput 
                style={GlobalStyles.inputField} 
                placeholder="Password" 
                value={password}
                onChangeText={setPassword}
                secureTextEntry 
            />
            <TouchableOpacity style={GlobalStyles.button} onPress={handleLoginPress}>
                <Text style={GlobalStyles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <Text style={GlobalStyles.linkText} onPress={handleSignUpPress}>Sign Up</Text>
        </SafeAreaView>
    );
}
