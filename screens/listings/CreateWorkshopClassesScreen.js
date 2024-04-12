// CreateWorkshopClassesScreen.js

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';


const CreateWorkshopClassesScreen = () => {
    const navigation = useNavigation();

  // Logic to handle class creation will go here
  const handleCreateWorkshopScreen = () => {
    // Here you can perform any necessary actions before navigating
    navigation.navigate('CreateWorkshopSuccessScreen');
  };

  return (
    <KeyboardAvoidingView 
      style={tw`flex-1`} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={tw`p-4 bg-gray-50 flex-grow`}>
      <View style={tw`mb-8`}>
        <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>Classes</Text>
        {/* Class 1 */}
        <View style={tw`border-b pb-4 mb-4`}>
          <TextInput placeholder="Class Topic" style={tw`border-b border-gray-400 text-lg mb-4`} />
          <TextInput placeholder="Title" style={tw`border-b border-gray-400 text-lg mb-4`} />
          <TextInput placeholder="Description" style={tw`border-b border-gray-400 text-lg mb-4`} />
          <TouchableOpacity  style={tw`flex-row items-center mb-4`}>
            <Icon name="calendar" size={20} color="#718096" style={tw`mr-2`} />
            <TextInput placeholder="Date"  style={tw`border-b border-gray-400 text-lg flex-1`} />
          </TouchableOpacity>
          <View style={tw`flex-row items-center mb-4`}>
            <Icon name="clock" size={20} color="#718096" style={tw`mr-2`} />
            <TextInput placeholder="Start Time"  style={tw`border-b border-gray-400 text-lg flex-1`} />
          </View>
          <View style={tw`flex-row items-center mb-4`}>
            <Icon name="clock" size={20} color="#718096" style={tw`mr-2`} />
            <TextInput placeholder="End Time"  style={tw`border-b border-gray-400 text-lg flex-1`} />
          </View>
        </View>
        {/* Class 2 */}
          <View style={tw`border-b pb-4 mb-4`}>
            <TextInput placeholder="Class Topic" style={tw`border-b border-gray-400 text-lg mb-4`} />
            <TextInput placeholder="Title" style={tw`border-b border-gray-400 text-lg mb-4`} />
            <TextInput placeholder="Description" style={tw`border-b border-gray-400 text-lg mb-4`} />
            <TouchableOpacity  style={tw`flex-row items-center mb-4`}>
              <Icon name="calendar" size={20} color="#718096" style={tw`mr-2`} />
              <TextInput placeholder="Date"  style={tw`border-b border-gray-400 text-lg flex-1`} />
            </TouchableOpacity>
            <View style={tw`flex-row items-center mb-4`}>
              <Icon name="clock" size={20} color="#718096" style={tw`mr-2`} />
              <TextInput placeholder="Start Time" style={tw`border-b border-gray-400 text-lg flex-1`} />
            </View>
            <View style={tw`flex-row items-center mb-4`}>
              <Icon name="clock" size={20} color="#718096" style={tw`mr-2`} />
              <TextInput placeholder="End Time"  style={tw`border-b border-gray-400 text-lg flex-1`} />
            </View>
          </View>
        </View>
        <TouchableOpacity style={tw`rounded-lg bg-gray-200 p-3 items-center mb-4`}>
          <Text style={tw`text-gray-800 font-semibold`}>Add Another Class</Text>
        </TouchableOpacity>

        {/* Create Workshop button */}
        <TouchableOpacity style={tw`rounded-lg bg-purple-700 p-3  items-center`} onPress={handleCreateWorkshopScreen}>
        <Text style={tw`text-white font-semibold text-lg`}>Create Workshop</Text>
      </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateWorkshopClassesScreen;
