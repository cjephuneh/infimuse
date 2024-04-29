import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native';
import { tw } from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URI = "https://whatever.lat/api/v1/";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBio, setUpdatedBio] = useState('');
  const [userId, setUserId] = useState(null); // State to hold the user ID

  useEffect(() => {
    fetchUserId(); // Fetch user ID when component mounts
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserData(userId); // Fetch user data when user ID is available
    }
  }, [userId]);

  const fetchUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        const parsedUserId = JSON.parse(storedUserId).id;
        console.log('Parsed User ID:', parsedUserId);
        setUserId(parsedUserId);
      } else {
        console.error('User ID not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };
  
  

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`${API_URI}/hosts/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      setUserData(userData.Data);
      setUpdatedBio(userData.Data.bio);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      // Implement your update logic here
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
