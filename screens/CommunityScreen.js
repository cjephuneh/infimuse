import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Post = ({ post }) => (
  <View className="bg-white rounded-lg shadow-md mb-4 p-4">
    <View className="flex-row items-center mb-2">
      <Image
        source={{ uri: post.user.profilePicture }}
        className="w-8 h-8 rounded-full mr-2"
      />
      <Text className="font-semibold text-gray-800">{post.user.name}</Text>
    </View>
    <Text className="text-gray-700 mb-4">{post.content}</Text>
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center">
        <FontAwesome name="heart" size={16} color="#4B5563" />
        <Text className="text-gray-600 ml-2">{post.likes}</Text>
      </View>
      <View className="flex-row items-center">
        <FontAwesome name="comment" size={16} color="#4B5563" />
        <Text className="text-gray-600 ml-2">{post.comments.length}</Text>
      </View>
    </View>
  </View>
);

const CommunityScreen = () => {
  const posts = [
    {
      id: 1,
      user: {
        name: 'John Doe',
        profilePicture: 'https://randomuser.me/api/portraits/men/75.jpg',
      },
      content: 'Just had an amazing workout CIass at ! 💪',
      likes: 25,
      comments: [
        { id: 1, user: 'Jane Smith', comment: 'Keep it up!' },
        { id: 2, user: 'Bob Johnson', comment: 'Awesome! ' },
      ],
    },
    {
      id: 2,
      user: {
        name: 'Emily Davis',
        profilePicture: 'https://randomuser.me/api/portraits/women/42.jpg',
      },
      content: 'This is to remind you that our sipping and code CIass has been postponed ☕️',
      likes: 18,
      comments: [
        { id: 1, user: 'Michael Brown', comment: 'Noted!' },
      ],
    },
    // Add more posts as needed
  ];

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ScrollView>
    </View>
  );
};

export default CommunityScreen;