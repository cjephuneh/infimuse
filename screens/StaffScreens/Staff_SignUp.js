import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../redux/slice/auth/authSlice'; // Adjust the import path as necessary
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage



const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      visibilityTime: 4000,
    });
  };

  const handleSignUp = () => {
    if (!formData.firstName || !formData.email || !formData.password || !formData.phone) {
      showToast('info', 'Before Signing Up!', 'Please make sure all fields are filled');
      return;
    }
  
    dispatch(signUp(formData))
      .unwrap()
      .then(async (response) => {
        // Log the response
        console.log('Sign up response:', response);
        
        // Store the token in AsyncStorage
        await AsyncStorage.setItem('token', response.token);
        
        showToast('success', 'Success', 'Sign up successful!');
        
        // Store OTP in AsyncStorage if sign-up was successful
        if (response && response.OTP) {
          await AsyncStorage.setItem('OTP', response.OTP);
        }
  
        // Navigate only if the sign-up was successful
        if (response && response.token) {
          navigation.navigate('SignIn');
        }
      })
      .catch((error) => {
        showToast('error', 'Error', error.message || 'An error occurred');
      });
  };
  
  

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`p-4 justify-center`}>
          <View style={tw`w-full flex-1 justify-center mt-6 items-center`}>
            <Icon name="id-card" size={60} color="#A72C76" style={tw`mb-10 mt-2`} />
            <Text style={[tw`text-4xl font-bold  mb-10`, { color: '#A72C76' }]}>Sign Up</Text>

            <View style={tw`w-full mb-6`}>
              <Icon name="user" size={20} color="gray" style={tw`absolute ml-3 mt-3`} />
              <TextInput
                style={tw`pl-10 pr-4 py-2 border-b border-gray-400 rounded-full w-full`}
                placeholder="firstName"
                placeholderTextColor="#9a9a9a"
                onChangeText={text => setFormData({ ...formData, firstName: text })}
              />
            </View>

            <View style={tw`w-full mb-6`}>
              <Icon name="envelope" size={17} color="gray" style={tw`absolute ml-3 mt-3`} />
              <TextInput
                style={tw`pl-10 pr-4 py-2 border-b border-gray-400 rounded-full w-full`}
                placeholder="Email"
                placeholderTextColor="#9a9a9a"
                keyboardType="email-address"
                onChangeText={text => setFormData({ ...formData, email: text })}
              />
            </View>

            <View style={tw`w-full mb-6`}>
              <Icon name="phone" size={17} color="gray" style={tw`absolute ml-3 mt-3`} />
              <TextInput
                style={tw`pl-10 pr-4 py-2 border-b border-gray-400 rounded-full w-full`}
                placeholder="phone"
                placeholderTextColor="#9a9a9a"
                keyboardType="phone-number"
                onChangeText={text => setFormData({ ...formData, phone: text })}
              />
            </View>

            <View style={tw`w-full mb-6`}>
              <Icon name="lock" size={20} color="gray" style={tw`absolute ml-3 mt-3`} />
              <TextInput
                style={tw`pl-10 pr-4 py-2 border-b border-gray-400 rounded-full w-full`}
                placeholder="Password"
                placeholderTextColor="#9a9a9a"
                secureTextEntry
                onChangeText={text => setFormData({ ...formData, password: text })}
              />
            </View>

            <TouchableOpacity style={tw`flex flex-row items-center mb-8`} onPress={() => navigation.navigate('TermsScreen')}>
              <Icon name="square" size={24} color="#000" style={tw`mr-2`} />
              <Text style={tw`text-sm`}>Agree With Terms & Conditions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[tw`w-full rounded-full py-3 mb-6 shadow-lg`, { backgroundColor: "#12B9F3" }]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              <Text style={tw`text-white text-center text-lg`}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  'Sign Up'
                )}
              </Text>
            </TouchableOpacity>

            {isError && <Text style={tw`text-red-600 text-sm mb-2`}>{message}</Text>}

            <View style={tw`flex-row justify-evenly w-full mb-8`}>
              <TouchableOpacity style={tw`p-3`}>
                <Icon name="facebook" size={24} color="#3b5998" />
              </TouchableOpacity>
              <TouchableOpacity style={tw`p-3`}>
                <Icon name="google" size={24} color="#A72C76" />
              </TouchableOpacity>
              <TouchableOpacity style={tw`p-3`}>
                <Icon name="apple" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={tw`text-sm`}>Already Have An Account?{' '}<Text style={[tw` font-bold`, { color: '#A72C76' }]}>Sign In</Text></Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default SignUpScreen;
