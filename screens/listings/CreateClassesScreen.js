import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { createClassSession } from '../../redux/slice/listings/classService'; // Import the API call function
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import DateTimePicker from '@react-native-community/datetimepicker'; // Import datetime picker component
import Toast from 'react-native-toast-message';
import { getVenues } from "../../redux/slice/listings/VenueService";
import RNPickerSelect from 'react-native-picker-select';

const CreateClassesScreen = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [venues, setVenues] = useState([]);
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
    templateStatus: '',
    venueId: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false); // State to control the visibility of the date picker
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

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const fetchedVenues = await getVenues(token);
          setVenues(fetchedVenues.map(venue => ({ label: venue.name, value: venue.id })));
        }
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };
    fetchVenues();
  }, []);

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
        venueId: formData.venueId,
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

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={tw` text-lg mb-1`}>Title:</Text>
            <TextInput
              placeholder="Title"
              style={tw`border rounded p-4  border-gray-400 text-lg mb-4`}
              onChangeText={(title) => setFormData({ ...formData, title })}
            />
            <Text style={tw` text-lg mb-1`}>Choose an Image:</Text>
            <TextInput
              placeholder="Poster URL"
              style={tw`border rounded p-2  border-gray-400 text-lg mb-4`}
              onChangeText={(posterUrl) => setFormData({ ...formData, posterUrl })}
            />
            <Text style={tw` text-lg mb-1`}>Description:</Text>
            <TextInput
              placeholder="Description"
              multiline
              style={tw`border rounded p-6  border-gray-400 text-lg mb-6`}
              onChangeText={(description) => setFormData({ ...formData, description })}
            />
            <Text style={tw` text-lg mb-1`}>Duration:</Text>
            <TextInput
              placeholder="Duration"
              style={tw`border rounded p-2  border-gray-400 text-lg mb-4`}
              onChangeText={(duration) => setFormData({ ...formData, duration })}
            />
          </>
        );
      case 2:
        return (
          <>
            <Text style={tw` text-lg mb-1`}>Price:</Text>
            <TextInput
              placeholder="Price"
              keyboardType="numeric"
              style={tw`border rounded p-2 border-gray-400 text-lg mb-4`}
              onChangeText={(price) => setFormData({ ...formData, price })}
            />

            <Text style={tw` text-lg mb-1`}>Capacity:</Text>
            <TextInput
              placeholder="Capacity"
              keyboardType="numeric"
              style={tw`border rounded p-2  border-gray-400 text-lg mb-4`}
              onChangeText={(capacity) => setFormData({ ...formData, capacity })}
            />

            <Text style={tw` text-lg mb-1`}>Date:</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={tw`flex-row items-center mb-4`}>
              <Icon name="calendar" size={20} color="#718096" style={tw`mr-2`} />
              <TextInput
                placeholder="Date"
                value={formData.date.toISOString().split('T')[0]}
                editable={false}
                style={tw`border p-3 mt-2 rounded border-gray-400 text-lg flex-1`}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={formData.date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            {/* <TextInput
              placeholder="Start Time"
              value={formData.startTime}
              onChangeText={(startTime) => setFormData({ ...formData, startTime })}
              style={tw`border rounded p-2  border-gray-400 text-lg mb-4`}
            /> */}

            <Text style={tw` text-lg mb-1`}>Choose a Venue:</Text>
            <TouchableOpacity style={tw` text-lg mb-1 border rounded border-gray-400`}>
            <RNPickerSelect
              onValueChange={(value) => setFormData({ ...formData, venueId: value })}
              items={venues}
              placeholder={{ label: "Select a Venue", value: null }}
              style={tw`border rounded p-4 border-gray-600 text-lg mb-4`}
            />
            </TouchableOpacity>
          </>
        );
      
    }
  };

  return (
    <KeyboardAvoidingView 
      style={tw`flex-1`} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={tw`p-4 bg-gray-50 flex-grow`} >
        <View style={tw`mb-8`}>
          <Text style={tw`text-2xl font-bold text-gray-800 mb-6`}>Create Day Experience!</Text>
          <Text style={tw`text-lg text-gray-600 mb-4`}>Create Your Day Experience with love ☺️</Text>
          {renderStepContent(currentStep)}
        </View>
        <View style={tw`flex-row justify-around mt-6`}>
          {currentStep > 1 && (
            <TouchableOpacity style={styles.navigationButton} onPress={() => setCurrentStep(currentStep - 1)}>
              <Text style={tw`text-white font-semibold p-2`}>Back</Text>
            </TouchableOpacity>
          )}
          {currentStep < 2 ? (
            <TouchableOpacity style={styles.navigationButton} onPress={() => setCurrentStep(currentStep + 1)}>
              <Text style={tw`text-white font-semibold p-2`}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.submitButton} onPress={handleCreateClassSession} disabled={loading}>
              {loading ? <ActivityIndicator size="small" color="#ffffff" /> : <Text style={tw`text-white font-semibold p-2`}>Submit </Text>}
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = {
  navigationButton: tw`bg-blue-500 px-10 py-2 rounded-full shadow flex-row items-center justify-center`,
  submitButton: tw`bg-blue-500 px-10 py-2 rounded-full shadow flex-row items-center justify-center`,
};

export default CreateClassesScreen;
