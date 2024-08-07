import { AntDesign, Entypo, FontAwesome5, Fontisto, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ImageBackground, Text, View, Dimensions, StyleSheet, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Message } from '../types';
import Ripple from 'react-native-material-ripple';

const greenColor = '#18BDFA';
const loggedInUser = 'sdfgfg';

const IconButton: React.FC<{[key: string]: any}> = (props) => {
    return (
        <Ripple rippleContainerBorderRadius={30} rippleCentered style={tw`rounded-full ${props.x1 ? 'ml-' + props.x1 : ''} p-2 ${props.x2 ? 'ml-' + props.x2 : ''}`} {...props}>
            {props.children}
        </Ripple>
    );
};

const MessageComponent: React.FC<Message> = ({user, createdAt, content, id}) => {
    return (
        <View style={tw`px-2`}>
            <View style={[{backgroundColor: user?.id === loggedInUser ? greenColor : 'white', width: '85%'}, tw`relative ${user?.id === loggedInUser ? 'ml-auto' : ''} rounded-md mb-2`]}>
                <View style={tw`p-2`}>
                    <Text style={tw`font-semibold`}>{content}</Text>
                    <Text style={[tw`text-right text-xs`, {color: '#9D9E9E'}]}>10:34</Text>
                </View>
                <View style={[tw`absolute ${user?.id === loggedInUser ? '-mr-1 right-0' : '-ml-2'}`, style.triangle, {borderBottomColor: user?.id === loggedInUser ? greenColor : 'white'}, {transform: [{ rotate: "-63deg" }]}]}></View>
            </View>
        </View>
    );
};

const messages: Message[] = [
    {
        id: 'qwe',
        content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo soluta nulla nesciunt ab eum dolorem quasi?',
        createdAt: Date.now(),
        user: {
            name: 'Itumeleng',
            id: 'sdfgfg',
            lastSeen: Date.now()
        }
    },
    {
        id: 'asd',
        content: 'Lorem ipsum, dolor sit amet consectetur adipisicing',
        createdAt: Date.now(),
        user: {
            name: 'John',
            id: 'aaaas',
            lastSeen: Date.now()
        }
    },
    {
        id: 'zxc',
        content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo soluta nulla nesciunt ab eum dolorem quasi?',
        createdAt: Date.now(),
        user: {
            name: 'Itumeleng',
            id: 'sdfgfg',
            lastSeen: Date.now()
        }
    }
];

const ChatRoom: React.FC = () => {
    const [text, setText] = useState<string>('');

    return (
        <ImageBackground  resizeMode="cover" style={tw`h-full`}>
            {/* Add the image component at the top */}
            <View style={tw`bg-blue-500 flex-row items-center p-4`}>
                <Image
                    source={{ uri: 'https://images.pexels.com/photos/10840765/pexels-photo-10840765.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}  // Replace with your image URL
                    style={tw`h-10 w-10 rounded-full`}
                />
                <Text style={tw`text-white text-xl ml-4 `}>Introduction to Singing</Text>
            </View>

            <View style={tw`py-2 flex px-2 flex-1`}>
                <FlatList 
                    style={tw`flex-1`}
                    data={messages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item: {user, content, createdAt, id}})=> {
                        return (
                            <MessageComponent id={id} user={user} content={content} createdAt={createdAt}/>
                        );
                    }}
                />
                <View style={tw`flex flex-row items-center`}>
                    <View style={tw`bg-white flex-1 flex flex-row px-1 items-center h-12 rounded-full`}>
                        <IconButton>
                            <FontAwesome5 name="laugh-beam" size={24} color="#868A91"/>
                        </IconButton>
                        <TextInput value={text} onChangeText={setText} style={[{fontSize: 16}, tw`flex-1 pl-2`]} placeholder='Type a message...'/>
                        <IconButton>
                            <Entypo name="attachment" size={22} color="#868A91"/>
                        </IconButton>
                        <IconButton x1={1}>
                            <Fontisto name="camera" size={22} color="#868A91"/>
                        </IconButton>
                    </View>
                    {text ? (
                        <Ripple rippleContainerBorderRadius={30} onPress={() => setText('')} rippleCentered style={[tw`p-3 rounded-full ml-2`, {backgroundColor: '#00897B'}]}>
                            <MaterialIcons name="send" size={24} color="white" />
                        </Ripple>
                    ) : (
                        <Ripple rippleContainerBorderRadius={30} rippleCentered style={[tw`p-3 rounded-full ml-2`, {backgroundColor: '#00897B'}]}>
                            <MaterialIcons name="keyboard-voice" size={24} color="white" />
                        </Ripple>
                    )}
                </View>
            </View>
        </ImageBackground>
    );
};

export default ChatRoom;

const style = StyleSheet.create({
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 8,
        borderRightWidth: 5,
        borderBottomWidth: 10,
        marginTop: -1.4,
        elevation: -3,
        borderLeftColor: "transparent",
        borderRightColor: "transparent"
    }
});
