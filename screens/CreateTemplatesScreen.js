import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";

// Import API functions

import { getPackages } from "../redux/slice/listings/packagesServices";
import { getWorkshops } from "../redux/slice/listings/workshopService";
import { getClassSessions } from "../redux/slice/listings/classService";

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [workshops, setWorkshops] = useState([]);
  const [packages, setPackages] = useState([]);
  const [classSessions, setClassSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workshopData = await getWorkshops();
        const packageData = await getPackages();
        const classSessionData = await getClassSessions();
        setWorkshops(workshopData);
        setPackages(packageData);
        setClassSessions(classSessionData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching data: {error}</Text>;
  }

  console.log("Workshops:", workshops);
  console.log("Packages:", packages);
  console.log("Class Sessions:", classSessions);

  const handleCreateTemplatePress = () => {
    navigation.navigate("TemplateScreen"); // Navigate to the Templates screen
  };

  const categories = {
    workshops,
    packages,
    classSessions,
  };

  const CategorySection = ({ title, items }) => {
    return (
      <View style={tw`mt-2 p-4`}>
        <Text style={tw`text-xl font-semibold mb-4`}>{title}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw`pl-2`}
        >
          {items && items.map((item) => ( // Check if items is defined before mapping
            <CategoryCard key={item.id} item={item} image={item.image} />
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={tw`bg-gray-100 flex-1`}>
      <View style={tw`flex-row justify-between items-center p-4`}>
        <Text style={tw`text-2xl font-bold`}>Explore Templates</Text>
        <TouchableOpacity
          style={tw`bg-purple-500 px-4 py-2 rounded-lg shadow-md`}
          onPress={handleCreateTemplatePress} // Call handleCreateTemplatePress when button is pressed
        >
          <Text style={tw`text-white font-semibold`}>Create a Template</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {Object.entries(categories).map(([key, items]) => (
          <CategorySection
            key={key}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            items={items}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ExploreScreen;
