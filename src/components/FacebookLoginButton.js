import React from 'react';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';
import { auth, facebookProvider } from '../../firebase';
import { signInWithCredential } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const FacebookLoginButton = () => {
  const navigation = useNavigation();

  const handleFacebookLogin = async (error, result) => {
    console.log('Start handleFacebookLogin');
    if (error) {
      console.log("login has error: " + result.error);
    } else if (result.isCancelled) {
      console.log("login is cancelled.");
    } else {
      console.log('1 else');
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        console.log('Something went wrong obtaining access token');
      } else {
        console.log('data: ', data);
        console.log('facebookProvider: ', facebookProvider);
        const facebookCredential = facebookProvider.credential(data.accessToken);
        console.log('facebookCredential: ', facebookCredential);
        await signInWithCredential(auth, facebookCredential)
          .then(() => {
            console.log('Navigating home');
            navigation.navigate('Home');
          })
          .catch((error) => {
            console.log('Authentication failed:', error.message);
          });
          console.log('NO home');
      }
    }
  };

  return (
    <LoginButton
      onLoginFinished={handleFacebookLogin}
      onLogoutFinished={() => console.log("logout.")}/>
  );
};

export default FacebookLoginButton;
