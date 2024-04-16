import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { createClassSession } from '../../redux/slice/listings/classService'; // Import the API call function
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import DateTimePicker from '@react-native-community/datetimepicker'; // Import datetime picker component
import Toast from 'react-native-toast-message';

const CreateClassesScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    posterUrl: '',
    duration: '',
    capacity: '',
    startTime: '',
    endTime: '',
    date: new Date(),
    price: '',
    capacityStatus: '',
    ageGroup: '',
    ageMin: '',
    ageMax: '',
    templateStatus: ''
  });

  const [showDatePicker, setShowDatePicker] = useState(false); // State to control the visibility of the date picker
  const [loading, setLoading] = useState(false); // State to indicate loading state

  const showToast = (type, text1, text2) => {
    // Your implementation of showToast
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.date;
    setShowDatePicker(Platform.OS === 'ios'); // Close date picker on iOS
    setFormData({ ...formData, date: currentDate });
  };

  const handleCreateClassSession = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        showToast('error', 'Error', 'Token not found. Please sign in.');
        return;
      }

      setLoading(true); // Set loading to true when creating class session

      const classData = {
        title: formData.title,
        description: formData.description,
        posterUrl: formData.posterUrl,
        capacity: formData.capacity,
        duration: formData.duration,
        price: formData.price,
        ageGroup: formData.ageGroup,
        ageMin: formData.ageMin,
        ageMax: formData.ageMax,
        date: formData.date.toISOString().split('T')[0],
        startTime: formData.startTime,
        endTime: formData.endTime,
        templateStatus: false // Initialize templateStatus as false
      };

      console.log('Creating class session...', classData);
      const response = await createClassSession(classData, token);

      if (response && response.status === 'success') {
        showToast('success', 'Success', 'Class session created successfully!');
        navigation.navigate('CreateClassesSuccessScreen'); // Navigate to success screen
      } else {
        showToast('error', 'Error', 'Failed to create class session. Please try again.');
      }
    } catch (error) {
      showToast('error', 'Error', 'An error occurred while creating class session. Please try again.');
      console.error('Error creating class session:', error);
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
          <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>Create Class Session</Text>
          {/* TextInput fields */}
          <TextInput placeholder="Title" style={tw`border rounded p-2  border-gray-400 text-lg mb-4`} onChangeText={(title) => setFormData({ ...formData, title })} />
          {/* Description */}
          <TextInput
            placeholder="Description"
            multiline
            style={tw`border rounded p-2  border-gray-400 text-lg mb-4`}
            onChangeText={(description) => setFormData({ ...formData, description })}
          />
          {/* Poster URL */}
          <TextInput placeholder="Poster URL" style={tw`border rounded p-2  border-gray-400 text-lg mb-4`} onChangeText={(posterUrl) => setFormData({ ...formData, posterUrl })} />
            {/* Date picker */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={tw`flex-row items-center mb-4`}>
            <Icon name="calendar" size={20} color="#718096" style={tw`mr-2`} />
            <TextInput placeholder="Date" value={formData.date.toISOString().split('T')[0]} editable={false} style={tw`border-b border-gray-400 text-lg flex-1`} />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          {/* Start time */}
          <TextInput
            placeholder="Start Time"
            value={formData.startTime}
            onChangeText={(startTime) => setFormData({ ...formData, startTime })}
            style={tw`border rounded p-2  border-gray-400 text-lg mb-4`}
          />
          {/* End time */}
          <TextInput
            placeholder="End Time"
            value={formData.endTime}
            onChangeText={(endTime) => setFormData({ ...formData, endTime })}
            style={tw`border rounded p-2  border-gray-400 text-lg mb-4`}
          />
          {/* Duration */}
          <TextInput placeholder="Duration"  style={tw`border rounded p-2  border-gray-400 text-lg mb-4`} onChangeText={(duration) => setFormData({ ...formData, duration })} />
          {/* Price */}
          <TextInput placeholder="Price" keyboardType="numeric" style={tw`border rounded p-2 border-gray-400 text-lg mb-4`} onChangeText={(price) => setFormData({ ...formData, price })} />
          {/* Capacity */}
          <TextInput placeholder="Capacity" keyboardType="numeric" style={tw`border rounded p-2  border-gray-400 text-lg mb-4`} onChangeText={(capacity) => setFormData({ ...formData, capacity })} />
          {/* Age group */}
          <TextInput placeholder="Age Group" style={tw`border rounded p-2  border-gray-400 text-lg mb-4`} onChangeText={(ageGroup) => setFormData({ ...formData, ageGroup })} />
          {/* Age min */}
          <TextInput placeholder="Age Min" keyboardType="numeric" style={tw`border rounded p-2  border-gray-400 text-lg mb-4`} onChangeText={(ageMin) => setFormData({ ...formData, ageMin })} />
          {/* Age max */}
          <TextInput placeholder="Age Max" keyboardType="numeric" style={tw`border rounded p-2  border-gray-400 text-lg mb-4`} onChangeText={(ageMax) => setFormData({ ...formData, ageMax })} />
        </View>
        {/* Create Class Session button with loading indicator */}
        <TouchableOpacity style={tw`rounded-lg bg-purple-700 p-3 items-center`} onPress={handleCreateClassSession} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={tw`text-white font-semibold text-lg`}>Create Class Session</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </KeyboardAvoidingView>
  );
};

export default CreateClassesScreen;
