// CreateWorkshopDetailsScreen.js

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const CreateWorkshopDetailsScreen = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    // Navigate to the "Add Classes" screen
    navigation.navigate('CreateWorkshopClassesScreen');
  };

  return (
    <KeyboardAvoidingView 
      style={tw`flex-1`} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={tw`p-4 bg-gray-50 flex-grow`}>
      <View style={tw`mb-8`}>
        <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>Create Workshop</Text>
        <TextInput placeholder="Title" style={tw`border-b border-gray-400 text-lg mb-4`} />
        <TextInput
          placeholder="Description"
          multiline
          style={tw`border-b border-gray-400 text-lg mb-4`}
        />
        <TextInput placeholder="Poster URL" style={tw`border-b border-gray-400 text-lg mb-4`} />
        <View style={tw`flex-row items-center mb-4`}>
          <Icon name="clock" size={20} color="#718096" style={tw`mr-2`} />
          <TextInput placeholder="Duration" style={tw`border-b border-gray-400 text-lg flex-1`} />
        </View>
        <View style={tw`flex-row items-center mb-4`}>
          <Icon name="user-friends" size={20} color="#718096" style={tw`mr-2`} />
          <TextInput placeholder="Capacity" keyboardType="numeric" style={tw`border-b border-gray-400 text-lg flex-1`} />
        </View>
        <TextInput placeholder="Price" keyboardType="numeric" style={tw`border-b border-gray-400 text-lg mb-4`} />
        <TextInput placeholder="Age Group" style={tw`border-b border-gray-400 text-lg mb-4`} />
        <View style={tw`flex-row mb-4`}>
          <View style={tw`mr-4`}>
            <Text style={tw`text-lg text-gray-800 mb-2`}>Age Min</Text>
            <TextInput placeholder="Min" keyboardType="numeric" style={tw`border-b border-gray-400 text-lg`} />
          </View>
          <View>
            <Text style={tw`text-lg text-gray-800 mb-2`}>Age Max</Text>
            <TextInput placeholder="Max" keyboardType="numeric" style={tw`border-b border-gray-400 text-lg`} />
          </View>
        </View>
      </View>

        <TouchableOpacity 
          style={tw`rounded-lg bg-purple-700 p-3 items-center`} 
          onPress={handleNext}
        >
          <Text style={tw`text-white font-semibold text-lg`}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateWorkshopDetailsScreen;
