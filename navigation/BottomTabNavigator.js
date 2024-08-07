import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CalenderScreen from '../screens/CalenderScreen';
import InsightScreen from '../screens/InsightsScreen';
import ListingScreen from '../screens/CreateTemplatesScreen';
import PricingScreen from '../screens/pricingScreen';
import QrScanner from '../screens/qrcodereader'
import Messagescreen from '../screens/MessagesScreen';
import CommunityScreen from '../screens/CommunityScreen';
import WalletScreen from '../screens/WalletScreen';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSize = focused ? size * 1.25 : size; // Increase size when focused
          let iconStyle = focused ? { marginBottom: -3 } : {}; // Lift the icon a bit when focused

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Pricing') {
            iconName = 'dollar-sign';
          } else if (route.name === 'Schedule') {
            iconName = 'calendar-alt';
          } else if (route.name === 'Insight') {
            iconName = 'chart-line';
          } else if (route.name === 'listings') {
            iconName = 'list';
          } else if (route.name ==='Qrcode'){
            iconName = 'qrcode'
          } else if (route.name === 'Community') {
            iconName = 'users';
          }else if (route.name === 'Messages') {
            iconName = 'messages';
          }else if (route.name === 'Wallet') {
            iconName = 'wallet';
          }


          return <Icon name={iconName} size={iconSize} color={color} style={iconStyle} />;
        },
        tabBarActiveTintColor: '#A72C76',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          height: 60, // Increase tab bar height if needed
          paddingBottom: 5, // Add padding at the bottom for better ergonomics
          paddingTop: 5, // Add padding at the top
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Calender" component={CalenderScreen} /> */}
      {/* <Tab.Screen name="listings" component={ListingScreen} /> */}
      {/* <Tab.Screen name="Insight" component={InsightScreen} /> */}
      {/* <Tab.Screen name="Pricing" component={PricingScreen} /> */}
      {/* <Tab.Screen name='Messages' component={ProfileScreen}/> */}
      <Tab.Screen name='Schedule' component={CalenderScreen}/>
      <Tab.Screen name="Qrcode" component={QrScanner} />
      {/* <Tab.Screen name='Wallet' component={WalletScreen}/> */}
      <Tab.Screen name='Messages' component={Messagescreen}/>
      <Tab.Screen name="Community" component={CommunityScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
