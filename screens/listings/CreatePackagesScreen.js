// Import necessary libraries and components
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Toast from 'react-native-toast-message';
import { createPackage } from '../../redux/slice/listings/packagesServices'; // Import the API call function

const CreatePackageScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    posterUrl: '',
    duration: '',
    startDate: '',
    endDate: '',
    numberOfSessions: '',
    capacity: '',
    price: '',
    ageGroup: '',
    ageMin: '',
    ageMax: '',
    templateStatus: true // Initialize templateStatus as true
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

  const handleCreatePackage = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        showToast('error', 'Error', 'Token not found. Please sign in.');
        return;
      }

      setLoading(true); // Set loading to true when creating package

      const packageData = {
        title: formData.title,
        description: formData.description,
        posterUrl: formData.posterUrl,
        capacity: formData.capacity,
        duration: formData.duration,
        startDate: formData.startDate,
        endDate: formData.endDate,
        numberOfSessions: formData.numberOfSessions,
        price: formData.price,
        ageGroup: formData.ageGroup,
        ageMin: formData.ageMin,
        ageMax: formData.ageMax,
        templateStatus: formData.templateStatus
      };

      console.log('Creating package...', packageData);
      const response = await createPackage(packageData, token);

      if (response && response.status === 'success') {
        showToast('success', 'Success', 'Package created successfully!');
        // Optionally, navigate to a success screen
        // navigation.navigate('PackageCreatedScreen');
      } else {
        showToast('error', 'Error', 'Failed to create package. Please try again.');
      }
    } catch (error) {
      showToast('error', 'Error', 'An error occurred while creating package. Please try again.');
      console.error('Error creating package:', error);
    } finally {
      setLoading(false); // Set loading to false when the process is complete
    }
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
            {/* TextInput fields */}
            {/* Title */}
            <TextInput 
              placeholder="Title" 
              style={tw`border-b border-gray-400 text-lg py-2 px-4 mb-4`} 
              onChangeText={(title) => setFormData({ ...formData, title })}
            />
            {/* Description */}
            <TextInput 
              placeholder="Description" 
              multiline 
              style={tw`border-b border-gray-400 text-lg py-2 px-4 mb-4`} 
              onChangeText={(description) => setFormData({ ...formData, description })}
            />
            {/* Poster URL */}
            <TextInput 
              placeholder="Poster URL" 
              style={tw`border-b border-gray-400 text-lg py-2 px-4 mb-4`} 
              onChangeText={(posterUrl) => setFormData({ ...formData, posterUrl })}
            />
            {/* Duration */}
            <TextInput 
              placeholder="Duration" 
              style={tw`border-b border-gray-400 text-lg py-2 px-4 mb-4`} 
              onChangeText={(duration) => setFormData({ ...formData, duration })}
            />
            {/* Start Date */}
            <TextInput 
              placeholder="Start Date" 
              style={tw`border-b border-gray-400 text-lg py-2 px-4 mb-4`} 
              onChangeText={(startDate) => setFormData({ ...formData, startDate })}
            />
            {/* End Date */}
            <TextInput 
              placeholder="End Date" 
              style={tw`border-b border-gray-400 text-lg py-2 px-4 mb-4`} 
              onChangeText={(endDate) => setFormData({ ...formData, endDate })}
            />
            {/* Number of Sessions */}
            <TextInput 
              placeholder="Number of Sessions" 
              keyboardType="numeric" 
              style={tw`border-b border-gray-400 text-lg py-2 px-4 mb-4`} 
              onChangeText={(numberOfSessions) => setFormData({ ...formData, numberOfSessions })}
            />
            {/* Capacity */}
            <TextInput 
              placeholder="Capacity" 
              keyboardType="numeric" 
              style={tw`border-b border-gray-400 text-lg py-2 px-4 mb-4`} 
              onChangeText={(capacity) => setFormData({ ...formData, capacity })}
            />
            {/* Price */}
            <TextInput 
              placeholder="Price" 
              keyboardType="numeric" 
              style={tw`border-b border-gray-400 text-lg py-2 px-4 mb-4`} 
              onChangeText={(price) => setFormData({ ...formData, price })}
            />
            {/* Age Group */}
            <TextInput 
              placeholder="Age Group" 
              style={tw`border-b border-gray-400 text-lg py-2 px-4 mb-4`} 
              onChangeText={(ageGroup) => setFormData({ ...formData, ageGroup })}
            />
            {/* Age Min */}
            <TextInput 
              placeholder="Age Min" 
              keyboardType="numeric" 
              style={tw`border-b border-gray-400 text-lg py-2 px-4 mb-4`} 
              onChangeText={(ageMin) => setFormData({ ...formData, ageMin })}
            />
            {/* Age Max */}
            <TextInput 
              placeholder="Age Max" 
              keyboardType="numeric" 
              style={tw`border-b border-gray-400 text-lg py-2 px-4 mb-4`} 
              onChangeText={(ageMax) => setFormData({ ...formData, ageMax })}
            />
          </View>
          {/* Create Package Button */}
          <TouchableOpacity 
            style={tw`rounded-lg bg-purple-700 p-4 items-center`} 
            onPress={handleCreatePackage}
          >
            <Text style={tw`text-white font-semibold text-lg`}>Create Package</Text>
          </TouchableOpacity>
          {/* Loading Indicator */}
          {loading && <ActivityIndicator style={tw`mt-4`} size="large" color="#0000ff" />}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreatePackageScreen;
