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
  Image,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome5'; // FontAwesome5 for updated icons
import { launchImageLibrary } from 'react-native-image-picker'; // Import launchImageLibrary from react-native-image-picker
import { useNavigation } from '@react-navigation/native';

const AccountScreen = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.error) {
        setImageUri(response.uri);
      }
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
            <TouchableOpacity onPress={selectImage} style={tw`mb-4`}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={tw`w-40 h-40 rounded-full`} />
              ) : (
                <Icon name="user-circle" size={60} color="#A72C76" />
              )}
            </TouchableOpacity>
            <Text style={[tw`text-4xl font-bold mb-10 text-center`,{color: '#A72C76'}]}>Account</Text>
            
            <View style={tw`w-full mb-6`}>
              <TextInput
                style={tw`border-b border-gray-400 w-full px-4 py-2 text-lg`}
                placeholder="Name"
                placeholderTextColor="#9a9a9a"
              />
            </View>

            <View style={tw`w-full mb-6`}>
              <TextInput
                style={tw`border-b border-gray-400 w-full px-4 py-2 text-lg`}
                placeholder="Email"
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholderTextColor="#9a9a9a"
              />
            </View>

            <View style={tw`w-full mb-8`}>
              <TextInput
                style={tw`border-b border-gray-400 w-full px-4 py-2 text-lg`}
                placeholder="Password"
                secureTextEntry
                textContentType="password"
                placeholderTextColor="#9a9a9a"
              />
            </View>
            
            <TouchableOpacity style={[tw` w-full rounded-full py-3 mb-6 shadow-lg`,{ backgroundColor: "#12B9F3" }]}>
              <Text style={tw`text-white text-center text-lg`}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default AccountScreen;
