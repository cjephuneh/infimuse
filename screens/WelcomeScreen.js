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

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SafeAreaView style={tw`flex-1 justify-around bg-white `}>
        <Animated.View
          style={[tw`flex-row justify-center`, { opacity: fadeAnim }]}
        >
          <View style={tw`mt-10`}>
            <Image
              source={require("../assets/InfiMuse-01.png")}
              style={{ width: wp(100), height: wp(75) }}
            />
          </View>
        </Animated.View>

        <TouchableOpacity
          onPress={() => navigation.navigate("OnboardingScreen")}
          style={[tw`mx-5 p-4 rounded-2xl mt-10`, { backgroundColor: "#12B9F3" }]}
        >
          <Text
            style={[
              tw`text-center font-bold text-white text-2xl`,
              { fontSize: wp(6) },
            ]}
          >
            Get Started
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("SignIn")}
          style={[tw`mx-5 rounded-2xl `]}
        >
          <Text
            style={[
              tw`text-center font-bold text-2xl`,
              { fontSize: wp(6), color: "#12B9F3" },
            ]}
          >
            Login
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}
