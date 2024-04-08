import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tools = () => {
  // Dummy data for the UI
  const features = [
    { id: 1, title: 'Update your availability', color: '#F472B6', icon: 'calendar-clock' },
    { id: 2, title: 'Fine tune your Pricing', color: '#FBBF24', icon: 'currency-usd' },
    { id: 3, title: 'Explore your setting', color: '#FB7185', icon: 'cog' },
    { id: 4, title: 'Schedule a class', color: '#F472B6', icon: 'calendar' },
   
  ];


  

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView style={tw`flex-1 bg-white`}>
        <View style={tw`p-4`}>
            <View>
            <Text style={tw`text-xl font-semibold mb-4`}>Tools</Text>
            <View style={tw`flex-row flex-wrap justify-between mb-4`}>
              {features.map((feature) => (
                <TouchableOpacity key={feature.id} style={[styles.featureCard, { backgroundColor: feature.color }]}>
                  <Icon name={feature.icon} size={24} color="#ffffff" />
                  <Text style={tw` text-white text-center mt-2 `}>{feature.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

      
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  featureCard: {
    width: '48%', // Approximately half the screen width minus margin
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default Tools;
