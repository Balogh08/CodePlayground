import React from 'react';
import { Platform } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';
import { auth } from '../../firebase';
import { signInWithCredential, FacebookAuthProvider } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const FacebookLoginButton = () => {
  const navigation = useNavigation();

  const handleFacebookLogin = async () => {
    try {
      if (Platform.OS === 'ios') {
        // Generate a nonce for Facebook Limited Login
        const nonce = '123456'; // Should be a random unique string
        const nonceSha256 = await sha256(nonce);

        // Attempt Facebook Limited Login
        const result = await LoginManager.logInWithPermissions(
          ['public_profile', 'email'],
          'limited',
          nonceSha256,
        );

        if (result.isCancelled) {
          console.log("User cancelled the Facebook login.");
          return;
        }

        // Get the Facebook Authentication Token
        const data = await AuthenticationToken.getAuthenticationTokenIOS();
        if (!data) {
          console.log('Something went wrong obtaining the authentication token');
          return;
        }

        // Create a Firebase credential with the AuthenticationToken and nonce
        const facebookCredential = FacebookAuthProvider.credential(data.authenticationToken, nonce);
        const userCredential = await signInWithCredential(auth, facebookCredential);
        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
      } else {

        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
          console.log('Something went wrong obtaining the Facebook access token');
          return;
        }
        const facebookCredential = FacebookAuthProvider.credential(data.accessToken);
        const userCredential = await signInWithCredential(auth, facebookCredential);
        console.log('User signed in with Facebook!', userCredential.user);
      }
      navigation.navigate('Home');
    } catch (error) {
      console.log('Facebook login or Firebase credential failed:', error);
    }
  };

  return (
    <LoginButton
      onLoginFinished={handleFacebookLogin}
      onLogoutFinished={() => console.log("logout.")}/>
  );
};

export default FacebookLoginButton;
