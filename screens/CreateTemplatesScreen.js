import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, RefreshControl } from "react-native";
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
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const workshopResponse = await getWorkshops();
      const packageResponse = await getPackages();
      const classSessionResponse = await getClassSessions();

      const workshops = workshopResponse || [];
      const packages = packageResponse || [];
      const classSessions = classSessionResponse || [];

      setWorkshops(workshops);
      setPackages(packages);
      setClassSessions(classSessions);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

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

  const CategorySection = ({ title, items, imageKey, navigation }) => {
    const itemList = items && items.Document ? items.Document : [];
    
    return (
      <View style={tw`mt-2 p-4`}>
        <Text style={tw`text-xl font-semibold mb-4`}>{title}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw`pl-2`}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {itemList.map((item) => (
          <CategoryCard key={item.id} item={item} image={item[imageKey]} templateType={title} navigation={navigation} />
        ))}
        </ScrollView>
      </View>
    );
  };
  
  
  const CategoryCard = ({ item, image, templateType, navigation }) => {
    const handleTemplatePress = () => {
      let type;
      switch (templateType) {
        case 'Workshops':
          type = 'workshops';
          break;
        case 'Packages':
          type = 'packages';
          break;
        case 'Class Sessions':
          type = 'classes';
          break;
        default:
          throw new Error('Invalid template type');
      }
      navigation.navigate("TemplateDetailScreen", { templateType: type, templateId: item.id });
    };
  
    return (
      <TouchableOpacity style={tw`mr-4 bg-white rounded-xl overflow-hidden shadow-lg`} onPress={handleTemplatePress}>
        <Image source={{ uri: image }} style={tw`h-36 w-full`} resizeMode="cover" />
        <View style={tw`p-3`}>
          <Text style={tw`text-lg font-semibold `}>{item.title}</Text>
          <Text style={tw`text-sm`}>{item.description}</Text>
        </View>
      </TouchableOpacity>
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
          imageKey="posterUrl"
          navigation={navigation}
        />
        ))}
      </ScrollView>
    </View>
  );
};

export default ExploreScreen;
