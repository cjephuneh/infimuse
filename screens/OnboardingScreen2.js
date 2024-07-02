import React, { useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;



  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SafeAreaView style={tw`flex-1 justify-around bg-white `}>

          <View style={tw`mt-10 flex-row justify-center`}>
            <Image
              source={require("../assets/smartphone-slider.png")}
              style={{ width: wp(70), height: wp(75) }}
            />
          </View>

          <View style={tw`px-6`}>
            <Text style={tw`text-4xl font-bold mb-2 text-gray-800 text-center`}>
            Build  Personalized Communities
            </Text>
          </View>


        {/* Pagination dots */}
        <View style={tw`flex-row justify-center mb-2`}>
          <View style={tw`h-2 w-2 bg-gray-300 rounded-full mx-1`} />
          <View style={tw`h-2 w-2 bg-gray-300 rounded-full mx-1`} />
          <View style={tw`h-2 w-2 bg-blue-500 rounded-full mx-1`} />
        </View>

        {/* Next button */}
        <TouchableOpacity
          style={[
            tw`py-3 px-6 bg-blue-500 rounded-full shadow-md mb-6`,
            { width: wp(40), alignSelf: "center" },
          ]}
        >
          <Text style={tw`text-white font-semibold text-lg text-center`}
            onPress={() => navigation.navigate("SignIn")}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}
