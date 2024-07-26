import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-react-native-classnames';

import { getClassSessions } from '../redux/slice/listings/classService'; // Import API functions
import { fetchWorkshopClasses } from '../redux/slice/listings/WorkshopClassService'; // Import API functions
import { getWorkshops } from '../redux/slice/listings/workshopService'; // Import API functions
import { getPackages } from '../redux/slice/listings/packagesServices'; // Import API functions

const ListingSchedule = ({ date }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        // Fetch listings for the selected date
        const classSessions = await getClassSessions(date);
        const workshopClasses = await fetchWorkshopClasses(date);
        const workshops = await getWorkshops(date);
        const packages = await getPackages(date);

        // Combine non-empty arrays only
        const allListings = [
          ...classSessions.Document.map(item => ({ ...item, type: 'Class' })),
          ...workshopClasses.Document.map(item => ({ ...item, type: 'Workshop Class' })),
          ...workshops.Document.map(item => ({ ...item, type: 'Workshop' })),
          ...packages.Document.map(item => ({ ...item, type: 'Package' })),
        ];

        setListings(allListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (date) {
      fetchListings();
    }
  }, [date]);

  const renderItem = ({ item }) => (
    <View style={[tw`py-2 px-4 border rounded-xl mb-2 bg-white flex-row justify-between items-center`, { borderColor: '#A72C76' }]}>
      <View>
        <Text style={tw`text-lg font-bold text-gray-800 mb-1`}>{item.type}</Text>
        <Text style={tw`text-base`}>{item.title}</Text>
        <Text style={tw`text-sm text-red-800`}>{item.time}</Text>
      </View>
      <TouchableOpacity onPress={() => console.log('Share', item)}>
        <Icon name="send" size={24} color="#A72C76" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white p-4`}>
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