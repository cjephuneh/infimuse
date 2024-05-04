import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native'; // Importing useNavigation hook

const ListingScreen = () => {
  const [activeListing, setActiveListing] = useState(null);
  const navigation = useNavigation(); // Initializing navigation

  const listings = [
    { id: 'classes', title: 'Classes', description: 'Host classes physically and advertise them on our platform, get better and organized information about your class.' },
    { id: 'packages', title: 'Packages', description: 'Host classes physically and advertise them on our platform, get better and organized information about your class.' },
    { id: 'workshop', title: 'WorkShop', description: 'Host classes physically and advertise them on our platform, get better and organized information about your class.' },
    { id: 'venue', title: 'Venue', description: 'Host classes physically and advertise them on our platform, get better and organized information about your class.' },
    { id: 'experience', title: 'Experience', description: 'Host unique experiences and adventures for users to enjoy and learn from.' }, // New "Experience" listing
  ];

  const cardStyle = (id) => [
    tw`border p-4 rounded-lg mb-4`,
    activeListing === id
      ? tw`bg-purple-500 border-purple-700 shadow-lg`
      : tw`bg-white border-gray-300 shadow-sm`,
  ];

  const handleCreateListing = (id) => {
    // Define navigation paths for each listing
    const navigationPaths = {
      classes: 'CreateClassesScreen',
      packages: 'CreatePackagesScreen',
      workshop: 'CreateWorkshopScreen',
      venue: 'CreateVenueScreen',
      experience: 'CreateExperienceScreen', // Navigation path for "Experience" listing
    };

    // Navigate to the respective screen based on the listing id
    navigation.navigate(navigationPaths[id]);
  };

  return (
    <View style={tw`p-4 bg-gray-50 flex-1`}>
      <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Create Listing</Text>
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
          style={tw`bg-purple-600 p-4 rounded-lg shadow-lg`}
          onPress={() => handleCreateListing(activeListing)} // Call handleCreateListing with the activeListing id
        >
          <Text style={tw`text-white text-center text-lg font-bold`}>Create {activeListing.charAt(0).toUpperCase() + activeListing.slice(1)}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListingScreen;
