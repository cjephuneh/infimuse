import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { createPackage } from '../../redux/slice/listings/packagesServices';

const CreatePackageScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
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
    templateStatus: true
  });
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        showToast('error', 'Error', 'Token not found. Please sign in.');
        return;
      }
      const response = await createPackage(formData, token);
      showToast(response.status === 'success' ? 'success' : 'error', 'Success', 'Package created successfully!');
    } catch (error) {
      showToast('error', 'Error', 'An error occurred while creating package.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return renderGeneralInfo();
      case 2:
        return renderDetailsInfo();
      case 3:
        return renderPricingInfo();
      default:
        return <View />;
    }
  };

  const renderGeneralInfo = () => (
    <>
      <TextInput placeholder="Title" value={formData.title} onChangeText={(text) => setFormData({ ...formData, title: text })} style={tw`mb-4 border rounded-lg p-2`} />
      <TextInput placeholder="Description" multiline value={formData.description} onChangeText={(text) => setFormData({ ...formData, description: text })} style={tw`mb-4 border rounded-lg p-2`} />
      <TextInput placeholder="Poster URL" value={formData.posterUrl} onChangeText={(text) => setFormData({ ...formData, posterUrl: text })} style={tw`mb-4 border rounded-lg p-2`} />
    </>
  );

  const renderDetailsInfo = () => (
    <>
      <TextInput placeholder="Duration" value={formData.duration} onChangeText={(text) => setFormData({ ...formData, duration: text })} style={tw`mb-4 border rounded-lg p-2`} />
      <TextInput placeholder="Start Date" value={formData.startDate} onChangeText={(text) => setFormData({ ...formData, startDate: text })} style={tw`mb-4 border rounded-lg p-2`} />
      <TextInput placeholder="End Date" value={formData.endDate} onChangeText={(text) => setFormData({ ...formData, endDate: text })} style={tw`mb-4 border rounded-lg p-2`} />
    </>
  );

  const renderPricingInfo = () => (
    <>
      <TextInput placeholder="Number of Sessions" keyboardType="numeric" value={formData.numberOfSessions} onChangeText={(text) => setFormData({ ...formData, numberOfSessions: text })} style={tw`mb-4 border rounded-lg p-2`} />
      <TextInput placeholder="Capacity" keyboardType="numeric" value={formData.capacity} onChangeText={(text) => setFormData({ ...formData, capacity: text })} style={tw`mb-4 border rounded-lg p-2`} />
      <TextInput placeholder="Price" keyboardType="numeric" value={formData.price} onChangeText={(text) => setFormData({ ...formData, price: text })} style={tw`mb-4 border rounded-lg p-2`} />
    </>
  );

  return (
    <KeyboardAvoidingView style={tw`flex-1 bg-gray-50`} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={tw`p-4`}>
        <Text style={tw`text-xl font-bold mb-6`}>Create Package</Text>
        {renderStepContent(currentStep)}
        <View style={tw`flex-row justify-around mt-4`}>
          {currentStep > 1 && (
            <TouchableOpacity onPress={() => setCurrentStep(currentStep - 1)} style={tw`bg-gray-300 p-3 rounded-md`}>
              <Text style={tw`text-white`}>Back</Text>
            </TouchableOpacity>
          )}
          {currentStep < 3 ? (
            <TouchableOpacity onPress={() => setCurrentStep(currentStep + 1)} style={tw`bg-blue-500 p-3 rounded-md`}>
              <Text style={tw`text-white`}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleCreatePackage} style={tw`bg-green-500 p-3 rounded-md`} disabled={loading}>
              {loading ? <ActivityIndicator color="white" /> : <Text style={tw`text-white`}>Submit</Text>}
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreatePackageScreen;
