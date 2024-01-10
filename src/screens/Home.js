import React, { useState, useEffect } from 'react';
import { LoginManager } from 'react-native-fbsdk-next';
import { SafeAreaView, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

export default function Home() {
    const [userEmail, setUserEmail] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
      const user = auth.currentUser;
      if (user) {
          setUserEmail(user.email);
      }
  }, []);

    const handleLogout = () => {
      signOut(auth).then(() => {
        LoginManager.logOut();
        navigation.navigate('Login');
      }).catch((error) => {
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
