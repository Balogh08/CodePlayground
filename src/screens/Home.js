import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

export default function Home() {
  return (
    <SafeAreaView style={GlobalStyles.screenContainer}>
      <Text>Welcome to the Home Screen!</Text>
      <TouchableOpacity style={GlobalStyles.button}>
        <Text style={GlobalStyles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
