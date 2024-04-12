import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


const CreatePackagesScreen = () => {
  const navigation = useNavigation();


  const handleCreatePackagesScreen = () => {
    // Here you can perform any necessary actions before navigating
    navigation.navigate('CreatePackagesSuccessScreen');
  };
  return (
    <KeyboardAvoidingView 
      style={tw`flex-1 bg-gray-50`} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={tw`p-4 flex-grow`} >
        <View style={tw`mb-8`}>
          <Text style={tw`text-3xl font-bold text-gray-800 mb-4`}>Create Package</Text>
          <View style={tw`mb-6 border-b border-gray-400 pb-6`}>
            <View style={tw`mb-4`}>
              <TextInput placeholder="Title" style={tw`border-b border-gray-400 text-lg py-2 px-4`} />
            </View>
            <View style={tw`mb-4`}>
              <TextInput placeholder="Description" multiline style={tw`border-b border-gray-400 text-lg py-2 px-4`} />
            </View>
            <View style={tw`mb-4`}>
              <TextInput placeholder="Poster URL" style={tw`border-b border-gray-400 text-lg py-2 px-4`} />
            </View>
            <View style={tw`mb-4`}>
              <TextInput placeholder="Duration" style={tw`border-b border-gray-400 text-lg py-2 px-4`} />
            </View>
            <View style={tw`mb-4`}>
              <TextInput placeholder="Number of Sessions" keyboardType="numeric" style={tw`border-b border-gray-400 text-lg py-2 px-4`} />
            </View>
            <View style={tw`mb-4`}>
              <TextInput placeholder="Price" keyboardType="numeric" style={tw`border-b border-gray-400 text-lg py-2 px-4`} />
            </View>
            <View style={tw`mb-4`}>
              <TextInput placeholder="Date" style={tw`border-b border-gray-400 text-lg py-2 px-4`} />
            </View>
            <View style={tw`mb-4`}>
              <TextInput placeholder="Start Time" style={tw`border-b border-gray-400 text-lg py-2 px-4`} />
            </View>
            <View style={tw`mb-4`}>
              <TextInput placeholder="End Time" style={tw`border-b border-gray-400 text-lg py-2 px-4`} />
            </View>
            <View style={tw`mb-4`}>
              <TextInput placeholder="Time Duration" style={tw`border-b border-gray-400 text-lg py-2 px-4`} />
            </View>
            <View style={tw`mb-4`}>
              <TextInput placeholder="Capacity" keyboardType="numeric" style={tw`border-b border-gray-400 text-lg py-2 px-4`} />
            </View>
            <View style={tw`mb-4`}>
              <TextInput placeholder="Age Group" style={tw`border-b border-gray-400 text-lg py-2 px-4`} />
            </View>
            <View style={tw`flex-row justify-between`}>
              <View style={tw`mr-2`}>
                <TextInput placeholder="Age Min" keyboardType="numeric" style={tw`border-b border-gray-400 text-lg py-2 px-4`} />
              </View>
              <View style={tw`ml-2`}>
                <TextInput placeholder="Age Max" keyboardType="numeric" style={tw`border-b border-gray-400 text-lg py-2 px-4`} />
              </View>
            </View>
          </View>

          <TouchableOpacity style={tw`rounded-lg bg-purple-700 p-4 items-center`} onPress={handleCreatePackagesScreen}>
            <Text style={tw`text-white font-semibold text-lg`}>Create Package</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreatePackagesScreen;
