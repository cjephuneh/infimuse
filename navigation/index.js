import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignIn from '../screens/auth/Signin';
import SignUp from '../screens/auth/SignUp';
import WelcomeScreen from '../screens/WelcomeScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPass';
import OtpVerificationScreen from '../screens/auth/OtpVerificationScreen';
import BottomTabNavigator from './BottomTabNavigator';
import OnboardingScreen from '../screens/OnboardingScreen';
import SecondOnboardingScreen from '../screens/OnboardingScreen1';
import ThirdOnboardingScreen from '../screens/OnboardingScreen2';
import StaffScreen from '../screens/staffScreen';
import CustomDrawerContent from '../components/CustomDrawerContent'; // Import your custom drawer content component

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      {/* <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
      {/* Add more screens to the drawer */}
    </Drawer.Navigator>
  );
}

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />

        {/* Here we include the onboarding screens */}
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="SecondOnboardingScreen" component={SecondOnboardingScreen} />
        <Stack.Screen name="ThirdOnboardingScreen" component={ThirdOnboardingScreen} />
        
        <Stack.Screen name="StaffScreen" component={StaffScreen} />

        {/* Here we include the authentication screens */}
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
        {/* Here is where we include the Drawer Navigator */}
        <Stack.Screen name="Main" component={MainDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
