// HomeTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import QrScanner from '../screens/qrcodereader'; // Adjust the import path accordingly
// import AnotherScreen from './AnotherScreen'; // Adjust the import path accordingly

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={QrScanner}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Another"
        component={AnotherScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="star" color={color} size={size} />
          ),
        }}
      /> */}
      {/* Add more tabs if needed */}
    </Tab.Navigator>
  );
};

export default HomeTabs;
