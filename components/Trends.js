import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const StaffCard = ({ image, name, description, onPress }) => {
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
        <Text style={tw`text-gray-600`}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Tools = () => {
  const navigation = useNavigation(); // Get the navigation prop using useNavigation hook

  // Dummy data for staff members
  const staffMembers = [
    {
      id: 1,
      name: "Alice Johnson",
      description: "Project Manager",
      image: require('../assets/man.png'), // Corrected to 'image' instead of 'imageUrl'
    },
    {
      id: 2,
      name: "Bob Smith",
      description: "Lead Developer",
      image: require('../assets/man.png'), // Corrected to 'image' instead of 'imageUrl'
    },
    {
      id: 3,
      name: "Alice Johnson",
      description: "Project Manager",
      image: require('../assets/man.png'), // Corrected to 'image' instead of 'imageUrl'
    },
    // Other staff members
  ];

  const handlePress = (memberId) => {
    // navigate to StaffScreen with the memberId as a parameter
    navigation.navigate("StaffScreen", { memberId });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView style={tw`flex-1 bg-white`}>
        <View style={tw`p-2`}>
          <Text style={tw`text-xl font-semibold mb-4`}>Staff</Text>

          {staffMembers.map((member) => (
            <StaffCard
              key={member.id}
              image={member.image} // Changed to 'image' instead of 'imageUrl'
              name={member.name}
              description={member.description}
              onPress={() => handlePress(member.id)}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    elevation: 5, // for Android shadow
    shadowColor: "#000000", // for iOS shadow
    shadowOpacity: 0.3, // for iOS shadow
    shadowRadius: 3, // for iOS shadow
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default Tools;
