import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
  Alert
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URI = "https://whatever.lat/api/v1/";

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({
    workshops: [],
    classSessions: [],
    experiences: [],
    workshopClasses: [],
    venues: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

const fetchData = async () => {
  setLoading(true);
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("Authorization token is not set");
    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };

    const fetchFromAPI = async (endpoint) => {
      const response = await fetch(`${API_URI}${endpoint}`, { headers });
      const json = await response.json();
      if (!response.ok) throw new Error(json.message || "API call failed");
      return json;
    };

    const workshops = await fetchFromAPI("workshops");
    const classSessions = await fetchFromAPI("class-sessions");
    const experiences = await fetchFromAPI("experiences");
    const workshopClasses = await fetchFromAPI("workshop-classes");
    const venuesResponse = await fetchFromAPI("venues");

    setData({
      workshops: workshops.Document || [],
      classSessions: classSessions.Document || [],
      experiences: experiences.Document || [],
      workshopClasses: workshopClasses.Document || [],
      venues: venuesResponse.venuesByHost || []
    });
  } catch (error) {
    setError(error.message);
    Alert.alert("Error", error.message);
  } finally {
    setLoading(false);
  }
};


  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleCreateTemplatePress = () => {
    navigation.navigate("TemplateScreen");
  };

  const CategoryCard = ({ item, image, templateType }) => {
    const navigation = useNavigation();
  
    const handleTemplatePress = () => {
      let type;
      switch (templateType) {
        case 'Workshops':
          type = 'workshops';
          break;
        case 'ClassSessions':
          type = 'classSessions';
          break;
        case 'Experiences':
          type = 'experiences';
          break;
        case 'WorkshopClasses':
          type = 'workshopClasses';
          break;
        case 'venues':
          type = 'venues';
          break;
        default:
          throw new Error('Invalid template type');
      }
      navigation.navigate("TemplateDetailScreen", { templateType: type, templateId: item.id });
    };
  
    return (
      <TouchableOpacity
        style={tw`mr-4 bg-white rounded-xl overflow-hidden shadow-lg`}
        onPress={handleTemplatePress}
      >
        <Image source={{ uri: image }} style={tw`h-36 w-72`} resizeMode="cover" />
        <View style={tw`p-3`}>
          <Text style={tw`text-lg font-semibold`}>{item.title}</Text>
          <Text style={tw`text-sm`}>{item.description}</Text>
          <Text style={tw`text-sm text-gray-400`}>{item.location || 'N/A'}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  

  const CategorySection = ({ title, items }) => {
    return (
      <View style={tw`mt-4 p-4`}>
        <Text style={tw`text-xl font-semibold mb-4`}>{title}</Text>
        {items.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={tw`pl-2`}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            {items.map((item) => (
              <CategoryCard key={item.id} item={item} image={item.posterUrl || 'https://via.placeholder.com/150'} templateType={title} />
            ))}
          </ScrollView>
        ) : (
          <View style={tw`flex-1 items-center justify-center`}>
            <Text style={tw`text-sm text-gray-500`}>No {title.toLowerCase()} available.</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={tw`bg-gray-100 flex-1`}>
      <View style={tw`flex-row justify-between items-center p-4 mt-3`}>
        <Text style={tw`text-2xl font-bold`}>Templates</Text>
        <TouchableOpacity
          style={tw`bg-purple-500 px-4 py-2 rounded-lg shadow-md`}
          onPress={handleCreateTemplatePress}
        >
          <Text style={tw`text-white font-semibold`}>Create a Template</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {Object.entries(data).map(([key, items]) => (
          <CategorySection
            key={key}
            title={key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' ')}
            items={items}
          />
        ))}
      </ScrollView>
      {loading && (
        <View style={tw`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-75`}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={tw`mt-2 text-lg font-semibold`}>We are setting things up for you hang in there ...</Text>
        </View>
      )}
    </View>
  );
};

export default ExploreScreen;
