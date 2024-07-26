import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, TextInput } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { getWorkshop, updateWorkshop } from '../redux/slice/listings/workshopService';
import { getClassSession, updateClassSession } from '../redux/slice/listings/classService';
import {getaPackage, updatePackage} from '../redux/slice/listings/packagesServices';


const ScheduleScreen = () => {
  const [templates, setTemplates] = useState([]); // State to store available templates
  const [selectedTemplate, setSelectedTemplate] = useState(null); // State to store the selected template
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    // Fetch available templates when the component mounts
    fetchAvailableTemplates();
  }, []);

  // Function to fetch available templates
  const fetchAvailableTemplates = async () => {
    try {
      // Call your API function to fetch available templates
      const workshopData = await getWorkshop('workshopId', 'token');
      const classData = await getClassSession('classId', 'token');
      const packageData = await getaPackage('packageId', 'token');
  
      // Log the response for each template
      console.log('Workshop data:', workshopData);
      console.log('Class data:', classData);
      console.log('Package data:', packageData);
  
      // Update the templates state with the fetched data
      setTemplates([workshopData, classData, packageData]);
    } catch (error) {
      console.error('Error fetching available templates:', error);
    }
  };
  

  // Function to update the selected template
  const selectTemplate = (template) => {
    setSelectedTemplate(template);
  };

  // Function to update the start time
  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  // Function to update the end time
  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

  // Function to update the date
  const handleDateChange = (date) => {
    setDate(date);
  };

  // Function to schedule the listing with updated attributes
  const scheduleListing = async () => {
    try {
      if (!selectedTemplate || !startTime || !endTime || !date) {
        // Handle validation errors
        return;
      }

      // Update the selected template attributes
      const updatedTemplate = { ...selectedTemplate, startTime, endTime, date };

      // Call the appropriate API function to update the template
      let response;
      switch (selectedTemplate.type) {
        case 'workshop':
          response = await updateWorkshop(updatedTemplate, 'token');
          break;
        case 'class':
          response = await updateClassSession(updatedTemplate, 'token');
          break;
        case 'package':
          response = await updatePackage(updatedTemplate, 'token');
          break;
        default:
          throw new Error('Invalid template type');
      }

      // Handle response and navigate to success screen if needed
      console.log('Template updated successfully:', response);

    } catch (error) {
      console.error('Error scheduling listing:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={tw`p-4 bg-white flex-grow`}>
      <View style={tw`mb-8`}>
        <Text style={tw`text-2xl font-bold text-white mb-4`}>Schedule a Listing</Text>
        {/* Render available templates */}
        {templates.map((template) => (
          <TouchableOpacity
            key={template.id}
            style={tw`bg-gray-800 p-4 rounded-lg mb-4`}
            onPress={() => selectTemplate(template)}
          >
            <Text style={tw`text-lg text-white`}>{template.title}</Text>
            <Text style={tw`text-sm text-gray-400`}>{template.description}</Text>
          </TouchableOpacity>
        ))}

        {/* Time picker for start time */}
        <TextInput
          placeholder="Start Time"
          style={tw`border-b  p-2  border-gray-400 text-lg mb-4 text-white`}
          value={startTime}
          onChangeText={handleStartTimeChange}
        />

        {/* Time picker for end time */}
        <TextInput
          placeholder="End Time"
          style={tw`border-b  p-2  border-gray-400 text-lg mb-4 text-white`}
          value={endTime}
          onChangeText={handleEndTimeChange}
        />

        {/* Date picker */}
        <TextInput
          placeholder="Date"
          style={tw`border-b  p-2  border-gray-400 text-lg mb-4 text-white`}
          value={date}
          onChangeText={handleDateChange}
        />

        {/* Schedule button */}
        <TouchableOpacity
          style={tw`bg-purple-700 p-3 rounded-lg items-center`}
          onPress={scheduleListing}
        >
          <Text style={tw`text-white font-semibold text-lg`}>Schedule Listing</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ScheduleScreen;
