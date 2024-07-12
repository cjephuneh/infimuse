import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

const roleData = [
  {
    title: 'Sign in as Staff',
    description: 'Access staff-only areas to manage events, handle user queries, and perform administrative tasks.',
    screen: 'StaffSignUp',
  },
  {
    title: 'Sign in as Host',
    description: 'Manage your sessions, interact with attendees, handle scheduling, and oversee your event listings.',
    screen: 'HostSignUp',
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
    <View style={tw`flex-1 bg-white p-5`}>
      <Text style={tw`text-xl font-bold text-gray-800 mb-4`}>Sign In Options</Text>
      <FlatList
        data={roleData}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelectRole(item)}
            style={tw`mb-4 p-4 border rounded-lg ${
              selectedRole === item.title ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'
            }`}
          >
            <Text style={tw`text-lg font-semibold ${selectedRole === item.title ? 'text-white' : 'text-gray-900'}`}>
              {item.title}
            </Text>
            <Text style={tw`text-sm ${selectedRole === item.title ? 'text-gray-200' : 'text-gray-500'}`}>
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SignInOptions;
