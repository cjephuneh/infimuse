import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import {  getClassSessions } from '../redux/slice/listings/classService'; // Import API functions
import { getPackages } from '../redux/slice/listings/packagesSlice'; // Import API functions
import { getWorkshops } from '../redux/slice/listings/workshopsSlice'; // Import API functions
// import { getWorkshops, getPackages, getClassSessions } from '../redux/slice/listings'; // Import API functions     


const ListingScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from APIs
        const workshopsData = await getWorkshops();
        const packagesData = await getPackages();
        const classSessionsData = await getClassSessions();

        // Combine data from different APIs
        const combinedData = [
          ...workshopsData.Document,
          ...packagesData.Document,
          ...classSessionsData.Document,
        ];

        // Shuffle the combined data array
        combinedData.sort(() => Math.random() - 0.5);

        // Set the shuffled data in the state
        setData(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={tw`border p-4 rounded-lg mb-4`}
      onPress={() => navigation.navigate('Details', { id: item.id })}
    >
      <Image
        source={{ uri: item.posterUrl }} // Use item.posterUrl as the source for the image
        style={tw`w-full h-40 mb-2 rounded-lg`}
        resizeMode="cover"
      />
      <Text style={tw`text-lg font-semibold text-gray-800 mb-1`}>{item.title}</Text>
      <Text style={tw`text-gray-600`}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={tw`p-4 bg-gray-50 flex-1`}>
      <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Available Listings</Text>
      <FlatList
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ListingScreen;
