import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

export default function Home() {
    const navigation = useNavigation();

    const handleLogout = () => {
      signOut(auth).then(() => {
        navigation.navigate('Login');
      }).catch((error) => {
        Alert.alert('Logout Failed', error.message);
      });
    };
    return (
      <SafeAreaView style={GlobalStyles.screenContainer}>
        <Text>Welcome to the Home Screen!</Text>
        <TouchableOpacity style={GlobalStyles.button} onPress={handleLogout}>
          <Text style={GlobalStyles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
}
