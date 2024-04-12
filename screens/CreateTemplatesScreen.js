import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';


// Sample data with image URLs
const categories = {
  workshops: [
    {
      id: '1',
      title: 'Workshop 1',
      description: 'A basic package to get you started with essentials.',
      image: require('../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg'), // Replace with your own image URL
    },
    {
        id: '2',
        title: 'Workshop 2',
        description: 'A basic package to get you started with essentials.',
        image: require('../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg'), // Replace with your own image URL
    },
    {
        id: '3',
        title: 'Workshop 3',
        description: 'A basic package to get you started with essentials.',
        image: require('../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg'), // Replace with your own image URL
    },
    // ...other workshops
  ],

    packages: [
      {
        id: 'package1',
        title: 'Starter Pack',
        description: 'A basic package to get you started with essentials.',
        image: require('../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg'), // Replace with your own image URL
    },
      {
        id: 'package2',
        title: 'Pro Pack',
        description: 'Advanced tools for the professional. Includes premium features.',
        image: require('../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg'), // Replace with your own image URL
    },
      {
        id: 'package3',
        title: 'Ultimate Pack',
        description: 'The complete set for the enthusiasts who want it all.',
        image: require('../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg'), // Replace with your own image URL
    },
    ],
    classes: [
      {
        id: 'class1',
        title: 'Yoga Basics',
        description: 'Learn the basics of yoga for a healthier lifestyle.',
        image: require('../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg'), // Replace with your own image URL
    },
      {
        id: 'class2',
        title: 'Advanced Pottery',
        description: 'Shape your skills into a masterpiece with advanced techniques.',
        image: require('../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg'), // Replace with your own image URL
    },
      {
        id: 'class3',
        title: 'Gourmet Cooking',
        description: 'Master the art of cooking gourmet dishes.',
        image: require('../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg'), // Replace with your own image URL
    },
    ],
    venues: [
      {
        id: 'venue1',
        title: 'Lakeside Hall',
        description: 'A serene lakeside venue perfect for events and gatherings.',
        image: require('../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg'), // Replace with your own image URL
    },
      {
        id: 'venue2',
        title: 'Mountain View Terrace',
        description: 'Enjoy the best views for your events on our mountain terrace.',
        image: require('../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg'), // Replace with your own image URL
    },
      {
        id: 'venue3',
        title: 'City Lights Banquet',
        description: 'A modern venue located at the heart of the city with stunning night views.',
        image: require('../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg'), // Replace with your own image URL
    },
    ],
    // ...other categories
  
  // ...other categories
};

const CategoryCard = ({ item, image }) => {
  return (
    <TouchableOpacity style={tw`mr-4 bg-white rounded-xl overflow-hidden shadow-lg `}>
      <Image source={image} style={tw`h-36 w-full`} resizeMode="cover" />
      <View style={tw`p-3`}>
        <Text style={tw`text-lg font-semibold `}>{item.title}</Text>
        <Text style={tw`text-sm`}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const CategorySection = ({ title, items }) => {
  return (
    <View style={tw`mt-2 p-4`}>
      <Text style={tw`text-xl font-semibold mb-4`}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`pl-2`}>
        {items.map((item) => (
          <CategoryCard key={item.id} item={item} image={item.image} />
        ))}
      </ScrollView>
    </View>
  );
};

const ExploreScreen = () => {
    const navigation = useNavigation();
  
    const handleCreateTemplatePress = () => {
      navigation.navigate('TemplateScreen'); // Navigate to the Templates screen
    };
  
    return (
      <View style={tw`bg-gray-100 flex-1`}>
        <View style={tw`flex-row justify-between items-center p-4`}>
          <Text style={tw`text-2xl font-bold`}>Explore Templates</Text>
          <TouchableOpacity
            style={tw`bg-purple-500 px-4 py-2 rounded-lg shadow-md`}
            onPress={handleCreateTemplatePress} // Call handleCreateTemplatePress when button is pressed
          >
            <Text style={tw`text-white font-semibold`}>Create a Template</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {Object.entries(categories).map(([key, items]) => (
            <CategorySection key={key} title={key.charAt(0).toUpperCase() + key.slice(1)} items={items} />
          ))}
        </ScrollView>
      </View>
    );
  };
  
  export default ExploreScreen;