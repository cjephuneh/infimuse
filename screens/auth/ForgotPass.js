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
import Icon from 'react-native-vector-icons/FontAwesome5'; // FontAwesome5 for updated icons
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <KeyboardAvoidingView
        style={tw`flex-1 py-3 px-4 bg-white `}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={tw`flex-grow`} contentContainerStyle={tw`justify-center`}>
          <View style={tw`w-full flex-1 justify-center items-center px-4 mt-14`}>
            <Icon name="lock" size={60} color="#A72C76" style={tw`mb-10`} />
            <Text style={[tw`text-4xl font-bold mb-10 text-center `,{color: '#A72C76'}]}>Forgot Password</Text>
            <Text style={tw`text-lg text-center text-gray-600 mb-10`}>
              Enter your email below to receive your password reset instructions.
            </Text>
            
            <View style={tw`w-full mb-8`}>
              <TextInput
                style={tw`border-b border-gray-400 w-full px-4 py-2 text-lg`}
                placeholder="Email"
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholderTextColor="#9a9a9a"
              />
            </View>
            
            <TouchableOpacity onPress={() => navigation.navigate("Main")} style={[tw` w-full rounded-full py-3 mb-6 shadow-lg`,{backgroundColor: "#12B9F3"}]}>
              <Text style={tw`text-white text-center text-lg`}>Send Instructions</Text>
            </TouchableOpacity>
          </View>

          <View style={tw`w-full pb-6 px-4`}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={tw`text-md text-center`}>
                Back to <Text style={[tw`text-pink-600 font-bold`,{color: '#A72C76'}]}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default ForgotPasswordScreen;
