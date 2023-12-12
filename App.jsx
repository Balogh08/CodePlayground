import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
// import LoginScreen from './src/screens/LoginScreen';
// import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
