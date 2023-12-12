import React from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../styles/GlobalStyles';

export default function LoginScreen() {
    const navigation = useNavigation();

    const handleSignUpPress = () => {
      navigation.navigate('Signup');
    };
  
    const handleLoginPress = () => {
      // TODO:Perform authentication...
      navigation.navigate('Home');
    };

    return (
        <SafeAreaView style={GlobalStyles.screenContainer}>
        <TextInput style={GlobalStyles.inputField} placeholder="Email" />
        <TextInput style={GlobalStyles.inputField} placeholder="Password" secureTextEntry />
        <TouchableOpacity style={GlobalStyles.button} onPress={handleLoginPress}>
            <Text style={GlobalStyles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Text style={GlobalStyles.linkText} onPress={handleSignUpPress}>Sign Up</Text>
        </SafeAreaView>
    );
}
