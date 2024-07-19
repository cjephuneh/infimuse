import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; // Assuming you're using Expo

const roleData = [
  {
    title: 'Sign in as Staff',
    description: 'Access staff-only areas to manage events, handle user queries, and perform administrative tasks.',
    icon: 'briefcase',
    screen: 'StaffSignIn',
  },
  {
    title: 'Sign in as Host',
    description: 'Manage your sessions, interact with attendees, handle scheduling, and oversee your event listings.',
    icon: 'user',
    screen: 'SignIn',
  },
];

const SignInOptions = () => {
  const navigation = useNavigation();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSelectRole = (role) => {
    setSelectedRole(role.title);
    navigation.navigate(role.screen);
  };

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`p-8`}>
        <Text style={tw`text-2xl font-bold text-gray-800 mb-6`}>Sign In Options</Text>
        <FlatList
          data={roleData}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectRole(item)}
              style={tw`mb-6 p-6 border rounded-xl shadow-md ${
                selectedRole === item.title ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'
              }`}
            >
              <View style={tw`flex-row items-center`}>
                <Feather name={item.icon} size={24} style={tw`${selectedRole === item.title ? 'text-white' : 'text-gray-900'} mr-4`} />
                <Text style={tw`text-lg font-semibold ml-2 ${selectedRole === item.title ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </Text>
              </View>
              <Text style={tw`text-sm mt-2 ${selectedRole === item.title ? 'text-gray-200' : 'text-gray-500'}`}>
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default SignInOptions;