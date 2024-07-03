import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

const ListingScreen = () => {
  const [activeListing, setActiveListing] = useState(null);
  const navigation = useNavigation();

  const listings = [
    { id: 'sip_n_hang', title: 'Sip n Hang', description: 'Enjoy a relaxing day with friends, sipping drinks and hanging out in a comfortable setting.' },
    { id: 'kids_activities', title: 'Kids Activities', description: 'Fun and engaging activities for children, designed to keep them entertained and learning.' },
    { id: 'learning_experiences', title: 'Learning Experiences', description: 'Unique opportunities for participants to learn new skills and gain knowledge in various fields.' },
  ];

  const cardStyle = (id) => [
    tw`border p-6 rounded-lg mb-6`,
    activeListing === id
      ? tw`bg-purple-500 border-purple-700 shadow-lg`
      : tw`bg-white border-gray-300 shadow-sm`,
  ];

  const handleCreateListing = (id) => {
    navigation.navigate('CreateClassesScreen'); // Direct all listings to 'CreateClassesScreen'
  };

  return (
    <View style={tw`p-4 bg-gray-50 flex-1`}>
      <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>What best describes your day experience?</Text>
      {listings.map((listing) => (
        <TouchableOpacity
          key={listing.id}
          style={cardStyle(listing.id)}
          onPress={() => setActiveListing(listing.id)}
        >
          <Text style={tw`text-lg font-semibold text-gray-800 mb-2`}>{listing.title}</Text>
          <Text style={tw`text-gray-600`}>{listing.description}</Text>
        </TouchableOpacity>
      ))}
      {activeListing && (
        <TouchableOpacity
          style={tw`bg-purple-600 p-6 rounded-lg shadow-lg mt-4`}
          onPress={() => handleCreateListing(activeListing)}
        >
          <Text style={tw`text-white text-center text-lg font-bold`}>Create {activeListing.charAt(0).toUpperCase() + activeListing.slice(1)}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListingScreen;
