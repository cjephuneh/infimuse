import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Switch, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import ProfileScreen from '../screens/ProfileScreen';

const CustomDrawerContent = (props) => {
  // Define your switch state and toggle function here
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const navigation = useNavigation();


  const toggleSwitch = () => setNotificationsEnabled(previousState => !previousState);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* User info, adjust styles as needed */}
        <Image 
          source={require("../assets/man.png")} 
          style={styles.userImage} 
        />
        <Text style={styles.userName}>Jenna Madelynn</Text>
        <Text style={styles.userLocation}>New York, US</Text>
        {/* Other header content */}
      </View>
      {/* Drawer Items */}
      {drawerItems.map((item, index) => (
        <TouchableOpacity
        key={index}
        style={styles.itemContainer}
        onPress={() => navigation.navigate('ProfileScreen')} // Navigate to ProfileScreen
      >
        <Icon name={item.icon} size={20} color="#4B5563" />
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
      
      ))}
      {/* Notifications Switch */}
      <View style={styles.switchContainer}>
        <Text style={styles.itemText}>Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={notificationsEnabled}
        />
      </View>
      {/* Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Finance Management Version 1.0.1</Text>
      </View>
    </ScrollView>
  );
};

// Add your drawer items here
const drawerItems = [
  { name: 'Finance PRO', icon: 'wallet' },
  { name: 'Account', icon: 'user-circle' },
  { name: 'Data Usage', icon: 'chart-bar' },
  { name: 'Scan QR Code', icon: 'qrcode' },
  // ... add other items
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#6B4EFF', // Adjust the color to match the design
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userLocation: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED', // Adjust the color to match the design
  },
  itemText: {
    color: '#4B5563', // Adjust the color to match the design
    marginLeft: 15,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  footerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  footerText: {
    color: '#9CA3AF', // Adjust the color to match the design
    fontSize: 14,
  },
});

export default CustomDrawerContent;
