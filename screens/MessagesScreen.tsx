import React from 'react';
import { FlatList, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import ChatComponent from '../components/community/ChatComponent';
import { View, Text } from '../components/Themed';
import { Chat, RootTabScreenProps } from '../types';
import { Fontisto } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const chatsHistory: Array<Chat> = [
    {
        id: 'rirnif',
        user: {
            name: 'Guitar Lessons',
            id: 'sdfgfg',
            lastSeen: 123455,
            profile: 'https://images.pexels.com/photos/10840765/pexels-photo-10840765.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        lastMessage: {
            id: 'sdfwe',
            content: 'Sat,25th Jun  12:00 PM',
            createdAt: Date.now()
        }
    },
    {
        id: 'sdfwe',
        user: {
            name: 'Dancing Classes',
            id: 'sdfgfg',
            lastSeen: 123455,
            profile: 'https://images.pexels.com/photos/10840765/pexels-photo-10840765.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        lastMessage: {
            id: 'sdfwe',
            content: 'Mon, 28th Jun  12:00 PM',
            createdAt: Date.now()
        }
    },
    {
        id: 'sdfwe',
        user: {
            name: 'Cooking Classes',
            id: 'sdfgfg',
            lastSeen: 123455,
            profile: 'https://images.pexels.com/photos/10840765/pexels-photo-10840765.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        lastMessage: {
            id: 'sdfwe',
            content: 'Wed, 30th Jun  12:00 PM',
            createdAt: Date.now()
        }
    },
    {
        id: 'sdfwe',
        user: {
            name: 'Introduction to Singing',
            id: 'sdfgfg',
            lastSeen: 123455,
            profile: 'https://images.pexels.com/photos/10840765/pexels-photo-10840765.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        lastMessage: {
            id: 'sdfwe',
            content: 'Thurs, 24th Jun  12:00 PM',
            createdAt: Date.now()
        }
    },
];

const ChatsScreen = ({ navigation }: RootTabScreenProps<'Chats'>) => {
    return (
        <View style={tw`flex-1`}>
            {/* Tab navigation items */}
            <View style={tw`flex-row justify-around bg-white`}>
                <TouchableOpacity style={tw`flex-1 items-center p-2`}>
                    <Text style={tw`text-gray-900`}>All </Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex-1 items-center p-2`}>
                    <Text style={tw`text-gray-900`}>Sessions </Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex-1 items-center p-2`}>
                    <Text style={tw`text-gray-900`}>Workshops</Text>
                </TouchableOpacity>
            </View>

            {/* Chats list */}
            <View style={tw`flex-1 relative bg-gray-200 `}>
                <FlatList 
                    data={chatsHistory}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <ChatComponent user={item.user} id="hhd7dhd78d" lastMessage={item.lastMessage}/>
                    )}
                />
                {/* <TouchableOpacity style={[tw`absolute bottom-6 right-6 rounded-full h-14 w-14 flex items-center justify-center`, {backgroundColor: Colors.light.tint}]}>
                    <Fontisto name="camera" size={20} color="white" />
                </TouchableOpacity> */}
            </View>
        </View>
    );
}

export default ChatsScreen;
