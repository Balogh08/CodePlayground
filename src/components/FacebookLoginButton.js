import React from 'react';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';
import { auth, facebookProvider } from '../../firebase';
import { signInWithCredential } from 'firebase/auth';

const FacebookLoginButton = () => {
  const handleFacebookLogin = async (error, result) => {
    if (error) {
      console.log("login has error: " + result.error);
    } else if (result.isCancelled) {
      console.log("login is cancelled.");
    } else {
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        console.log('Something went wrong obtaining access token');
      } else {
        const facebookCredential = facebookProvider.credential(data.accessToken);
        await signInWithCredential(auth, facebookCredential);
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