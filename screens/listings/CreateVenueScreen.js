import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { createVenue } from '../../redux/slice/listings/VenueService'; // Import the API function
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Toast from 'react-native-toast-message';

const CreateVenueScreen = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    accessibility: '',
    imageUrl1: '',
    imageUrl2: '',
    imageUrl3: '',
    venueType: '',
    capacity: '',
    amenities: '',
    noiseLevel: '',
    parking: false,
    additionalInfo: '',
    rules: '',
    hostId: ''
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

  const handleCreateVenue = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // Retrieve token from AsyncStorage
      if (!token) {
        showToast('error', 'Error', 'Token not found. Please sign in.');
        return;
      }

      setLoading(true); // Set loading to true when creating venue

      const venueData = {
        name: formData.name,
        location: formData.location,
        accessibility: formData.accessibility,
        imageUrl1: formData.imageUrl1,
        imageUrl2: formData.imageUrl2,
        imageUrl3: formData.imageUrl3,
        venueType: formData.venueType,
        capacity: formData.capacity,
        amenities: formData.amenities,
        noiseLevel: formData.noiseLevel,
        parking: formData.parking,
        additionalInfo: formData.additionalInfo,
        rules: formData.rules,
        hostId: formData.hostId
      };

      console.log('Creating venue...', venueData);
      const response = await createVenue(venueData, token);

      if (response && response.status === 'success') {
        showToast('success', 'Success', 'Venue created successfully!');
        // Optionally, navigate to a success screen
        // navigation.navigate('VenueCreatedScreen');
      } else {
        showToast('error', 'Error', 'Failed to create venue. Please try again.');
      }
    } catch (error) {
      showToast('error', 'Error', 'An error occurred while creating venue. Please try again.');
      console.error('Error creating venue:', error);
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
          <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>Create Venue</Text>
          {/* TextInput fields */}
          <TextInput placeholder="Name" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(name) => setFormData({ ...formData, name })} />
          <TextInput placeholder="Location" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(location) => setFormData({ ...formData, location })} />
          <TextInput placeholder="Accessibility" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(accessibility) => setFormData({ ...formData, accessibility })} />
          <TextInput placeholder="Image URL 1" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(imageUrl1) => setFormData({ ...formData, imageUrl1 })} />
          <TextInput placeholder="Image URL 2" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(imageUrl2) => setFormData({ ...formData, imageUrl2 })} />
          <TextInput placeholder="Image URL 3" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(imageUrl3) => setFormData({ ...formData, imageUrl3 })} />
          <TextInput placeholder="Venue Type" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(venueType) => setFormData({ ...formData, venueType })} />
          <TextInput placeholder="Capacity" keyboardType="numeric" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(capacity) => setFormData({ ...formData, capacity })} />
          <TextInput placeholder="Amenities" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(amenities) => setFormData({ ...formData, amenities })} />
          <TextInput placeholder="Noise Level" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(noiseLevel) => setFormData({ ...formData, noiseLevel })} />
          <TextInput placeholder="Additional Info" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(additionalInfo) => setFormData({ ...formData, additionalInfo })} />
          <TextInput placeholder="Rules" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(rules) => setFormData({ ...formData, rules })} />
          <TextInput placeholder="Host ID" keyboardType="numeric" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(hostId) => setFormData({ ...formData, hostId })} />
        </View>
        {/* Create Venue button with loading indicator */}
        <TouchableOpacity style={tw`rounded-lg bg-purple-700 p-4 items-center`} onPress={handleCreateVenue} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={tw`text-white font-semibold text-lg`}>Create Venue</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </KeyboardAvoidingView>
  );
};

export default CreateVenueScreen;
