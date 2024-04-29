import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native';
import { tw } from 'tailwind-react-native-classnames'; // Import tw from Tailwind CSS
import { fetchCurrentHost, updateCurrentHost } from '../redux/slice/host/hostService';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBio, setUpdatedBio] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // Retrieve token from AsyncStorage
      const response = await fetchCurrentHost(token);
      setUserData(response.NewDocument);
      setUpdatedBio(response.NewDocument.bio);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedUserData = { ...userData, bio: updatedBio };
      const token = await AsyncStorage.getItem('token'); // Retrieve token from AsyncStorage
      await updateCurrentHost(updatedUserData, token);
      setUserData(updatedUserData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`bg-white`}>
      <View style={tw`p-4`}>
        <View style={tw`mt-24 px-4`}>
          <Text style={tw`text-2xl font-bold text-black`}>{userData?.firstName}</Text>
          {isEditing ? (
            <TextInput
              style={tw`border-b border-gray-400 text-lg my-2`}
              multiline
              placeholder="Enter your bio"
              value={updatedBio}
              onChangeText={setUpdatedBio}
            />
          ) : (
            <Text style={tw`text-base text-black`}>{userData?.bio}</Text>
          )}
          <Text style={tw`text-base text-gray-600 mt-2`}>Email: {userData?.email}</Text>
          <Text style={tw`text-base text-gray-600`}>Phone: {userData?.phone}</Text>
          <Text style={tw`text-base text-gray-600`}>Qualifications: {userData?.qualifications}</Text>
          <Text style={tw`text-base text-gray-600`}>Experience Years: {userData?.experienceYears}</Text>
          <Text style={tw`text-base text-gray-600`}>Image URL 1: {userData?.imageUrl1}</Text>
          <Text style={tw`text-base text-gray-600`}>Image URL 2: {userData?.imageUrl2}</Text>
          <Text style={tw`text-base text-gray-600`}>Image URL 3: {userData?.imageUrl3}</Text>
          {isEditing && (
            <TouchableOpacity style={tw`bg-blue-500 py-2 px-4 rounded-md mt-4`} onPress={handleUpdateProfile}>
              <Text style={tw`text-white`}>Save</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
