import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { createExperience } from '../../redux/slice/listings/ExperienceService';

const CreateExperienceScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
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
  const [loading, setLoading] = useState(false);

  const handleCreateExperience = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Toast.show({ type: 'error', text1: 'Error', text2: 'Token not found. Please sign in.' });
        return;
      }
      const response = await createExperience(formData, token);
      Toast.show({ type: response.status === 'success' ? 'success' : 'error', text1: 'Success', text2: 'Experience created successfully!' });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return renderBasicInfo();
      case 2:
        return renderDetails();
      case 3:
        return renderFinalDetails();
      default:
        return <View />;
    }
  };

  const renderBasicInfo = () => (
    <>
      <TextInput placeholder="Title" value={formData.title} onChangeText={(text) => setFormData({ ...formData, title: text })} style={tw`mb-4 border-b border-gray-300 p-2`} />
      <TextInput placeholder="Description" multiline value={formData.description} onChangeText={(text) => setFormData({ ...formData, description: text })} style={tw`mb-4 border-b border-gray-300 p-2`} />
      <TextInput placeholder="Poster URL" value={formData.posterUrl} onChangeText={(text) => setFormData({ ...formData, posterUrl: text })} style={tw`mb-4 border-b border-gray-300 p-2`} />
    </>
  );

  const renderDetails = () => (
    <>
      <TextInput placeholder="Duration" value={formData.duration} onChangeText={(text) => setFormData({ ...formData, duration: text })} style={tw`mb-4 border-b border-gray-300 p-2`} />
      <TextInput placeholder="Capacity" keyboardType="numeric" value={formData.capacity} onChangeText={(text) => setFormData({ ...formData, capacity: text })} style={tw`mb-4 border-b border-gray-300 p-2`} />
      <TextInput placeholder="Start Time" value={formData.startTime} onChangeText={(text) => setFormData({ ...formData, startTime: text })} style={tw`mb-4 border-b border-gray-300 p-2`} />
      <TextInput placeholder="End Time" value={formData.endTime} onChangeText={(text) => setFormData({ ...formData, endTime: text })} style={tw`mb-4 border-b border-gray-300 p-2`} />
    </>
  );

  const renderFinalDetails = () => (
    <>
      <TextInput placeholder="Date" value={formData.date} onChangeText={(text) => setFormData({ ...formData, date: text })} style={tw`mb-4 border-b border-gray-300 p-2`} />
      <TextInput placeholder="Price" keyboardType="numeric" value={formData.price} onChangeText={(text) => setFormData({ ...formData, price: text })} style={tw`mb-4 border-b border-gray-300 p-2`} />
      <TextInput placeholder="Age Group" value={formData.ageGroup} onChangeText={(text) => setFormData({ ...formData, ageGroup: text })} style={tw`mb-4 border-b border-gray-300 p-2`} />
      <TextInput placeholder="Age Min" keyboardType="numeric" value={formData.ageMin} onChangeText={(text) => setFormData({ ...formData, ageMin: text })} style={tw`mb-4 border-b border-gray-300 p-2`} />
      <TextInput placeholder="Age Max" keyboardType="numeric" value={formData.ageMax} onChangeText={(text) => setFormData({ ...formData, ageMax: text })} style={tw`mb-4 border-b border-gray-300 p-2`} />
    </>
  );

  return (
    <KeyboardAvoidingView style={tw`flex-1 bg-gray-50`} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={tw`p-4`}>
        <Text style={tw`text-xl font-bold mb-6`}>Create Experience</Text>
        {renderStepContent(currentStep)}
        <View style={tw`flex-row justify-between mt-6`}>
          {currentStep > 1 && (
            <TouchableOpacity onPress={() => setCurrentStep(currentStep - 1)} style={tw`bg-blue-500 px-5 py-2 rounded-md`}>
              <Text style={tw`text-white text-lg`}>Back</Text>
            </TouchableOpacity>
          )}
          {currentStep < 3 ? (
            <TouchableOpacity onPress={() => setCurrentStep(currentStep + 1)} style={tw`bg-green-500 px-5 py-2 rounded-md`}>
              <Text style={tw`text-white text-lg`}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleCreateExperience} disabled={loading} style={tw`bg-purple-700 px-5 py-2 rounded-md flex-row items-center justify-center`}>
              {loading && <ActivityIndicator color="#ffffff" />}
              <Text style={tw`text-white text-lg ml-2`}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateExperienceScreen;
