// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CalenderScreen from '../screens/CalenderScreen';
import InsightScreen from '../screens/InsightsScreen';
// ... import other screens

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
          } else if (route.name === 'Profile') {
            iconName = 'user-alt';
          } else if (route.name === 'Calender') {
            iconName = 'calendar-alt';
          } else if (route.name === 'Insight') {
            iconName = 'chart-line';
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
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Calender" component={CalenderScreen} />
      <Tab.Screen name="Insight" component={InsightScreen} />
      {/* Add other tabs with respective screens and icons */}
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
