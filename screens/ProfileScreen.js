import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import {
  fetchCurrentHost,
  updateCurrentHost,
} from "../redux/slice/host/hostService";
import tw from "tailwind-react-native-classnames"; // Import tailwind-react-native-classnames
import User from "../assets/man.png";
import { Feather } from "@expo/vector-icons";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBio, setUpdatedBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserData();
  }, []);

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
    <View style={tw`flex-1 p-4 bg-gray-100`}>
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
    </View>
  );
};

export default Profile;
