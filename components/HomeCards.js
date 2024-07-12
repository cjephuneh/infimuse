import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URI = "https://whatever.lat/api/v1/"; // Adjust this to your actual API URL

// Placeholder for the first card
const firstCardData = {
  id: '1',
  title: 'Get ready for your first guests',
  image: require('../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg'), // Replace with your own image URL
};

const Card = ({ title, image }) => (
  <View style={tw`m-2 w-72 shadow-md bg-white rounded-lg overflow-hidden`}>
    <Image source={image} style={tw`h-48 w-full`} resizeMode="cover" />
    <View style={tw`p-4`}>
      <Text style={tw`text-lg text-gray-900 font-semibold mb-2`}>{title}</Text>
      <View style={tw`flex flex-row items-center`}>
        <View style={[tw`h-4 w-4 rounded-full mr-2`, { backgroundColor: '#A72C76' }]} /> 
        <Text style={tw`text-sm text-gray-600`}>New</Text>
      </View>
    </View>
  </View>
);

const App = () => {
  const [listings, setListings] = useState([firstCardData]); // Set initial state with first card
  const [loading, setLoading] = useState(true);

  const fetchUpcoming = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${API_URI}hosts/upcoming`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch upcoming listings");
      }

      const json = await response.json();
      const combinedData = [...json.workshops, ...json.experience, ...json.package, ...json.classSession];
      setListings(prev => [prev[0], ...combinedData]); // Ensure first card remains and append new data
    } catch (error) {
      console.error("Error fetching upcoming listings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcoming();
  }, []);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={listings}
      renderItem={({ item }) => <Card title={item.title} image={item.image} />}
      keyExtractor={(item) => item.id.toString()} // Ensure key is a string
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={tw`p-2`}
    />
  );
};

export default App;
