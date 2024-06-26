import React from 'react';
import { View, Image, Pressable } from 'react-native';
import ProfileImage from './HeaderProfileImage';

const Header = () => {
    return (
        <View style={{justifyContent: "space-between", flexDirection: 'row', alignItems: 'center', borderBottomWidth: .5, borderBottomColor: 'rgba(0, 0, 0, .2)', paddingBottom: 5, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#fff'}}>
            <ProfileImage isNotification={true} />
            <Pressable >
                {/* <Image source={require("../assets/InfiMuse-01.png")} style={{width: 27, height: 22, resizeMode: 'cover'}} /> */}
            </Pressable>
            <Image source={require("../../assets/InfiMuse-01.png")} style={{width: 32, height: 35, resizeMode: 'cover'}} />
        </View>
    )
}

export default Header;