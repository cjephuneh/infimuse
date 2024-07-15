import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import tw from 'tailwind-react-native-classnames';
import StaffHomeCards from '../../components/staffHomeCards';
import StaffTools from '../../components/StaffTools';
import Trends from '../../components/Trends'
import StaffWallet from '../../components/StaffWaIIet';

// Define your tabs
const Tab = createBottomTabNavigator();


function HomeScreen() {
  return (
    <SafeAreaView style={tw`flex-1`}>
      
      <ScrollView style={tw`px-4 bg-white`}>
        <View style={tw`mt-6 mb-4`}>
          <Text style={tw`text-2xl font-bold text-gray-800`}>Today</Text>
          <Text style={tw`text-gray-600`}>
            Assigned Templates
          </Text>
        </View>

        <StaffHomeCards/>       
        <StaffTools/>
        <StaffWallet/>
        {/* <Trends/> */}
      </ScrollView>
    </SafeAreaView>
  );
}


export default HomeScreen;