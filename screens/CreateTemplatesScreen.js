import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  RefreshControl, 
  ActivityIndicator 
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";

// Import API functions
import { getPackages } from "../redux/slice/listings/packagesServices";
import { getWorkshops } from "../redux/slice/listings/workshopService";
import { getClassSessions } from "../redux/slice/listings/classService";
import { getVenues } from "../redux/slice/listings/VenueService";

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [workshops, setWorkshops] = useState([]);
  const [packages, setPackages] = useState([]);
  const [venues, setVenues] = useState([]); // Add venues state
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
      const venueResponse = await getVenues(); // Fetch venues

      setWorkshops(workshopResponse || []);
      setPackages(packageResponse || []);
      setClassSessions(classSessionResponse || []);
      setVenues(venueResponse || []); // Set venues state
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

  const handleCreateTemplatePress = () => {
    navigation.navigate("TemplateScreen");
  };

  const CategorySection = ({ title, items, imageKey }) => {
    const itemList = items && items.Document ? items.Document : [];

    return (
      <View style={tw`mt-4 p-4`}>
        <Text style={tw`text-xl font-semibold mb-4`}>{title}</Text>
        {error && itemList.length === 0 && (
          <View style={tw`bg-red-100 p-4 rounded-lg`}>
            <Text style={tw`text-red-500 text-center`}>Error fetching {title.toLowerCase()}: {error}</Text>
          </View>
        )}
        {itemList.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={tw`pl-2`}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            {itemList.map((item) => (
              <CategoryCard key={item.id} item={item} image={item[imageKey]} templateType={title} />
            ))}
          </ScrollView>
        ) : (
          <View style={tw`flex-1 items-center justify-center`}>
            <Text style={tw`text-sm text-gray-500`}>No {title.toLowerCase()} available. Create a new one!</Text>
          </View>
        )}
      </View>
    );
  };

  const CategoryCard = ({ item, image, templateType }) => {
    const handleTemplatePress = () => {
      let type;
      switch (templateType) {
        case 'Venues':
          type = 'venues';
          break;
        case 'Day Experiences':
          type = 'classes';
          break;
        case 'Workshops':
          type = 'workshops';
          break;
        case 'Packages':
          type = 'packages';
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
          onPress={handleCreateTemplatePress}
        >
          <Text style={tw`text-white font-semibold`}>Create a Template</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {Object.entries({ venues, classSessions, workshops, packages }).map(([key, items]) => (
          <CategorySection
            key={key}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            items={items}
            imageKey="posterUrl"
          />
        ))}
      </ScrollView>
      {loading && (
        <View style={tw`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-75`}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={tw`mt-2 text-lg font-semibold`}>Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default ExploreScreen;
