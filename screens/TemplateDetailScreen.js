import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getWorkshop, updateWorkshop } from '../redux/slice/listings/workshopService';
import { getClassSession, updateClassSession } from '../redux/slice/listings/classService';
import {getaPackage, updatePackage} from '../redux/slice/listings/packagesServices';

const TemplateDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    posterUrl: '',
    duration: '',
    startDate: '',
    endDate: '',
    capacity: '',
    price: '',
    ageGroup: '',
    ageMin: '',
    ageMax: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { templateType, templateId } = route.params;
        let response;
        switch (templateType) {
          case 'workshops':
            response = await getWorkshop(templateId);
            break;
          case 'classes':
            response = await getClassSession(templateId);
            break;
          case 'packages':
            response = await getaPackage(templateId);
            break;
          default:
            throw new Error('Invalid template type');
        }
        console.log('Fetched details response:', response); // Log the response

        // Update formData state with the fetched data
        setFormData(response.Data);

        // Update template state with the fetched data
        setTemplate(response.Data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching template:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [route.params]);

  const handleUpdateTemplate = async () => {
    try {
      setLoading(true);
      const token = ''; // Retrieve token from AsyncStorage
      if (!token) {
        // Handle token not found
        return;
      }
      const updatedTemplate = { ...template, ...formData };
      let response;
      switch (template) {
        case 'workshops':
          response = await updateWorkshop(updatedTemplate, token);
          break;
        case 'classes':
          response = await updateClassSession(updatedTemplate, token);
          break;
        case 'packages':
          response = await updatePackage(updatedTemplate, token);
          break;
        default:
          throw new Error('Invalid template type');
      }
      if (response && response.status === 'success') {
        // Handle success
        console.log('Template updated successfully');
      } else {
        // Handle error
        console.error('Failed to update template');
      }
    } catch (error) {
      console.error('Error updating template:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!template) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Error fetching template</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={tw`p-4 bg-gray-100 flex-grow`} >
      <View style={tw`mb-8`}>
        <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>Template Details</Text>
        {/* Display template details using TextInputs for editing */}
        <TextInput
          placeholder="Title"
          style={tw`border-b  p-2  border-gray-400 text-lg mb-4`}
          value={formData.title}
          onChangeText={(title) => setFormData({ ...formData, title })}
        />
        <TextInput
          placeholder="Description"
          style={tw`border-b  p-2  border-gray-400 text-lg mb-4`}
          value={formData.description}
          onChangeText={(description) => setFormData({ ...formData, description })}
        />
        <Image
          source={{ uri: formData.posterUrl }}
          style={tw`h-40 w-full mb-4`}
          resizeMode="cover"
        />
        <TextInput
          placeholder="Duration"
          style={tw`border-b  p-2  border-gray-400 text-lg mb-4`}
          value={formData.duration}
          onChangeText={(duration) => setFormData({ ...formData, duration })}
        />
        <TextInput
          placeholder="Start Date"
          style={tw`border-b  p-2  border-gray-400 text-lg mb-4`}
          value={formData.startDate}
          onChangeText={(startDate) => setFormData({ ...formData, startDate })}
        />
        <TextInput
          placeholder="End Date"
          style={tw`border-b  p-2  border-gray-400 text-lg mb-4`}
          value={formData.endDate}
          onChangeText={(endDate) => setFormData({ ...formData, endDate })}
        />
        <TextInput
          placeholder="Capacity"
          style={tw`border-b  p-2  border-gray-400 text-lg mb-4`}
          value={formData.capacity.toString()}
          onChangeText={(capacity) => setFormData({ ...formData, capacity })}
        />
        <TextInput
          placeholder="Price"
          style={tw`border-b  p-2  border-gray-400 text-lg mb-4`}
          value={formData.price.toString()}
          onChangeText={(price) => setFormData({ ...formData, price })}
        />
        <TextInput
          placeholder="Age Group"
          style={tw`border-b  p-2  border-gray-400 text-lg mb-4`}
          value={formData.ageGroup}
          onChangeText={(ageGroup) => setFormData({ ...formData, ageGroup })}
        />
        <TextInput
          placeholder="Minimum Age"
          style={tw`border-b  p-2  border-gray-400 text-lg mb-4`}
          value={formData.ageMin.toString()}
          onChangeText={(ageMin) => setFormData({ ...formData, ageMin })}
        />
        <TextInput
          placeholder="Maximum Age"
          style={tw`border-b  p-2  border-gray-400 text-lg mb-4`}
          value={formData.ageMax.toString()}
          onChangeText={(ageMax) => setFormData({ ...formData, ageMax })}
        />
        {/* Update Template Button */}
        <TouchableOpacity
          style={tw`rounded-lg bg-purple-700 p-3 items-center`}
          onPress={handleUpdateTemplate}
        >
          <Text style={tw`text-white font-semibold text-lg`}>Update Template</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TemplateDetailScreen;
