import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image, ActivityIndicator, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons'; // Importing icon

// Simulate uploading and getting URL (in real scenario, you'd upload the image and get a URL back)
const uploadImageAndGetURL = async (imageUri) => {
  const simulatedURL = 'https://simulated.url/' + encodeURIComponent(imageUri);
  return simulatedURL;
};

const Tag = ({ label, onPress, selected }) => (
  <TouchableOpacity onPress={onPress} style={[styles.tag, selected ? styles.tagSelected : null]}>
    <Text style={styles.tagText}>{label}</Text>
  </TouchableOpacity>
);

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
    amenities: [],
    noiseLevel: '',
    parking: false,
    additionalInfo: '',
    rules: '',
    hostId: ''
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState({ imageUrl1: null, imageUrl2: null, imageUrl3: null });
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const pickImage = async (imageKey) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const uploadedUrl = await uploadImageAndGetURL(result.uri);
      setImagePreview({ ...imagePreview, [imageKey]: result.uri });
      setFormData({ ...formData, [imageKey]: uploadedUrl });
    }
  };

  const toggleAmenity = (amenity) => {
    const currentIndex = selectedAmenities.indexOf(amenity);
    const newSelectedAmenities = [...selectedAmenities];

    if (currentIndex === -1) {
      newSelectedAmenities.push(amenity);
    } else {
      newSelectedAmenities.splice(currentIndex, 1);
    }

    setSelectedAmenities(newSelectedAmenities);
    setFormData({ ...formData, amenities: newSelectedAmenities });
  };

  const handleCreateVenue = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await createVenue(formData, token);
      Toast.show({ type: response.status === 'success' ? 'success' : 'error', text1: response.status === 'success' ? 'Success' : 'Error', text2: response.message || 'Action completed.' });
      setCurrentStep(1); // Reset to first step after submission
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
            <Text style={tw`text-xl font-semibold mb-2`}>Accessibility</Text>
            <View style={tw`flex-row border rounded border-gray-200 p-4 `}>
              <Tag label="Accessible" onPress={() => setFormData({ ...formData, accessibility: 'Accessible' })} selected={formData.accessibility === 'Accessible'} />
              <Tag label="Not Accessible" onPress={() => setFormData({ ...formData, accessibility: 'Not Accessible' })} selected={formData.accessibility === 'Not Accessible'} />
            </View>
            <Text style={tw`text-xl font-semibold mb-2`}>Parking</Text>
          <View style={tw`flex-row border rounded border-gray-200 p-4 `}>
            <Tag label="Yes" onPress={() => setFormData({ ...formData, parking: true })} selected={formData.parking === true} />
            <Tag label="No" onPress={() => setFormData({ ...formData, parking: false })} selected={formData.parking === false} />
          </View>
          </>
        );
      case 2:
        return (
          <>
            <Text style={tw`text-xl font-semibold `}>Noise Level</Text>
            <View style={tw`flex-row border rounded border-gray-200 p-4 mb-4 `}>
              {['Silent', 'Medium', 'Loud'].map(level => (
                <Tag key={level} label={level} onPress={() => setFormData({ ...formData, noiseLevel: level })} selected={formData.noiseLevel === level} />
              ))}
            </View>
            {['imageUrl1', 'imageUrl2', 'imageUrl3'].map((key, index) => (
              <View key={index} style={tw`mb-6 p-4`}>
                <TouchableOpacity onPress={() => pickImage(key)} style={styles.imagePickerButton}>
                  <Text style={tw`text-white p-2`}>Pick Image for {`${index + 1}`}</Text>
                </TouchableOpacity>
                {imagePreview[key] && (
                  <View style={styles.imagePreviewContainer}>
                    <Image source={{ uri: imagePreview[key] }} style={styles.imagePreview} resizeMode="cover" />
                    <TouchableOpacity style={styles.removeImageButton} onPress={() => removeImage(key)}>
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
            {/* {renderInput('Venue Type', 'venueType')} */}
            {renderInput('Capacity', 'capacity', 'numeric')}
            <Text style={tw`text-xl font-semibold mb-2`}>Amenities</Text>
            <View style={tw`flex-row flex-wrap border rounded border-gray-200 p-4 mb-2 `}>
              {['WiFi', 'Parking', 'Water'].map(amenity => (
                <Tag key={amenity} label={amenity} onPress={() => toggleAmenity(amenity)} selected={selectedAmenities.includes(amenity)} />
              ))}
            </View>
            {renderInput('Additional Info', 'additionalInfo')}
          {renderInput('Rules', 'rules')}
            
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
        <Text style={tw`text-xl font-bold mb-6 mt-5 `}>Create Venue</Text>
        <Text style={tw`text-gray-600 mb-2`}>Create your Venue Now! ☺️</Text>
        {renderStepContent(currentStep)}
        <View style={tw`flex-row justify-around mt-6`}>
          {currentStep > 1 && (
            <TouchableOpacity style={styles.navigationButton} onPress={() => setCurrentStep(currentStep - 1)}>
              {/* <AntDesign name="left" size={20} color="white" /> */}
              <Text style={tw`text-white font-semibold ml-2 p-1`}>Back</Text>
            </TouchableOpacity>
          )}
          {currentStep < 3 ? (
            <TouchableOpacity style={styles.navigationButton} onPress={() => setCurrentStep(currentStep + 1)}>
              <Text style={tw`text-white font-semibold p-2`}>Next</Text>
              {/* <AntDesign name="right" size={20} color="white" /> */}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.submitButton} onPress={handleCreateVenue} disabled={loading}>
              {loading ? <ActivityIndicator size="small" color="#ffffff" /> : <AntDesign name="check" size={20} color="white" />}
              <Text style={tw`text-white font-semibold ml-2 p-2`}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  imagePickerButton: tw`bg-blue-500 px-4 py-2 rounded-lg flex-row items-center justify-center`,
  imagePreviewContainer: tw`mt-2 relative`,
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  removeImageButton: tw`absolute top-2 right-2 bg-white rounded-full p-1`,
  navigationButton: tw`bg-blue-500 px-10 py-2 rounded-full shadow flex-row items-center justify-center`,
  submitButton: tw`bg-blue-500 px-10 py-2 rounded-full shadow flex-row items-center justify-center`,
  tag: tw`m-1 bg-gray-200 px-3 py-1 rounded-full`,
  tagSelected: tw`bg-blue-500`,
  tagText: tw`text-white`
});

export default CreateVenueScreen;
