import React from 'react';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';
import { auth } from '../../firebase';
import { signInWithCredential, FacebookAuthProvider } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const FacebookLoginButton = () => {
  const navigation = useNavigation();

  const handleFacebookLogin = async () => {
    try {
      console.log("Start fb login");
      

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
    <LoginButton
      onLoginFinished={handleFacebookLogin}
      onLogoutFinished={() => console.log("logout.")}/>
      </>
  );
};

export default FacebookLoginButton;
