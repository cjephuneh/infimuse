import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames';

// Placeholder data for the cards
const cardsData = [
  {
    id: '1',
    title: 'Get ready for your first guests',
    image: require('../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg'), // Replace with your own image URL
  },
  {
    id: '2',
    title: 'Get ready for your first guests',
    image: require('../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg'), // Replace with your own image URL
  },
  {
    id: '3',
    title: 'Get ready for your first guests',
    image: require('../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg'), // Replace with your own image URL
  },
  // Add more cards as needed
];

const Card = ({ title, image }) => (
  <View style={tw`m-2 w-72 shadow-md bg-white rounded-lg overflow-hidden`}>
    <Image source={image} style={tw`h-48 w-full`} resizeMode="cover" />
    <View style={tw`p-4`}>
      <Text style={tw`text-lg text-gray-900 font-semibold mb-2`}>{title}</Text>
      <View style={tw`flex flex-row items-center`}>
        <View style={[tw`h-4 w-4 rounded-full mr-2`, { backgroundColor: '#A72C76' }]} /> 
        {/* Changed the background color to #A72C76 */}
        <Text style={tw`text-sm text-gray-600`}>New</Text>
      </View>
    </View>
  </View>
);

const App = () => {
  return (
    <FlatList
      data={cardsData}
      renderItem={({ item }) => <Card title={item.title} image={item.image} />}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={tw`p-2`}
    />
  );
};

export default App;
