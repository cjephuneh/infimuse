import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native'; // Importing useNavigation hook

const ListingScreen = () => {
  const [activeListing, setActiveListing] = useState(null);
  const navigation = useNavigation(); // Initializing navigation

  const listings = [
    { id: 'venue', title: 'Venue', description: 'Host classes physically and advertise them on our platform, get better and organized information about your class.' },
    { id: 'day_experiences', title: 'Day Group', description: 'Host classes physically and advertise them on our platform, get better and organized information about your class.' },
    // { id: 'packages', title: 'Packages', description: 'Host classes physically and advertise them on our platform, get better and organized information about your class.' },
    { id: 'workshop', title: 'Workshop', description: 'Host classes physically and advertise them on our platform, get better and organized information about your class.' },
    { id: 'experience', title: 'Experience', description: 'Host unique experiences and adventures for users to enjoy and learn from.' }, // New "Experience" listing
  ];

  const cardStyle = (id) => [
    tw`border p-4 rounded-lg mb-4`,
    activeListing === id
      ? tw`bg-blue-500 border-blue-700 shadow-lg text-white`
      : tw`bg-white border-gray-300 shadow-sm text-gray-800`, // Fixed the text color for inactive listings
  ];

  const handleCreateListing = (id) => {
    // Define navigation paths for each listing
    const navigationPaths = {
      day_experiences: 'DayExperiencesScreen',
      // packages: 'CreatePackagesScreen',
      workshop: 'CreateWorkshopScreen',
      venue: 'CreateVenueScreen',
      experience: 'CreateExperienceScreen', // Navigation path for "Experience" listing
    };

    // Log the id and path to debug
    console.log(`Navigating to: ${navigationPaths[id]}`);

    // Navigate to the respective screen based on the listing id
    const screenName = navigationPaths[id];
    if (screenName) {
      navigation.navigate(screenName);
    } else {
      console.error(`Navigation path not found for id: ${id}`);
    }
  };

  return (
    <View style={tw`p-4 bg-gray-50 flex-1`}>
      <Text style={tw`text-2xl font-bold mb-4 text-gray-800 mt-6 mb-8`}>Create Listing</Text>
      <Text style={tw`text-lg text-gray-600 mb-4`}>Select a listing type to create: ✨ </Text>
      {listings.map((listing) => (
        <TouchableOpacity
          key={listing.id}
          style={cardStyle(listing.id)}
          onPress={() => setActiveListing(listing.id)}
        >
          <Text style={tw`text-lg font-semibold text-gray-800`}>{listing.title}</Text>
          <Text style={tw`text-gray-600`}>{listing.description}</Text>
        </TouchableOpacity>
      ))}
      {activeListing && (
        <TouchableOpacity
          style={tw`bg-blue-500 p-4 rounded-lg shadow-lg`}
          onPress={() => handleCreateListing(activeListing)} // Call handleCreateListing with the activeListing id
        >
          <Text style={tw`text-white text-center text-lg font-bold`}>Create {activeListing.charAt(0).toUpperCase() + activeListing.slice(1)}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListingScreen;
