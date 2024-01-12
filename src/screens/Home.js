import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../styles/GlobalStyles';
import auth from '@react-native-firebase/auth';

export default function Home() {
    const [userEmail, setUserEmail] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }, []);

    function onAuthStateChanged(user) {
      setUserEmail(user ? user.email : '');
    }

    const handleLogout = () => {
      auth().signOut().then().catch((error) => {
        Alert.alert('Logout Failed', error.message);
      });
    };
    return (
      <SafeAreaView style={GlobalStyles.screenContainer}>
        <Text>Welcome to the Home Screen, {userEmail}!</Text>
        <TouchableOpacity style={GlobalStyles.button} onPress={handleLogout}>
          <Text style={GlobalStyles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
}
