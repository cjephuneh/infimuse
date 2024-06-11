import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slice/auth/authSlice";
import Toast from "react-native-toast-message";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";



const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [credentials, setCredentials] = useState({
    email: "calebjephuneh@gmail.com",
    password: "Gethsemane0#",
  });
  const [loading, setLoading] = useState(false);
  const [showOTPField, setShowOTPField] = useState(false); // State to control OTP field visibility

  useEffect(() => {
    // Check if the user has already logged in before
    const checkFirstLogin = async () => {
      try {
        const hasLoggedInBefore = await AsyncStorage.getItem('hasLoggedInBefore');
        if (!hasLoggedInBefore) {
          // If not, show the OTP field
          setShowOTPField(true);
        }
      } catch (error) {
        console.error('Error checking first login:', error);
      }
    };

    checkFirstLogin();
  }, []); // Run only once on component mount

  const handleInputChange = (name, value) => {
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignIn = async () => {
    setLoading(true);
    const storedOTP = await AsyncStorage.getItem("OTP");
    const userData = { ...credentials, OTP: storedOTP };
  
    dispatch(login(userData))
      .unwrap()
      .then(async (response) => {
        // Save the token in AsyncStorage
        await AsyncStorage.setItem('token', response.token);

        console.log('Token:', response.token);
  
        // Show success message
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Login Successful",
          text2: response.message,
          visibilityTime: 4000,
        });
        
        setLoading(false);
        navigation.navigate("Main");
          // Set a flag in AsyncStorage indicating that the user has logged in before
        await AsyncStorage.setItem('hasLoggedInBefore', 'true');
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          position: "bottom",     
          text1: "Login Failed",
          text2: error.message || "An error occurred",
          visibilityTime: 4000,
        });
        setLoading(false);
      });
  };
  
  const decodeToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        console.log('Decoded JWT:', decoded);
        // Store the decoded token in AsyncStorage
        await AsyncStorage.setItem('decodedToken', JSON.stringify(decoded));
      } else {
        console.log('No token found');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };
  
  decodeToken();  // Call decodeToken when the component mounts


  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <KeyboardAvoidingView
        style={tw`flex-1 py-3 px-4 bg-white `}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={tw`flex-grow`}
          contentContainerStyle={tw`justify-center`}
        >
          <View
            style={tw`w-full flex-1 justify-center items-center px-4 mt-10`}
          >
            <Icon name="comments" size={60} color="#A72C76" style={tw`mb-10`} />
            <Text
              style={[
                tw`text-4xl font-bold mb-10 text-center `,
                { color: "#A72C76" },
              ]}
            >
              Sign In
            </Text>

            <View style={tw`w-full mb-6`}>
              <TextInput
                style={tw`border-b border-gray-400 w-full px-4 py-2 text-lg`}
                placeholder="Email"
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholderTextColor="#9a9a9a"
                value={credentials.email}
                onChangeText={(text) => handleInputChange("email", text)}
              />
            </View>

            <View style={tw`w-full mb-8`}>
              <TextInput
                style={tw`border-b border-gray-400 w-full px-4 py-2 text-lg`}
                placeholder="Password"
                secureTextEntry
                textContentType="password"
                placeholderTextColor="#9a9a9a"
                value={credentials.password}
                onChangeText={(text) => handleInputChange("password", text)}
              />
            </View>
            {showOTPField && (
              <View style={tw`w-full mb-8`}>
                <TextInput
                  style={tw`border-b border-gray-400 w-full px-4 py-2 text-lg`}
                  placeholder="Enter OTP"
                  keyboardType="numeric"
                  placeholderTextColor="#9a9a9a"
                  onChangeText={(text) => handleInputChange("OTP", text)}
                />
              </View>
            )}

            <TouchableOpacity
              style={tw`self-end mb-6`}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={tw`text-blue-500`}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: "100%",
                borderRadius: 9999, // large value to make it a circle
                backgroundColor: "#12B9F3",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 15, // adjust padding as needed
                marginTop: 20, // adjust margin as needed
                marginBottom: 6, // adjust margin as needed
              }}
              onPress={handleSignIn}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={tw`text-white text-center text-lg`}>Sign In</Text>
              )}
            </TouchableOpacity>

            <Text style={tw`text-sm mb-4 text-center`}>Or Sign In With:</Text>

            <View style={tw`h-1 bg-gray-200 my-4 w-full rounded-full`} />

            <View style={tw`flex-row justify-around w-full mb-10`}>
              <TouchableOpacity style={tw`p-3`}>
                <Icon name="facebook-f" size={24} color="#3b5998" />
              </TouchableOpacity>

              <TouchableOpacity style={tw`p-3`}>
                <Icon name="google" size={24} color="#A72C76" />
              </TouchableOpacity>

              <TouchableOpacity style={tw`p-3`}>
                <Icon name="apple" size={24} color="#333333" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={tw`w-full pb-6 px-4`}>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={tw`text-center`}>
                Don’t Have An Account?{" "}
                <Text
                  style={[tw`text-pink-600 font-bold`, { color: "#A72C76" }]}
                >
                  Sign Up
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default SignInScreen;
