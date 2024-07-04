import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createWorkshop } from '../../redux/slice/listings/workshopService';

const CreateWorkshopDetailsScreen = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
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

  const handleNext = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        const workshopResponse = await createWorkshop(formData, token);

        if (workshopResponse && workshopResponse.id) {
          navigation.navigate('CreateWorkshopClassesScreen', { workshopId: workshopResponse.id });
        } else {
          throw new Error("Workshop ID not found");
        }
      } catch (error) {
        Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to create workshop. Please try again.' });
      } finally {
        setLoading(false);
      }
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

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <>
            {renderInput('Title', 'title')}
            {renderInput('Description', 'description')}
            {renderInput('Poster URL', 'posterUrl')}
          </>
        );
      case 2:
        return (
          <>
            {renderInput('Duration', 'duration')}
            {renderInput('Capacity', 'capacity', 'numeric')}
            {renderInput('Price', 'price', 'numeric')}
          </>
        );
      case 3:
        return (
          <>
            {renderInput('Age Group', 'ageGroup')}
            {renderInput('Age Min', 'ageMin', 'numeric')}
            {renderInput('Age Max', 'ageMax', 'numeric')}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView style={tw`flex-1`} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={tw`p-4 bg-white flex-grow`}>
        <Text style={tw`text-2xl font-bold mb-6`}>Create Workshop</Text>
        {renderStepContent(currentStep)}
        <View style={tw`flex-row justify-around mt-6`}>
          {currentStep > 1 && (
            <TouchableOpacity style={styles.navigationButton} onPress={() => setCurrentStep(currentStep - 1)}>
              <AntDesign name="left" size={20} color="white" />
              <Text style={tw`text-white font-semibold ml-2`}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.navigationButton} onPress={handleNext} disabled={loading}>
            {loading ? <ActivityIndicator size="small" color="#ffffff" /> : <AntDesign name="right" size={20} color="white" />}
            <Text style={tw`text-white font-semibold ml-2`}>{currentStep < 3 ? 'Next' : 'Submit'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  navigationButton: tw`bg-blue-500 px-10 py-2 rounded-full shadow flex-row items-center justify-center`,
});

export default CreateWorkshopDetailsScreen;
