import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons'; // Make sure to have '@expo/vector-icons' installed

const StaffScreen = ({ navigation }) => {
  return (
    <ScrollView style={tw`bg-white flex-1`}>
      <View style={tw`items-center pt-10 pb-6`}>
        <Image
            source={require("../assets/man.png")}
            style={tw`h-32 w-32 rounded-full`}
        />
        <Text style={tw`text-xl font-bold mt-3`}> Elvis Wangithi </Text>
        <Text style={tw`text-lg text-gray-600`}>Cardiologist</Text>
        <Text style={tw`text-sm text-gray-500`}>Juja, Nairobi  </Text>

        {/* Stats section */}
        <View style={tw`flex-row justify-around w-full mt-4 px-4`}>
          <View style={tw`items-center`}>
            <Ionicons name="people" size={24} style={tw`text-blue-500`} />
            <Text style={tw`text-lg`}>480+</Text>
            <Text style={tw`text-gray-500`}>Clases</Text>
          </View>
          <View style={tw`items-center`}>
            <Ionicons name="calendar" size={24} style={tw`text-blue-500`} />
            <Text style={tw`text-lg`}>4 Years</Text>
            <Text style={tw`text-gray-500`}>Experience</Text>
          </View>
          <View style={tw`items-center`}>
            <Ionicons name="star" size={24} style={tw`text-blue-500`} />
            <Text style={tw`text-lg`}>4.8</Text>
            <Text style={tw`text-gray-500`}>Rating</Text>
          </View>
        </View>

        {/* About section */}
        <View style={tw`px-4 mt-6`}>
          <Text style={tw`text-lg font-bold`}>About</Text>
          <Text style={tw`text-gray-600 text-lg mt-2`}>
             Elvis Wangithi is a Cardiac Anesthesiologist in Dhaka. His qualification is MBBS, DA, FCPS. He is a
            Senior Consultant in the Department of Anesthesiology at Juja level 6 Highway room 3.{' '}
            <Text style={tw`text-blue-500`}>View More</Text>
          </Text>
        </View>

        {/* Availability */}
        <View style={tw`mt-4 mr-43`}>
          <Text style={tw`text-lg font-bold`}>Availability</Text>
          <Text style={tw`text-gray-600 mt-2`}>Monday - Friday: 7:30 - 16:30</Text>
        </View>

        {/* Consultation fee */}
        <View style={tw` mt-4 mr-53`}>
          <Text style={tw`text-lg font-bold`}>Consultation fee</Text>
          <Text style={tw`text-gray-600 mt-2`}>1000 Usd</Text>
        </View>

        {/* Reviews */}
        {/* The reviews list would go here. For example, you could map through an array of review objects. */}

        {/* Book an Appointment button */}
        
      </View>
    </ScrollView>
  );
};

export default StaffScreen;
