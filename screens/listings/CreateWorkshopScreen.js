import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { createWorkshop } from '../../redux/slice/listings/workshopService'; // Import the createWorkshop API function
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Toast from 'react-native-toast-message'; // Import Toast component

const CreateWorkshopDetailsScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); // State to indicate loading state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    posterUrl: '',
    duration: '',
    capacity: '',
    price: '',
    ageGroup: '',
    ageMin: '',
    ageMax: '',
  });

  // const showToast = (type, text1, text2) => {
  //   // Your implementation of showToast
  //   Toast.show({
  //     type: type,
  //     text1: text1,
  //     text2: text2,
  //     visibilityTime: 3000,
  //     autoHide: true,
  //   });
  // };

  const handleNext = async () => {
    try {
      setLoading(true); // Set loading to true when creating workshop

      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem('token');

      // Call the createWorkshop API
      const workshopResponse = await createWorkshop(formData, token);

      if (workshopResponse && workshopResponse.id) {
        // Pass the workshop ID to the next screen
        navigation.navigate('CreateWorkshopClassesScreen', { workshopId: workshopResponse.id });
      } else {
        throw new Error("Workshop ID not found");
      }
    } catch (error) {
      console.error("Error creating workshop:", error);
      // Handle error here
      console.error('error', 'Error', 'Failed to create workshop. Please try again.');
    } finally {
      setLoading(false); // Set loading to false when the process is complete
    }
  };

  return (
    <KeyboardAvoidingView 
      style={tw`flex-1`} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={tw`p-4 bg-gray-50 flex-grow`}>
        <View style={tw`mb-8`}>
          <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>Create Workshop</Text>
          {/* TextInput fields */}
          <TextInput 
            placeholder="Title" 
            style={tw`border-b border-gray-400 text-lg mb-4`} 
            onChangeText={(title) => setFormData({ ...formData, title })}
          />
          <TextInput 
            placeholder="Description" 
            style={tw`border-b border-gray-400 text-lg mb-4`} 
            onChangeText={(description) => setFormData({ ...formData, description })}
          />
          <TextInput 
            placeholder="Poster URL" 
            style={tw`border-b border-gray-400 text-lg mb-4`} 
            onChangeText={(posterUrl) => setFormData({ ...formData, posterUrl })}
          />
          <TextInput 
            placeholder="Duration" 
            style={tw`border-b border-gray-400 text-lg mb-4`} 
            onChangeText={(duration) => setFormData({ ...formData, duration })}
          />
          
          <TextInput 
            placeholder="Capacity" 
            style={tw`border-b border-gray-400 text-lg mb-4`} 
            onChangeText={(capacity) => setFormData({ ...formData, capacity })}
          />
          <TextInput 
            placeholder="Price" 
            style={tw`border-b border-gray-400 text-lg mb-4`} 
            onChangeText={(price) => setFormData({ ...formData, price })}
          />
          <TextInput 
            placeholder="Age Group" 
            style={tw`border-b border-gray-400 text-lg mb-4`} 
            onChangeText={(ageGroup) => setFormData({ ...formData, ageGroup })}
          />
          <TextInput 
            placeholder="Age Min" 
            style={tw`border-b border-gray-400 text-lg mb-4`} 
            onChangeText={(ageMin) => setFormData({ ...formData, ageMin })}
          />
          <TextInput 
            placeholder="Age Max" 
            style={tw`border-b border-gray-400 text-lg mb-4`} 
            onChangeText={(ageMax) => setFormData({ ...formData, ageMax })}
          />
        </View>
        {/* Create Workshop button with loading indicator */}
        <TouchableOpacity 
          style={tw`rounded-lg bg-purple-700 p-3 items-center`} 
          onPress={handleNext} 
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={tw`text-white font-semibold text-lg`}>Next</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> Toast component */}
    </KeyboardAvoidingView>
  );
};

export default CreateWorkshopDetailsScreen;
