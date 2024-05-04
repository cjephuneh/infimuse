import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { createExperience } from '../../redux/slice/listings/ExperienceService'; // Import the API function
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Toast from 'react-native-toast-message';

const CreateExperienceScreen = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    posterUrl: '',
    duration: '',
    capacity: '',
    startTime: '',
    endTime: '',
    date: '',
    price: '',
    capacityStatus: false,
    ageGroup: '',
    ageMin: '',
    ageMax: '',
    templateStatus: false
  });

  const [loading, setLoading] = useState(false); // State to indicate loading state

  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const handleCreateExperience = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // Retrieve token from AsyncStorage
      if (!token) {
        showToast('error', 'Error', 'Token not found. Please sign in.');
        return;
      }

      setLoading(true); // Set loading to true when creating experience

      const experienceData = {
        title: formData.title,
        description: formData.description,
        posterUrl: formData.posterUrl,
        capacity: formData.capacity,
        duration: formData.duration,
        price: formData.price,
        ageGroup: formData.ageGroup,
        ageMin: formData.ageMin,
        ageMax: formData.ageMax,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        templateStatus: false // Initialize templateStatus as false
      };

      console.log('Creating experience...', experienceData);
      const response = await createExperience(experienceData, token);

      if (response && response.status === 'success') {
        showToast('success', 'Success', 'Experience created successfully!');
        // Optionally, navigate to a success screen
        // navigation.navigate('ExperienceCreatedScreen');
      } else {
        showToast('error', 'Error', 'Failed to create experience. Please try again.');
      }
    } catch (error) {
      showToast('error', 'Error', 'An error occurred while creating experience. Please try again.');
      console.error('Error creating experience:', error);
    } finally {
      setLoading(false); // Set loading to false when the process is complete
    }
  };

  return (
    <KeyboardAvoidingView 
      style={tw`flex-1`} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={tw`p-4 bg-gray-50 flex-grow`} >
        <View style={tw`mb-8`}>
          <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>Create Experience</Text>
          {/* TextInput fields */}
          <TextInput placeholder="Title" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(title) => setFormData({ ...formData, title })} />
          <TextInput placeholder="Description" multiline style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(description) => setFormData({ ...formData, description })} />
          <TextInput placeholder="Poster URL" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(posterUrl) => setFormData({ ...formData, posterUrl })} />
          <TextInput placeholder="Duration" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(duration) => setFormData({ ...formData, duration })} />
          <TextInput placeholder="Capacity" keyboardType="numeric" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(capacity) => setFormData({ ...formData, capacity })} />
          <TextInput placeholder="Start Time" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(startTime) => setFormData({ ...formData, startTime })} />
          <TextInput placeholder="End Time" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(endTime) => setFormData({ ...formData, endTime })} />
          <TextInput placeholder="Date" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(date) => setFormData({ ...formData, date })} />
          <TextInput placeholder="Price" keyboardType="numeric" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(price) => setFormData({ ...formData, price })} />
          <TextInput placeholder="Age Group" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(ageGroup) => setFormData({ ...formData, ageGroup })} />
          <TextInput placeholder="Age Min" keyboardType="numeric" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(ageMin) => setFormData({ ...formData, ageMin })} />
          <TextInput placeholder="Age Max" keyboardType="numeric" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(ageMax) => setFormData({ ...formData, ageMax })} />
        </View>
        {/* Create Experience button with loading indicator */}
        <TouchableOpacity style={tw`rounded-lg bg-purple-700 p-4 items-center`} onPress={handleCreateExperience} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={tw`text-white font-semibold text-lg`}>Create Experience</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </KeyboardAvoidingView>
  );
};

export default CreateExperienceScreen;
