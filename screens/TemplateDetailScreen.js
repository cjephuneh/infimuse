import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Image, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getWorkshop, updateWorkshop } from '../redux/slice/listings/workshopService';
import { getClassSession, updateClassSession } from '../redux/slice/listings/classService';
import { getExperience, updateExperience } from '../redux/slice/listings/ExperienceService';
import { getVenue, updateVenue } from '../redux/slice/listings/VenueService';
import { getWorkshopClass, updateWorkshopClass } from '../redux/slice/listings/WorkshopClassService';

const TemplateDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const templateType = route.params.templateType;

  const fetchData = async () => {
    try {
      setLoading(true);
      const { templateId } = route.params;
      let response;
      switch (templateType) {
        case 'workshops':
          response = await getWorkshop(templateId);
          break;
        case 'classes':
          response = await getClassSession(templateId);
          break;
        case 'experiences':
          response = await getExperience(templateId);
          break;
        case 'venues':
          response = await getVenue(templateId);
          break;
        case 'workshopClasses':
          response = await getWorkshopClass(templateId);
          break;
        default:
          throw new Error('Invalid template type');
      }
      setFormData(response.Data);
      setTemplate(response.Data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching template:', error);
      setLoading(false);
      Alert.alert('Error', 'Unable to fetch template details.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [route.params]);

  const handleUpdateTemplate = async () => {
    try {
      setLoading(true);
      const token = ''; // Retrieve token from AsyncStorage
      if (!token) {
        Alert.alert('Error', 'Authorization token is missing.');
        return;
      }
      const updatedTemplate = { ...template, ...formData };
      let response;
      switch (templateType) {
        case 'workshops':
          response = await updateWorkshop(updatedTemplate, token);
          break;
        case 'classes':
          response = await updateClassSession(updatedTemplate, token);
          break;
        case 'experiences':
          response = await updateExperience(updatedTemplate, token);
          break;
        case 'venues':
          response = await updateVenue(updatedTemplate, token);
          break;
        case 'workshopClasses':
          response = await updateWorkshopClass(updatedTemplate, token);
          break;
        default:
          throw new Error('Invalid template type');
      }
      if (response && response.status === 'success') {
        Alert.alert('Success', 'Template updated successfully.');
      } else {
        Alert.alert('Error', 'Failed to update template.');
      }
    } catch (error) {
      console.error('Error updating template:', error);
      Alert.alert('Error', 'Error updating template.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-200`}>
        <ActivityIndicator size="large" color="#4B5563" />
        <Text style={tw`mt-4 text-lg text-gray-600`}>Loading...</Text>
      </View>
    );
  }

  if (!template) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-200`}>
        <Text style={tw`text-lg text-red-500`}>Error fetching template.</Text>
        <TouchableOpacity onPress={fetchData} style={tw`mt-4 bg-blue-500 p-2 rounded-lg`}>
          <Text style={tw`text-white`}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={tw`p-4 bg-gray-100 flex-grow`}>
      <View style={tw`flex-row items-center mb-8`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
          <Text style={tw`text-lg font-semibold text-blue-500`}>Back</Text>
        </TouchableOpacity>
        <Text style={tw`text-3xl font-bold text-gray-800`}>{templateType.charAt(0).toUpperCase() + templateType.slice(1)} Details</Text>
      </View>

      <View style={tw`mb-8 p-4 bg-white rounded-lg shadow-md`}>
        {/* Dynamic Form Fields */}
        {templateType === 'workshops' && (
          <>
            <FormInput label="Title" value={formData.title} onChangeText={(text) => setFormData({ ...formData, title: text })} />
            <FormInput label="Description" value={formData.description} onChangeText={(text) => setFormData({ ...formData, description: text })} />
            <ImageInput label="Poster" uri={formData.posterUrl} />
            <FormInput label="Duration" value={formData.duration} onChangeText={(text) => setFormData({ ...formData, duration: text })} />
            <FormInput label="Start Date" value={formData.startDate} onChangeText={(text) => setFormData({ ...formData, startDate: text })} />
            <FormInput label="End Date" value={formData.endDate} onChangeText={(text) => setFormData({ ...formData, endDate: text })} />
            <FormInput label="Capacity" value={formData.capacity} onChangeText={(text) => setFormData({ ...formData, capacity: text })} />
            <FormInput label="Price" value={formData.price} onChangeText={(text) => setFormData({ ...formData, price: text })} />
            <FormInput label="Age Group" value={formData.ageGroup} onChangeText={(text) => setFormData({ ...formData, ageGroup: text })} />
            <FormInput label="Age Min" value={formData.ageMin} onChangeText={(text) => setFormData({ ...formData, ageMin: text })} />
            <FormInput label="Age Max" value={formData.ageMax} onChangeText={(text) => setFormData({ ...formData, ageMax: text })} />
          </>
        )}
        {templateType === 'classes' && (
          <>
            <FormInput label="Title" value={formData.title} onChangeText={(text) => setFormData({ ...formData, title: text })} />
            <FormInput label="Description" value={formData.description} onChangeText={(text) => setFormData({ ...formData, description: text })} />
            <ImageInput label="Poster" uri={formData.posterUrl} />
            <FormInput label="Date" value={formData.date} onChangeText={(text) => setFormData({ ...formData, date: text })} />
            <FormInput label="Start Time" value={formData.startTime} onChangeText={(text) => setFormData({ ...formData, startTime: text })} />
            <FormInput label="End Time" value={formData.endTime} onChangeText={(text) => setFormData({ ...formData, endTime: text })} />
            <FormInput label="Start Date" value={formData.startDate} onChangeText={(text) => setFormData({ ...formData, startDate: text })} />
            <FormInput label="End Date" value={formData.endDate} onChangeText={(text) => setFormData({ ...formData, endDate: text })} />
            <FormInput label="Capacity" value={formData.capacity} onChangeText={(text) => setFormData({ ...formData, capacity: text })} />
            <FormInput label="Price" value={formData.price} onChangeText={(text) => setFormData({ ...formData, price: text })} />
            <FormInput label="Age Group" value={formData.ageGroup} onChangeText={(text) => setFormData({ ...formData, ageGroup: text })} />
            <FormInput label="Age Min" value={formData.ageMin} onChangeText={(text) => setFormData({ ...formData, ageMin: text })} />
            <FormInput label="Age Max" value={formData.ageMax} onChangeText={(text) => setFormData({ ...formData, ageMax: text })} />
          </>
        )}
        {templateType === 'experiences' && (
          <>
            <FormInput label="Title" value={formData.title} onChangeText={(text) => setFormData({ ...formData, title: text })} />
            <FormInput label="Description" value={formData.description} onChangeText={(text) => setFormData({ ...formData, description: text })} />
            <ImageInput label="Poster" uri={formData.posterUrl} />
            <FormInput label="Date" value={formData.date} onChangeText={(text) => setFormData({ ...formData, date: text })} />
            <FormInput label="Start Time" value={formData.startTime} onChangeText={(text) => setFormData({ ...formData, startTime: text })} />
            <FormInput label="End Time" value={formData.endTime} onChangeText={(text) => setFormData({ ...formData, endTime: text })} />
            <FormInput label="Capacity" value={formData.capacity} onChangeText={(text) => setFormData({ ...formData, capacity: text })} />
            <FormInput label="Price" value={formData.price} onChangeText={(text) => setFormData({ ...formData, price: text })} />
            <FormInput label="Age Group" value={formData.ageGroup} onChangeText={(text) => setFormData({ ...formData, ageGroup: text })} />
            <FormInput label="Age Min" value={formData.ageMin} onChangeText={(text) => setFormData({ ...formData, ageMin: text })} />
            <FormInput label="Age Max" value={formData.ageMax} onChangeText={(text) => setFormData({ ...formData, ageMax: text })} />
          </>
        )}
        {templateType === 'venues' && (
          <>
            <FormInput label="Title" value={formData.title} onChangeText={(text) => setFormData({ ...formData, title: text })} />
            <FormInput label="Description" value={formData.description} onChangeText={(text) => setFormData({ ...formData, description: text })} />
            <ImageInput label="Poster" uri={formData.posterUrl} />
            <FormInput label="Location" value={formData.location} onChangeText={(text) => setFormData({ ...formData, location: text })} />
            <FormInput label="Capacity" value={formData.capacity} onChangeText={(text) => setFormData({ ...formData, capacity: text })} />
            <FormInput label="Price" value={formData.price} onChangeText={(text) => setFormData({ ...formData, price: text })} />
          </>
        )}
        {templateType === 'workshopClasses' && (
          <>
            <FormInput label="Title" value={formData.title} onChangeText={(text) => setFormData({ ...formData, title: text })} />
            <FormInput label="Description" value={formData.description} onChangeText={(text) => setFormData({ ...formData, description: text })} />
            <ImageInput label="Poster" uri={formData.posterUrl} />
            <FormInput label="Date" value={formData.date} onChangeText={(text) => setFormData({ ...formData, date: text })} />
            <FormInput label="Start Time" value={formData.startTime} onChangeText={(text) => setFormData({ ...formData, startTime: text })} />
            <FormInput label="End Time" value={formData.endTime} onChangeText={(text) => setFormData({ ...formData, endTime: text })} />
            <FormInput label="Capacity" value={formData.capacity} onChangeText={(text) => setFormData({ ...formData, capacity: text })} />
            <FormInput label="Price" value={formData.price} onChangeText={(text) => setFormData({ ...formData, price: text })} />
            <FormInput label="Age Group" value={formData.ageGroup} onChangeText={(text) => setFormData({ ...formData, ageGroup: text })} />
            <FormInput label="Age Min" value={formData.ageMin} onChangeText={(text) => setFormData({ ...formData, ageMin: text })} />
            <FormInput label="Age Max" value={formData.ageMax} onChangeText={(text) => setFormData({ ...formData, ageMax: text })} />
          </>
        )}
      </View>

      <TouchableOpacity
        style={tw`bg-blue-500 p-3 rounded-lg shadow-md flex-row justify-center`}
        onPress={handleUpdateTemplate}
      >
        <Text style={tw`text-white text-lg font-semibold`}>Update {templateType.charAt(0).toUpperCase() + templateType.slice(1)}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const FormInput = ({ label, value, onChangeText }) => (
  <View style={tw`mb-4`}>
    <Text style={tw`mb-2 text-lg font-semibold text-gray-800`}>{label}</Text>
    <TextInput
      style={tw`border border-gray-300 rounded-lg p-2 text-lg`}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const ImageInput = ({ label, uri }) => (
  <View style={tw`mb-4`}>
    <Text style={tw`mb-2 text-lg font-semibold text-gray-800`}>{label}</Text>
    <Image
      source={{ uri }}
      style={tw`w-full h-40 border border-gray-300 rounded-lg`}
      resizeMode="cover"
    />
  </View>
);

export default TemplateDetailScreen;
