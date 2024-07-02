import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image, ActivityIndicator, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons'; // Importing icon

const CreateVenueScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
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
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState({ imageUrl1: null, imageUrl2: null, imageUrl3: null });

  const pickImage = async (imageKey) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImagePreview({ ...imagePreview, [imageKey]: result.uri });
      setFormData({ ...formData, [imageKey]: result.uri });
    }
  };

  const removeImage = (imageKey) => {
    setImagePreview({ ...imagePreview, [imageKey]: null });
    setFormData({ ...formData, [imageKey]: '' });
  };

  const handleCreateVenue = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await createVenue(formData, token);
      Toast.show({ type: response.status === 'success' ? 'success' : 'error', text1: response.status === 'success' ? 'Success' : 'Error', text2: response.message || 'Action completed.' });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <>
            {renderInput('Name', 'name')}
            {renderInput('Location', 'location')}
            {renderInput('Accessibility', 'accessibility')}
          </>
        );
      case 2:
        return (
          <>
            {['imageUrl1', 'imageUrl2', 'imageUrl3'].map((key, index) => (
              <View key={index} style={tw`mb-6`}>
                <TouchableOpacity onPress={() => pickImage(key)} style={styles.imagePickerButton}>
                  <Text style={tw`text-white`}>Pick Image for {`Image URL ${index + 1}`}</Text>
                </TouchableOpacity>
                {imagePreview[key] && (
                  <View style={styles.imagePreviewContainer}>
                    <Image 
                      source={{ uri: imagePreview[key] }} 
                      style={styles.imagePreview} 
                      resizeMode="cover"
                    />
                    <TouchableOpacity 
                      style={styles.removeImageButton} 
                      onPress={() => removeImage(key)}
                    >
                      <AntDesign name="closecircle" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </>
        );
      case 3:
        return (
          <>
            {renderInput('Venue Type', 'venueType')}
            {renderInput('Capacity', 'capacity', 'numeric')}
            {renderInput('Amenities', 'amenities')}
          </>
        );
      default:
        return null;
    }
  };

  const renderInput = (placeholder, key, keyboardType = 'default') => (
    <View style={tw`mb-4`}>
      <Text style={tw`text-sm text-gray-600 mb-1`}>{placeholder}</Text>
      <TextInput
        placeholder={placeholder}
        value={formData[key]}
        onChangeText={text => setFormData({ ...formData, [key]: text })}
        style={tw`border border-gray-300 rounded p-3`}
        keyboardType={keyboardType}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView style={tw`flex-1`} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={tw`p-4 bg-white flex-grow`}>
        <Text style={tw`text-xl font-bold mb-6`}>Create Venue</Text>
        {renderStepContent(currentStep)}
        <View style={tw`flex-row justify-around mt-6`}>
          {currentStep > 1 && (
            <TouchableOpacity style={styles.navigationButton} onPress={() => setCurrentStep(currentStep - 1)}>
              <AntDesign name="left" size={20} color="white" />
              <Text style={tw`text-white font-semibold ml-2`}>Back</Text>
            </TouchableOpacity>
          )}
          {currentStep < 3 ? (
            <TouchableOpacity style={styles.navigationButton} onPress={() => setCurrentStep(currentStep + 1)}>
              <Text style={tw`text-white font-semibold`}>Next</Text>
              <AntDesign name="right" size={20} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.submitButton} onPress={handleCreateVenue} disabled={loading}>
              {loading ? <ActivityIndicator size="small" color="#ffffff" /> : <AntDesign name="check" size={20} color="white" />}
              <Text style={tw`text-white font-semibold ml-2`}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  imagePickerButton: tw`bg-blue-500 px-4 py-2 p-4 rounded-lg flex-row items-center justify-center`,
  imagePreviewContainer: tw`mt-2 relative`,
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
    removeImageButton: tw`absolute top-2 right-2 bg-white rounded-full p-1`,
  navigationButton: tw`bg-blue-500 px-10 py-2 rounded-full shadow flex-row items-center justify-center`,
  submitButton: tw`bg-purple-700 px-10 py-2 rounded-full shadow flex-row items-center justify-center`
});

export default CreateVenueScreen;
