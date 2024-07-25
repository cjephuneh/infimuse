import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Image, Alert, FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from "react-native-toast-message";
import Modal from 'react-native-modal';
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
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteFirstName, setInviteFirstName] = useState('');
  const [availableStaff, setAvailableStaff] = useState([]);
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
    fetchAvailableStaff();
  }, [route.params]);

  const fetchAvailableStaff = async () => {
    try {
      const staffList = await fetchStaffMembers();
      setAvailableStaff(staffList); // Directly set the fetched staff list
    } catch (error) {
      console.error('Error fetching staff members:', error);
    }
  };

   const fetchStaffMembers = async () => {
    try {
      const response = await fetch(`https://whatever.lat/api/v1/staffs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include other headers as required, e.g., Authorization for token
        }
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error('Failed to fetch staff: ' + (json.error || 'Unknown Error'));
      }
      return json.Document; // Correctly accessing the array within the 'Document' key
    } catch (error) {
      console.error('Failed to fetch staff:', error);
      throw error;
    }
  };


  const inviteStaff = async () => {
    try {
      // Your existing code to send the invitation
      await fetch('https://whatever.lat/api/v1/hosts/invite-staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization headers if needed
        },
        body: JSON.stringify({
          firstName: inviteFirstName,
          email: inviteEmail,
        }),
      });
  
      // Show success toast
      Toast.show({
        type: 'success',
        position: 'center',
        text1: 'Success',
        text2: 'Staff invited successfully!',
      });
    } catch (error) {
      console.error('Failed to invite staff:', error);
      Toast.show({
        type: 'error',
        position: 'center',
        text1: 'Error',
        text2: 'Failed to invite staff. Please try again.',
      });
    } finally {
      closeDrawer();
    }
  };
  
  

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

  const openDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setInviteEmail('');
    setInviteFirstName('');
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
            <FormInput label="Location" value={formData.location} onChangeText={(text) => setFormData({ ...formData, location: text })} />
            <FormInput label="Price" value={formData.price} onChangeText={(text) => setFormData({ ...formData, price: text })} />
          </>
        )}
        {templateType === 'experiences' && (
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
            <FormInput label="Start Date" value={formData.startDate} onChangeText={(text) => setFormData({ ...formData, startDate: text })} />
            <FormInput label="End Date" value={formData.endDate} onChangeText={(text) => setFormData({ ...formData, endDate: text })} />
            <FormInput label="Capacity" value={formData.capacity} onChangeText={(text) => setFormData({ ...formData, capacity: text })} />
            <FormInput label="Price" value={formData.price} onChangeText={(text) => setFormData({ ...formData, price: text })} />
          </>
        )}

        <TouchableOpacity onPress={handleUpdateTemplate} style={tw`bg-green-500 p-4 rounded-lg mt-4`}>
          <Text style={tw`text-white text-lg font-semibold text-center`}>Update</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={openDrawer} style={tw`bg-blue-500 p-4 rounded-lg mb-4`}>
        <Text style={tw`text-white text-lg font-semibold text-center`}>Manage Staff</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isDrawerVisible}
        onBackdropPress={closeDrawer}
        onSwipeComplete={closeDrawer}
        swipeDirection="down"
        style={tw`m-0 justify-end`}
      >
        <View style={tw`bg-white p-6 rounded-t-lg`}>
          <Text style={tw`text-xl font-bold mb-4`}>Available Staff</Text>
          {availableStaff.length > 0 ? (
            <FlatList
            data={availableStaff}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={tw`p-4 bg-gray-100 rounded-lg mb-2 shadow-md flex-row items-center`}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={tw`w-16 h-16 rounded-full mr-4`}
                />
                <View style={tw`flex-1`}>
                  <Text style={tw`text-lg font-semibold`}>{item.firstName} {item.lastName}</Text>
                  <Text style={tw`text-sm text-gray-600`}>{item.email}</Text>
                </View>
              </View>
            )}
          />
          
          ) : (
            <Text style={tw`text-gray-600 mb-4`}>No staff available. Please create staff in the home screen.</Text>
          )}
          <Text style={tw`text-xl font-bold mb-4`}>Invite Staff</Text>
          <TextInput
            style={tw`border p-2 mb-2 rounded-lg`}
            placeholder="Email"
            value={inviteEmail}
            onChangeText={(text) => setInviteEmail(text)}
          />
          <TextInput
            style={tw`border p-2 mb-2 rounded-lg`}
            placeholder="First Name"
            value={inviteFirstName}
            onChangeText={(text) => setInviteFirstName(text)}
          />
          <TouchableOpacity onPress={inviteStaff} style={tw`bg-blue-500 p-4 rounded-lg mb-4`}>
            <Text style={tw`text-white text-lg font-semibold text-center`}>Send Invite</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeDrawer} style={tw`bg-red-500 p-4 rounded-lg`}>
            <Text style={tw`text-white text-lg font-semibold text-center`}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ScrollView>

  );
};

const FormInput = ({ label, value, onChangeText }) => (
  <View style={tw`mb-4`}>
    <Text style={tw`text-sm font-semibold mb-1`}>{label}</Text>
    <TextInput
      style={tw`border border-gray-300 p-2 rounded-lg`}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const ImageInput = ({ label, uri }) => (
  <View style={tw`mb-4`}>
    <Text style={tw`text-sm font-semibold mb-1`}>{label}</Text>
    {uri ? (
      <Image source={{ uri }} style={tw`w-full h-48 rounded-lg`} />
    ) : (
      <View style={tw`border border-gray-300 p-4 rounded-lg flex items-center justify-center`}>
        <Text style={tw`text-gray-400`}>No Image</Text>
      </View>
    )}
  </View>
);

export default TemplateDetailScreen;
