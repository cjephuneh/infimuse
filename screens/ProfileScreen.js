import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import {
  fetchCurrentHost,
  updateCurrentHost,
} from "../redux/slice/host/hostService";
import tw from "tailwind-react-native-classnames"; // Import tailwind-react-native-classnames
import User from "../assets/man.png";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { getClassSessions } from "../redux/slice/listings/classService";
import { getExperiences } from "../redux/slice/listings/ExperienceService";
import { getPackages } from "../redux/slice/listings/packagesServices";
import { getVenues } from "../redux/slice/listings/VenueService";
import { getWorkshops } from "../redux/slice/listings/workshopService";
import { fetchWorkshopClasses } from "../redux/slice/listings/WorkshopClassService";
import { fetchStaffMembers } from "../redux/slice/staff/staffservice"; // Adjust the import path as needed

const StaffCard = ({ name, email, role, description, onPress, image }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        tw`bg-white rounded-lg p-4 mb-4 flex-row items-center shadow-md`,
      ]}
    >
      <Image source={image} style={styles.image} />
      <View style={tw`flex-1 ml-4`}>
        <Text style={tw`text-xl font-bold`}>{name}</Text>
        <Text style={tw`text-sm text-gray-600`}>{email}</Text>
        <Text style={tw`text-sm text-gray-600`}>{role}</Text>
        <Text style={tw`text-sm text-gray-600`}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBio, setUpdatedBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [listings, setListings] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserData();
    fetchListings();
    fetchStaff();
  }, []);

  const fetchListings = async () => {
    try {
      const classSessionsRes = await getClassSessions();
      const experiencesRes = await getExperiences();
      const packagesRes = await getPackages();
      const venuesRes = await getVenues();
      const workshopsRes = await getWorkshops();
      const workshopClassesRes = await fetchWorkshopClasses();

      const allListings = [
        ...classSessionsRes.Document,
        ...experiencesRes.Document,
        ...packagesRes.Document,
        ...venuesRes.Document,
        ...workshopsRes.Document,
        ...workshopClassesRes.Document,
      ].filter((listing) => listing.status === "upcoming");

      setListings(allListings);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error fetching listings:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetchCurrentHost(token);
      setUserData(response.Data);
      setUpdatedBio(response.Data.bio);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const updatedUserData = { ...userData, bio: updatedBio };
      await updateCurrentHost(updatedUserData, token);
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaff = async () => {
    try {
      const staff = await fetchStaffMembers();
      setStaffMembers(
        staff.map((member) => ({
          id: member.id,
          firstName: member.firstName,
          lastName: member.lastName,
          role: member.role,
          email: member.email,
          phone: member.phone,
          image: require("../assets/man.png"), // Placeholder image
        }))
      );
    } catch (error) {
      console.error("Error loading staff:", error);
      // Optionally handle the error, e.g., show a message to the user
    }
  };

  const handlePress = (member) => {
    navigation.navigate("StaffScreen", { member });
  };

  const renderListingItem = ({ item }) => (
    <View style={styles.listingCard}>
      <Image
        source={{ uri: item.posterUrl || "https://via.placeholder.com/100" }}
        style={styles.listingImage}
        resizeMode="cover"
      />
      <View style={styles.listingInfo}>
        <Text style={styles.listingTitle}>{item.title || "No Title"}</Text>
        <Text style={styles.listingDate}>
          {new Date(item.date).toDateString()}
        </Text>
        <Text style={styles.listingPrice}>Price: {item.price || "Free"}</Text>
      </View>
    </View>
  );

  const renderStaffMember = ({ item }) => (
    <StaffCard
      image={item.image}
      name={item.firstName}
      email={item.email}
      role={item.role}
      description={item.description}
      onPress={() => handlePress(item)}
    />
  );

  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-red-500`}>{error}</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator color="#000" />
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 p-4 bg-gray-100`}>
      <View style={tw`flex-row items-center mb-4`}>
        <View style={tw`mr-4`}>
          <Image source={User} style={tw`w-32 h-32 rounded-full`} />
        </View>
        <View>
          <Text style={tw`font-semibold`}>{userData.firstName}</Text>
          <Text>{userData.email}</Text>
          <Text>{userData.phone}</Text>
        </View>
      </View>
      <View style={tw`mb-4`}>
        <Text style={tw`font-semibold flex-row items-center`}>
          Bio:
          {isEditing ? (
            <Feather
              name="edit"
              size={24}
              color="#000"
              style={tw`ml-2`}
              onPress={() => setIsEditing(!isEditing)}
            />
          ) : null}
        </Text>
        {isEditing ? (
          <TextInput
            style={[tw`p-2 h-20 bg-transparent mt-2`, { borderWidth: 1 }]}
            multiline
            placeholder="Enter your bio"
            value={updatedBio}
            onChangeText={setUpdatedBio}
            editable={isEditing}
          />
        ) : (
          <Text style={tw`mt-2`}>{updatedBio}</Text>
        )}
      </View>
      {isEditing && (
        <TouchableOpacity
          style={tw`bg-blue-500 py-2 px-4 rounded`}
          onPress={handleUpdateProfile}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={tw`text-white font-semibold`}>Save</Text>
          )}
        </TouchableOpacity>
      )}
      {/* <View style={tw`mb-4`}>
        <Text style={styles.heading}>Templates</Text>
        <FlatList
          data={listings}
          renderItem={renderListingItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        />
      </View> */}
      {/* <View style={tw`mb-4`}>
        <Text style={styles.heading}>Upcoming</Text>
        
        <FlatList
          data={listings}
          renderItem={renderListingItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        />
      </View> */}

      {/* <View style={tw`mb-4`}>
        <Text style={styles.heading}>History</Text>
        <FlatList
          data={listings}
          renderItem={renderListingItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        />
      </View> */}
      <View style={tw`mb-4`}>
        <Text style={styles.heading}>Staff</Text>
        <FlatList
          data={staffMembers}
          renderItem={renderStaffMember}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  listingCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    marginRight: 10, // Adjust spacing between cards
  },
  listingImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  listingInfo: {
    flex: 1,
    padding: 10,
  },
  listingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  listingDate: {
    fontSize: 16,
    marginBottom: 5,
  },
  listingPrice: {
    fontSize: 14,
    color: "grey",
  },
  card: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default Profile;
