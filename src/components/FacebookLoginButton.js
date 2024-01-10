import React, { useEffect } from 'react';
import { Button } from 'react-native';
import { LoginButton, LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { auth } from '../../firebase';
import { signInWithCredential, FacebookAuthProvider } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const FacebookLoginButton = () => {
  const navigation = useNavigation();

  const handleFacebookLogin = async () => {
    try {
      console.log("Start fb login");
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        console.log("User cancelled the Facebook login.");
        return;
      }

      console.log("Facebook login was successful!");

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        console.log('Something went wrong obtaining the Facebook access token');
        return;
      }

      const facebookCredential = FacebookAuthProvider.credential(data.accessToken);
      const userCredential = await signInWithCredential(auth, facebookCredential);
      
      console.log('User signed in with Facebook!', userCredential.user);
      navigation.navigate('Home');
    } catch (error) {
      console.log('Facebook login or Firebase credential failed:', error);
    }
  };

  return (
    <>
    <Button
    title="Facebook Sign-In"
    onPress={() => handleFacebookLogin().then(() => console.log('Signed in with Facebook!'))}
  />
    
      </>
  );
};

export default FacebookLoginButton;
