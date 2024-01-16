import React from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { GlobalStyles } from '../styles/GlobalStyles';
import auth from '@react-native-firebase/auth';
import * as yup from 'yup';
import FacebookLoginButton from '../components/FacebookLoginButton';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function Login() {
    const navigation = useNavigation();

    const handleLoginPress = (values) => {
        auth().signInWithEmailAndPassword(values.email, values.password)
            .then((userCredential) => {
                console.log('Logged in:', userCredential.user);
                navigation.navigate('Home');
            })
            .catch((error) => {
                Alert.alert('Authentication Failed', error.message);
            });
    };

    const handleSignUpPress = () => {
        navigation.navigate('Signup');
    };

    return (
        <View style={GlobalStyles.screenContainer}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={handleLoginPress}
                validationSchema={loginSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <TextInput 
                            style={GlobalStyles.inputField} 
                            placeholder="Email" 
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        {touched.email && errors.email && <Text>{errors.email}</Text>}

                        <TextInput 
                            style={GlobalStyles.inputField} 
                            placeholder="Password" 
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry 
                        />
                        {touched.password && errors.password && <Text>{errors.password}</Text>}

                        <TouchableOpacity style={GlobalStyles.button} onPress={handleSubmit}>
                            <Text style={GlobalStyles.buttonText}>Log In</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
            <Text style={GlobalStyles.linkText} onPress={handleSignUpPress}>Sign Up</Text>
            <Text style={GlobalStyles.title}>Social Login</Text>
            <FacebookLoginButton />
        </View>
    );
}
