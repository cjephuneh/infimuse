import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';

import { getWorkshops } from '../redux/slice/listings/workshopService'; // Import API functions
import { fetchWorkshopClasses } from '../redux/slice/listings/WorkshopClassService'; // Import API functions
import { getClassSessions } from '../redux/slice/listings/classService'; // Import API functions
import { getPackages } from '../redux/slice/listings/packagesServices'; // Import API functions

const ListingSchedule = ({ date }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        // Fetch listings for the given date from different sources
        const classSessions = await getClassSessions(date);
        const workshopClasses = await fetchWorkshopClasses(date);
        const workshops = await getWorkshops(date);
        const packages = await getPackages(date);

        // Combine listings from all sources
        const allListings = [
          ...classSessions,
          ...workshopClasses,
          ...workshops,
          ...packages,
        ];

        // Set the fetched listings
        setListings(allListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [date]);

  const renderItem = ({ item }) => (
    <View style={tw`py-2 px-4 border-b border-gray-200`}>
      <Text style={tw`text-lg font-bold mb-1`}>{item.type}</Text>
      <Text style={tw`text-base`}>{item.title}</Text>
      <Text style={tw`text-sm text-gray-500`}>{item.time}</Text>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-gray-800 p-4`}>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <FlatList
          data={listings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={() => (
            <Text style={tw`text-lg text-white text-center`}>No listings for this date</Text>
          )}
        />
      )}
    </View>
  );
};

export default ListingSchedule;
