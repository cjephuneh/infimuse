import React from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <ScrollView contentContainerStyle={tw`p-4 justify-center`}>
          <View style={tw`w-full flex-1 justify-center mt-6 items-center`}>
          <Icon name="id-card" size={60} color="#A72C76" style={tw`mb-10 mt-2`} />
            <Text style={[tw`text-4xl font-bold  mb-10`,{color: '#A72C76'}]}>Sign Up</Text>

            <View style={tw`w-full mb-6`}>
              <Icon name="user" size={20} color="gray" style={tw`absolute ml-3 mt-3`} />
              <TextInput
                style={tw`pl-10 pr-4 py-2 border-b border-gray-400 rounded-full w-full`}
                placeholder="Name"
                placeholderTextColor="#9a9a9a"
              />
            </View>

            <View style={tw`w-full mb-6`}>
              <Icon name="envelope" size={17} color="gray" style={tw`absolute ml-3 mt-3`} />
              <TextInput
                style={tw`pl-10 pr-4 py-2 border-b border-gray-400 rounded-full w-full`}
                placeholder="Email"
                placeholderTextColor="#9a9a9a"
                keyboardType="email-address"
              />
            </View>

            <View style={tw`w-full mb-6`}>
              <Icon name="lock" size={20} color="gray" style={tw`absolute ml-3 mt-3`} />
              <TextInput
                style={tw`pl-10 pr-4 py-2 border-b border-gray-400 rounded-full w-full`}
                placeholder="Password"
                placeholderTextColor="#9a9a9a"
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={tw`flex flex-row items-center mb-8`}>
              <Icon name="square-o" size={24} color="#000" style={tw`mr-2`} />
              <Text style={tw`text-sm`}>Agree With Terms & Conditions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[tw` w-full rounded-full py-3 mb-4`,{backgroundColor: '#12B9F3'}]}>
              <Text style={tw`text-white text-center text-lg`}
                onPress={() => navigation.navigate('OtpVerification')}
              >Sign Up</Text>
            </TouchableOpacity>

            <View style={tw`h-1 bg-gray-200 my-4 w-full rounded-full`} />

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
              <Text style={tw`text-sm`}>
                Already Have An Account?{' '}
                <Text style={[tw` font-bold`,{color: '#A72C76'}]}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUpScreen;