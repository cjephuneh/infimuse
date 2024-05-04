import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { fetchCurrentHost, updateCurrentHost } from '../redux/slice/host/hostService';
import tw from 'tailwind-react-native-classnames'; // Import tailwind-react-native-classnames
import User from '../assets/man.png';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBio, setUpdatedBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await fetchCurrentHost(token);
      setUserData(response.Data);
      setUpdatedBio(response.Data.bio);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const updatedUserData = { ...userData, bio: updatedBio };
      await updateCurrentHost(updatedUserData, token);
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-red-500`}>{error}</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator color="#000" />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 p-4 bg-gray-100`}>
      <Text style={tw`text-3xl font-bold mb-4`}>Profile</Text>
      <View style={tw`items-center mb-4`}>
        <Image source={User} style={tw`w-32 h-32 rounded-full`} />
      </View>
      <View style={tw`mb-4`}>
        <Text style={tw`font-semibold`}>First Name:</Text>
        <Text>{userData.firstName}</Text>
      </View>
      <View style={tw`mb-4`}>
        <Text style={tw`font-semibold`}>Email:</Text>
        <Text>{userData.email}</Text>
      </View>
      <View style={tw`mb-4`}>
        <Text style={tw`font-semibold`}>Phone:</Text>
        <Text>{userData.phone}</Text>
      </View>
      <View style={tw`mb-4`}>
        <Text style={tw`font-semibold`}>Bio:</Text>
        <TextInput
          style={tw`border border-gray-300 rounded p-2 h-20`}
          multiline
          placeholder="Enter your bio"
          value={updatedBio}
          onChangeText={setUpdatedBio}
          editable={isEditing}
        />
      </View>
      <TouchableOpacity
        style={tw`bg-blue-500 py-3 rounded`}
        onPress={isEditing ? handleUpdateProfile : () => setIsEditing(true)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={tw`text-white font-semibold text-center`}>{isEditing ? 'Save' : 'Edit'}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
