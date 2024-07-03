import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { fetchStaffMembers } from '../redux/slice/staff/staffservice'; // Adjust the import path as needed

const StaffCard = ({ name, email, role, description, onPress, imageUrl }) => {
  // Function to truncate the description
  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, tw`bg-white rounded-lg p-4 mb-4 flex-row items-center shadow-md`]}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={tw`flex-1 ml-4`}>
        <Text style={tw`text-xl font-bold`}>{name}</Text>
        <Text style={tw`text-sm text-gray-600`}>{email}</Text>
        <Text style={tw`text-sm text-gray-600`}>{role}</Text>
        <Text style={tw`text-sm text-gray-600`}>
          {truncateDescription(description, 50)} {/* Truncate description to 50 characters */}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Tools = () => {
  const navigation = useNavigation();
  const [staffMembers, setStaffMembers] = useState([]);

  useEffect(() => {
    const loadStaff = async () => {
      try {
        const staff = await fetchStaffMembers();
        console.log('Fetched staff members:', staff); // Check what you receive here
        setStaffMembers(
          staff.map((member) => ({
            id: member.id,
            firstName: member.firstName,
            lastName: member.lastName,
            role: member.role,
            email: member.email,
            phone: member.phone,
            imageUrl: member.imageUrl, // Use imageUrl from the API response
            description: member.bio, // Assuming bio is used as description
          }))
        );
      } catch (error) {
        console.error('Error loading staff:', error);
        // Optionally handle the error, e.g., show a message to the user
      }
    };

    loadStaff();
  }, []);

  const handlePress = (member) => {
    navigation.navigate('StaffScreen', { member });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView style={tw`flex-1 bg-white`}>
        <View style={tw`p-2`}>
          <Text style={tw`text-xl font-semibold mb-4`}>Staff</Text>
          {staffMembers.length > 0 ? (
            staffMembers.map((member) => (
              <StaffCard
                key={member.id}
                imageUrl={member.imageUrl}
                name={`${member.firstName} ${member.lastName}`}
                email={member.email}
                role={member.role}
                description={member.description}
                onPress={() => handlePress(member)}
              />
            ))
          ) : (
            <Text>No Staff Members Found</Text>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
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

export default Tools;
