import React from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

export default function SignupScreen() {
  return (
    <SafeAreaView style={GlobalStyles.screenContainer}>
      <TextInput style={GlobalStyles.inputField} placeholder="Email" />
      <TextInput style={GlobalStyles.inputField} placeholder="Password" secureTextEntry />
      <TextInput style={GlobalStyles.inputField} placeholder="Re-enter Password" secureTextEntry />
      <TouchableOpacity style={GlobalStyles.button}>
        <Text style={GlobalStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={GlobalStyles.linkText}>Cancel</Text>
    </SafeAreaView>
  );
}
