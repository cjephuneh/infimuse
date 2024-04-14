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
import TemplateScreen from '../screens/TemplatesScreen';
import CreateClassesScreen from '../screens/listings/CreateClassesScreen';
import CreatePackagesScreen from '../screens/listings/CreatePackagesScreen';
import CreateWorkshopScreen from '../screens/listings/CreateWorkshopScreen';
import CreateVenueScreen from '../screens/listings/CreateVenueScreen';
import CreateClassesSuccessScreen from '../screens/listings/sucessScreens/CreateClassesSuccessScreen';
import CreatePackagesSuccessScreen from '../screens/listings/sucessScreens/CreatePackagesSuccessScreen';
import CreateWorkshopSuccessScreen from '../screens/listings/sucessScreens/CreateWorkshopSuccessScreen';
import CreateTemplatesScreen from '../screens/CreateTemplatesScreen';
import CreateWorkshopClassesScreen from '../screens/listings/CreateWorkshopClassesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />

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

        {/* Here we include the Profile Screen */}
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />


        {/* Here is where we include the Drawer Navigator */}
        <Stack.Screen name="Main" component={MainDrawer} />

        <Stack.Screen name="TemplateScreen" component={TemplateScreen} />
        <Stack.Screen name="CreateClassesScreen" component={CreateClassesScreen} />
        <Stack.Screen name="CreatePackagesScreen" component={CreatePackagesScreen} />
        <Stack.Screen name="CreateWorkshopScreen" component={CreateWorkshopScreen} />
        <Stack.Screen name="CreateVenueScreen" component={CreateVenueScreen} />
        <Stack.Screen name="CreateTemplatesScreen" component={CreateTemplatesScreen} />

        <Stack.Screen name="CreateClassesSuccessScreen" component={CreateClassesSuccessScreen} />
        <Stack.Screen name="CreateWorkshopClassesScreen" component={CreateWorkshopClassesScreen} />
        <Stack.Screen name="CreatePackagesSuccessScreen" component={CreatePackagesSuccessScreen} />
        <Stack.Screen name="CreateWorkshopSuccessScreen" component={CreateWorkshopSuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
