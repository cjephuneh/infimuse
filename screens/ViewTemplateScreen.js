import React, { useState, useEffect } from "react";
import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getVenue } from "../redux/slice/listings/VenueService";

const ViewVenueScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { venueId } = route.params;
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVenueDetails();
  }, []);

  const fetchVenueDetails = async () => {
    try {
      const response = await getVenue(venueId);
      setVenue(response);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[tw`flex-1 justify-center items-center bg-gray-100`]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={tw`mt-2 text-lg font-semibold text-gray-800`}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[tw`flex-1 justify-center items-center bg-gray-100`]}>
        <Text style={tw`text-red-500 text-center`}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[tw`flex-1 bg-gray-100`]}>
      <View style={tw`p-4`}>
        <Text style={tw`text-2xl font-bold mb-2 text-center`}>{venue.name}</Text>
        <Image source={{ uri: venue.imageUrl1 }} style={[tw`h-72 rounded-lg mb-4`]} resizeMode="cover" />
        <View style={tw`bg-white rounded-lg p-4 shadow-md mb-4`}>
          <Text style={tw`text-lg mb-2`}>
            <Text style={tw`font-bold`}>Location:</Text> {venue.location}
          </Text>
          <Text style={tw`text-lg mb-2`}>
            <Text style={tw`font-bold`}>Accessibility:</Text> {venue.accessibility}
          </Text>
          <Text style={tw`text-lg mb-2`}>
            <Text style={tw`font-bold`}>Capacity:</Text> {venue.capacity}
          </Text>
          <Text style={tw`text-lg mb-2`}>
            <Text style={tw`font-bold`}>Amenities:</Text> {venue.amenities}
          </Text>
          <Text style={tw`text-lg mb-2`}>
            <Text style={tw`font-bold`}>Noise Level:</Text> {venue.noiseLevel}
          </Text>
          <Text style={tw`text-lg mb-2`}>
            <Text style={tw`font-bold`}>Parking:</Text> {venue.parking ? "Available" : "Not available"}
          </Text>
          <Text style={tw`text-lg mb-2`}>
            <Text style={tw`font-bold`}>Additional Info:</Text> {venue.additionalInfo}
          </Text>
          <Text style={tw`text-lg mb-2`}>
            <Text style={tw`font-bold`}>Rules:</Text> {venue.rules}
          </Text>
          <Text style={tw`text-lg mb-2`}>
            <Text style={tw`font-bold`}>Updated At:</Text> {new Date(venue.updatedAt).toLocaleString()}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewVenueScreen;
