import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

const ChatComponent = ({ id, lastMessage, user }) => {
    const navigation = useNavigation();

    const click = () => {
        navigation.navigate('ChatRoom', { user });
    };

    return (
        <TouchableOpacity onPress={click} style={[tw`flex-row items-center p-4 rounded-lg`, styles.card]}>
            <Image source={{ uri: user.profile }} style={tw`h-12 w-12 rounded-full`} />
            <View style={tw`flex-1 ml-4`}>
                <Text style={tw`text-lg font-bold`}>{user.name}</Text>
                <Text numberOfLines={1} style={tw`text-gray-600`}>{lastMessage.content}</Text>
            </View>
            <View style={tw`items-end`}>
                <Text style={tw`text-gray-600`}>14:53</Text>
                <View style={tw`flex-row items-center mb-2`}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>2</Text>
                    </View>
                </View>
                <View style={tw`flex-row items-center`}>
                    <FontAwesome name="user-circle" size={15} color="gray" />
                    <Text style={tw`text-gray-600 ml-1`}>15</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    badge: {
        backgroundColor: '#12B9F3',
        borderRadius: 12,
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
    },
    badgeText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default ChatComponent;
