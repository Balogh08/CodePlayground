import React, { useState, useEffect } from 'react';
import { LoginButton, AccessToken, AuthenticationToken} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { sha256 } from 'react-native-sha256';

const FacebookLoginButton = () => {
  const [nonce, setNonce] = useState('');
  const [hashedNonce, setHashedNonce] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const generateNonce = async () => {
      // Generate random string
      const newNonce = Math.random().toString(36).substring(2,7);
      setNonce(newNonce);
      const nonceHash = await sha256(newNonce);
      setHashedNonce(nonceHash);
    };

    generateNonce();
  }, []);

  const handleFacebookLogin = async () => {
    try {
        // Get the Facebook Authentication Token
        const data = await AuthenticationToken.getAuthenticationTokenIOS();
        if (!data) {
          console.log('Something went wrong obtaining the authentication token');
          return;
        }

        // Create a Firebase credential with the AuthenticationToken and nonce
        const facebookCredential = auth.FacebookAuthProvider.credential(data.authenticationToken, nonce);
        const userCredential = await auth().signInWithCredential(facebookCredential);
        console.log('User signed in with Facebook!', userCredential.user);
        navigation.navigate('Home');
    } catch (error) {
        console.log('Facebook login or Firebase credential failed:', error);
    }
  };

  return (
    <LoginButton
      onLoginFinished={handleFacebookLogin}
      onLogoutFinished={() => console.log("logout.")}
      nonceIOS={hashedNonce}/>
  );
};

export default FacebookLoginButton;