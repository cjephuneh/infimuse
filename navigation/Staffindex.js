// AppDrawer.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StaffDrawer from '../components/StaffDrawer'; // Adjust the import path accordingly
import StaffBottomNavigator from './StaffBottomNavigator'; // Adjust the import path accordingly

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <StaffDrawer {...props} />}>
      <Drawer.Screen name="StaffBottomNavigator" component={StaffBottomNavigator} />
      {/* Add more screens here if needed */}
    </Drawer.Navigator>
  );
};

export default AppDrawer;
