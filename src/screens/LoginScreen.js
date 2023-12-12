import React from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

export default function LoginScreen() {
  return (
    <SafeAreaView style={GlobalStyles.screenContainer}>
      <TextInput style={GlobalStyles.inputField} placeholder="Email" />
      <TextInput style={GlobalStyles.inputField} placeholder="Password" secureTextEntry />
      <TouchableOpacity style={GlobalStyles.button}>
        <Text style={GlobalStyles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <Text style={GlobalStyles.linkText}>Sign Up</Text>
    </SafeAreaView>
  );
}
