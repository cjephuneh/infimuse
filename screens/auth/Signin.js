import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slice/auth/authSlice'; // Adjust the import path as necessary
import Toast from 'react-native-toast-message';

const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(state => state.auth);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleInputChange = (name, value) => {
    setCredentials(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSignIn = () => {
    // Here simulate the hardcoded OTP
    const userData = { ...credentials, OTP: "541747" };
    dispatch(login(userData))
      .unwrap()
      .then((response) => {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Login Successful',
          text2: response.message,
          visibilityTime: 4000,
        });
        navigation.navigate('Main'); // Navigate on successful login
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Login Failed',
          text2: error.message || 'An error occurred',
          visibilityTime: 4000,
        });
      });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <KeyboardAvoidingView
        style={tw`flex-1 py-3 px-4 bg-white `}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={tw`flex-grow`} contentContainerStyle={tw`justify-center`}>
          <View style={tw`w-full flex-1 justify-center items-center px-4 mt-10`}>
            <Icon name="comments" size={60} color="#A72C76" style={tw`mb-10`} />
            <Text style={[tw`text-4xl font-bold mb-10 text-center `,{color: '#A72C76'}]}>Sign In</Text>
            
            <View style={tw`w-full mb-6`}>
              <TextInput
                style={tw`border-b border-gray-400 w-full px-4 py-2 text-lg`}
                placeholder="Email"
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholderTextColor="#9a9a9a"
                onChangeText={text => handleInputChange('email', text)}
              />
            </View>

            <View style={tw`w-full mb-8`}>
              <TextInput
                style={tw`border-b border-gray-400 w-full px-4 py-2 text-lg`}
                placeholder="Password"
                secureTextEntry
                textContentType="password"
                placeholderTextColor="#9a9a9a"
                onChangeText={text => handleInputChange('password', text)}
              />
            </View>
            
            <TouchableOpacity style={tw`self-end mb-6`} onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={tw`text-blue-500 `}>Forgot Password?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[tw` w-full rounded-full py-3 mb-6 shadow-lg`,{ backgroundColor: "#12B9F3" }]} onPress={handleSignIn}>
              <Text style={tw`text-white text-center text-lg`}>Sign In</Text>
            </TouchableOpacity>
            
            <Text style={tw`text-sm mb-4 text-center`}>Or Sign In With:</Text>

            <View style={tw`h-1 bg-gray-200 my-4 w-full rounded-full`} />
            
            <View style={tw`flex-row justify-around w-full mb-10`}>
              <TouchableOpacity style={tw`p-3`}>
                <Icon name="facebook-f" size={24} color="#3b5998" />
              </TouchableOpacity>
              
              <TouchableOpacity style={tw`p-3`}>
                <Icon name="google" size={24} color="#A72C76" />
              </TouchableOpacity>
              
              <TouchableOpacity style={tw`p-3`}>
                <Icon name="apple" size={24} color="#333333" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={tw`w-full pb-6 px-4`}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={tw`text-center`}>
                Don’t Have An Account? <Text style={[tw`text-pink-600 font-bold`,{color: '#A72C76'}]}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default SignInScreen;