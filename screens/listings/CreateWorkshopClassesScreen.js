import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createWorkshop } from '../../redux/slice/listings/workshopService';
import { createWorkshopClass } from '../../redux/slice/listings/WorkshopClassService';

const CreateWorkshopScreen = () => {
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
  const [classData, setClassData] = useState([
    { title: '', description: '', startTime: '', endTime: '', date: '' },
    { title: '', description: '', startTime: '', endTime: '', date: '' }
  ]);

  const handleNext = async () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        
        // Step 1: Create the Workshop
        const workshopResponse = await createWorkshop(formData, token);
  
        if (workshopResponse && workshopResponse.id) {
          // Extract the workshop ID from the response
          const workshopId = workshopResponse.id;
  
          // Step 2: Create Workshop Classes
          for (const cls of classData) {
            // Add the workshopId to each class object
            await createWorkshopClass({ ...cls, workshopId: workshopId });
          }
  
          // Navigate to the success screen or any other appropriate action
          navigation.navigate('CreateWorkshopSuccessScreen');
        } else {
          throw new Error("Workshop ID not found");
        }
      } catch (error) {
        Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to create workshop or classes. Please try again.' });
      } finally {
        setLoading(false);
      }
    }
  };
  

  const renderInput = (placeholder, key, value, onChangeText, keyboardType = 'default') => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{placeholder}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.inputField}
        keyboardType={keyboardType}
      />
    </View>
  );

  const renderStepContent = (step) => {
    if (step === 1) {
      return (
        <>
          {renderInput('Title', 'title', formData.title, text => setFormData({ ...formData, title: text }))}
          {renderInput('Description', 'description', formData.description, text => setFormData({ ...formData, description: text }))}
          {renderInput('Poster URL', 'posterUrl', formData.posterUrl, text => setFormData({ ...formData, posterUrl: text }))}
          {renderInput('Duration', 'duration', formData.duration, text => setFormData({ ...formData, duration: text }))}
          {renderInput('Capacity', 'capacity', formData.capacity, text => setFormData({ ...formData, capacity: text }), 'numeric')}
          {renderInput('Price', 'price', formData.price, text => setFormData({ ...formData, price: text }), 'numeric')}
          {renderInput('Age Group', 'ageGroup', formData.ageGroup, text => setFormData({ ...formData, ageGroup: text }))}
          {renderInput('Age Min', 'ageMin', formData.ageMin, text => setFormData({ ...formData, ageMin: text }), 'numeric')}
          {renderInput('Age Max', 'ageMax', formData.ageMax, text => setFormData({ ...formData, ageMax: text }), 'numeric')}
        </>
      );
    } else if (step === 2) {
      return (
        <>
          {classData.map((cls, index) => (
            <View key={index} style={styles.classContainer}>
              <Text style={styles.classTitle}>Class {index + 1}</Text>
              {renderInput('Class Topic', 'title', cls.title, text => {
                const updatedClassData = [...classData];
                updatedClassData[index].title = text;
                setClassData(updatedClassData);
              })}
              {renderInput('Description', 'description', cls.description, text => {
                const updatedClassData = [...classData];
                updatedClassData[index].description = text;
                setClassData(updatedClassData);
              })}
              {renderInput('Start Time', 'startTime', cls.startTime, text => {
                const updatedClassData = [...classData];
                updatedClassData[index].startTime = text;
                setClassData(updatedClassData);
              })}
              {renderInput('End Time', 'endTime', cls.endTime, text => {
                const updatedClassData = [...classData];
                updatedClassData[index].endTime = text;
                setClassData(updatedClassData);
              })}
              {renderInput('Date', 'date', cls.date, text => {
                const updatedClassData = [...classData];
                updatedClassData[index].date = text;
                setClassData(updatedClassData);
              })}
            </View>
          ))}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setClassData([...classData, { title: '', description: '', startTime: '', endTime: '', date: '' }])}
          >
            <Text style={styles.addButtonText}>Add Another Class</Text>
          </TouchableOpacity>
        </>
      );
    }
    return null;
  };

  return (
    <KeyboardAvoidingView style={tw`flex-1`} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={tw`p-4 bg-white flex-grow`}>
        <Text style={styles.headerText}>{currentStep === 1 ? 'Create Workshop' : 'Create Workshop Classes'}</Text>
        {renderStepContent(currentStep)}
        <View style={tw`flex-row justify-around mt-6`}>
          {currentStep > 1 && (
            <TouchableOpacity style={styles.navigationButton} onPress={() => setCurrentStep(currentStep - 1)}>
              <AntDesign name="left" size={20} color="white" />
              <Text style={styles.navigationButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.navigationButton} onPress={handleNext} disabled={loading}>
            {loading ? <ActivityIndicator size="small" color="#ffffff" /> : <AntDesign name="right" size={20} color="white" />}
            <Text style={styles.navigationButtonText}>{currentStep === 1 ? 'Next' : 'Submit'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  headerText: tw`text-2xl font-bold mb-6`,
  inputContainer: tw`mb-4`,
  inputLabel: tw`text-sm text-gray-600 mb-1`,
  inputField: tw`border border-gray-300 rounded p-3`,
  classContainer: tw`mb-8 p-4 border border-gray-300 rounded`,
  classTitle: tw`text-xl font-bold mb-4`,
  addButton: tw`rounded-lg bg-purple-700 p-3 items-center mb-4`,
  addButtonText: tw`text-white font-semibold text-lg`,
  navigationButton: tw`bg-blue-500 px-10 py-2 rounded-full shadow flex-row items-center justify-center`,
  navigationButtonText: tw`text-white font-semibold ml-2`,
});

export default CreateWorkshopScreen;
