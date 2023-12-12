import React from 'react';
import { TextInput, TouchableOpacity, Text, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { GlobalStyles } from '../styles/GlobalStyles';  
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword  } from 'firebase/auth';

// Validation Schema using Yup
const SignupSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must have at least one lowercase character')
    .matches(/[A-Z]/, 'Password must have at least one uppercase character')
    .matches(/[0-9]/, 'Password must have at least one number')
    .matches(/[@$!%*#?&]/, 'Password must have at least one special character'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function Signup() {
    const navigation = useNavigation();

    const handleCancelPress = () => {
        navigation.goBack();
    };
    const handleSignup = async (values, actions) => {
        if (values.password !== values.confirmPassword) {
            actions.setFieldError('confirmPassword', "Passwords don't match");
            return;
        }
        createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            console.log('Signed up:', userCredential.user);
            navigation.navigate('Home');
        })
        .catch((error) => {
            Alert.alert('Signup Failed', error.message);
        });
    };

    return (
        <>
            <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            onSubmit={handleSignup}
            validationSchema={SignupSchema}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={GlobalStyles.screenContainer}>
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

                <TextInput
                    style={GlobalStyles.inputField}
                    placeholder="Confirm Password"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry
                />
                {touched.confirmPassword && errors.confirmPassword && <Text>{errors.confirmPassword}</Text>}

                <TouchableOpacity style={GlobalStyles.button} onPress={handleSubmit}>
                    <Text style={GlobalStyles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={GlobalStyles.linkText} onPress={handleCancelPress}>Cancel</Text>
                </View>
            )}
            </Formik>
        </>
    );
}
