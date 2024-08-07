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
import StaffDrawer from '../components/StaffDrawer'; // Import your custom drawer content component
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
import TermsSreen from '../screens/TermsScreen';
import TemplateDetailScreen from '../screens/TemplateDetailScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ClassScheduleScreen from '../screens/listings/Schedules/ClassScheduleScreen';
import CreateExperienceScreen from '../screens/listings/CreateExperienceScreen';
// import CreateVenueScreen from '../screens/listings/CreateVenueScreen';
import VenueScheduleScreen from '../screens/listings/Schedules/VenueScheduleScreen';
import ExperienceScheduleScreen from '../screens/listings/Schedules/ExperiencesScheduleScreen';
import WorkshopScheduleScreen from '../screens/listings/Schedules/WorkshopScheduleScreen';
import PackageScheduleScreen from '../screens/listings/Schedules/PackagesScheduleScreen';
import HistoryScreen from '../screens/UpcomingScreen';
import UpcomingScreen from '../screens/HistoryScreen';
import SessionScreen from '../screens/SessionScreen'; 
import QrCodeScreen from '../screens/qrcodereader'
import CommunityScreen from '../screens/CommunityScreen';
// import ListingScreen from '../screens/';
import WalletScreen from '../screens/WalletScreen';
import CalenderScreen from '../screens/CalenderScreen';
import InsightsScreen from '../screens/InsightsScreen';
import PricingScreen from '../screens/pricingScreen';
import ChatRoom from '../screens/ChatRoom';
import PrivacyScreen from '../screens/PrivacyScreen';
import RefundScreen from '../screens/RefundScreen';
import SubscriptionsScreen from '../screens/SubscriptionsScreen';
import DeleteAccScreen from '../screens/DeleteAccScreen';
import DayExperiencesScreen from '../screens/listings/DayexperiencesScreen';
import ViewTemplateScreen from '../screens/ViewTemplateScreen';
import StaffDashboardScreen from '../screens/StaffScreens/Staff_Dashboard';
import StaffSignUp from '../screens/StaffScreens/Staff_SignUp'; 
import StaffSignIn from '../screens/StaffScreens/Staff_Signin';
import StaffProfile from '../screens/StaffScreens/Staff_ProfileScreen';
import SignInOptions from '../screens/SignInAsScreen';
import StaffInsights from '../screens/StaffScreens/StaffInsightScreen';
import StaffWallet from '../screens/StaffScreens/StaffWallet';
import MessagesScreen from '../screens/MessagesScreen';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="CreateClasses" component={CreateClassesScreen} />
    </Drawer.Navigator>
  );
}

function Staff() {
  return (
    <Drawer.Navigator drawerContent={(props) => <StaffDrawer {...props} />}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      {/* <Drawer.Screen name="CreateClasses" component={CreateClassesScreen} /> */}
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

        {/* Here we include the staff screen */}
        <Stack.Screen name="SignInOptions" component={SignInOptions} />
        
        <Stack.Screen name="StaffScreen" component={StaffScreen} />

        {/* Here we include the authentication screens */}
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />

        {/* Here we include the Profile Screen */}
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="SessionScreen" component={SessionScreen} />
        
        {/* Here we include the Term Screen */}
        <Stack.Screen name="TermsScreen" component={TermsSreen} />


        {/* Here we include the Template Detail Screen */}
        <Stack.Screen name="TemplateDetailScreen" component={TemplateDetailScreen} />
        <Stack.Screen name="DayExperiencesScreen" component={DayExperiencesScreen} />
        <Stack.Screen name="ViewTemplateScreen" component={ViewTemplateScreen} />

        {/* Here we include the Schedule Screen */}
        <Stack.Screen name="ClassScheduleScreen" component={ClassScheduleScreen} />
        <Stack.Screen name="VenueScheduleScreen" component={VenueScheduleScreen} />
        <Stack.Screen name="ExperienceScheduleScreen" component={ExperienceScheduleScreen} />
        <Stack.Screen name="WorkshopScheduleScreen" component={WorkshopScheduleScreen} />
        <Stack.Screen name="PackageScheduleScreen" component={PackageScheduleScreen} />



        {/* Here is where we include the Drawer Navigator */}
        <Stack.Screen name="Main" component={MainDrawer} />
        <Stack.Screen name="Staff" component={Staff} />
      


        {/* Here we    jsdnfhsdvnjf =================================================================================  include the Schedule Screen */} 
        <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} /> 
        <Stack.Screen name="WalletScreen" component={WalletScreen} /> 


        {/* Here we include the Staff Screens */}
        <Stack.Screen name="StaffDashboardScreen" component={StaffDashboardScreen} />
        <Stack.Screen name="StaffSignUp" component={StaffSignUp} />
        <Stack.Screen name = "StaffSignIn" component={StaffSignIn} />
        <Stack.Screen name = "StaffProfile" component={StaffProfile} />
        <Stack.Screen name = "StaffInsights" component={StaffInsights} />
        <Stack.Screen name = "StaffWallet" component={StaffWallet} />




        {/* sidebar screens */}
        <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
        <Stack.Screen name="RefundScreen" component={RefundScreen} />
        <Stack.Screen name="SubscriptionsScreen" component={SubscriptionsScreen} />
        <Stack.Screen name="DeleteAccScreen" component={DeleteAccScreen} />



        <Stack.Screen name="ChatRoom" component={ChatRoom} />
        {/* Here we include the History Screen */}
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} />

        {/* Here we include the Upcoming Screen */}
        <Stack.Screen name="UpcomingScreen" component={UpcomingScreen} />
        <Stack.Screen name="CalenderScreen" component={CalenderScreen} />
        <Stack.Screen name="InsightsScreen" component={InsightsScreen} />
        <Stack.Screen name="PricingScreen" component={PricingScreen} />






        <Stack.Screen name="QrCodeScreen" component={QrCodeScreen} />
        <Stack.Screen name="CommunityScreen" component={CommunityScreen} />
        <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
        



        <Stack.Screen name="TemplateScreen" component={TemplateScreen} />
        <Stack.Screen name="CreateClassesScreen" component={CreateClassesScreen} />
        <Stack.Screen name="CreatePackagesScreen" component={CreatePackagesScreen} />
        <Stack.Screen name="CreateWorkshopScreen" component={CreateWorkshopScreen} />
        <Stack.Screen name="CreateVenueScreen" component={CreateVenueScreen} />
        <Stack.Screen name="CreateTemplatesScreen" component={CreateTemplatesScreen} />
        <Stack.Screen name="CreateExperienceScreen" component={CreateExperienceScreen} />


        <Stack.Screen name="CreateClassesSuccessScreen" component={CreateClassesSuccessScreen} />
        <Stack.Screen name="CreateWorkshopClassesScreen" component={CreateWorkshopClassesScreen} />
        <Stack.Screen name="CreatePackagesSuccessScreen" component={CreatePackagesSuccessScreen} />
        <Stack.Screen name="CreateWorkshopSuccessScreen" component={CreateWorkshopSuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
