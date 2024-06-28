import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Switch, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { fetchCurrentHost } from '../redux/slice/host/hostService'; // Import fetchCurrentHost function
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawerContent = (props) => {
  const [hostData, setHostData] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetchCurrentHost(token);
        setHostData(response.Data);
      } catch (error) {
        console.error('Error fetching host data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleSwitch = () => setNotificationsEnabled(previousState => !previousState);

  const handleLogout = async () => {
    try {
      // Perform logout actions, e.g., clear async storage, navigate to login screen
      await AsyncStorage.removeItem('token');
      navigation.navigate('SignUp'); // Navigate to your login screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // const handleDeleteAccount = async () => {
  //   try {
  //     // Perform account deletion actions, e.g., delete user data, navigate to login screen
  //     await AsyncStorage.clear(); // Clear all stored data (adjust as per your app's logic)
  //     navigation.navigate('LoginScreen'); // Navigate to your login screen
  //   } catch (error) {
  //     console.error('Error deleting account:', error);
  //   }
  // };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* User info */}
        <Image source={require("../assets/man.png")} style={styles.userImage} />
        {hostData && (
          <View>
            <Text style={styles.userName}>{hostData.firstName}</Text>
            <Text style={styles.userLocation}>{hostData.phone}</Text>
          </View>
        )}
        {/* Other header content */}
      </View>
      {/* Drawer Items */}
      {drawerItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.itemContainer}
          onPress={() => navigation.navigate(item.screen)}
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
      {/* <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Infimuse Beta 1.0.1</Text>
      </View> */}
      {/* Logout and Delete Account Buttons */}
      <TouchableOpacity style={styles.itemContainer} onPress={handleLogout}>
        <Icon name="sign-out-alt" size={20} color="#4B5563" />
        <Text style={styles.itemText}>Log out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemContainer}
      onPress={() => navigation.navigate('DeleteAccScreen')} >
        <Icon name="trash-alt" size={20} color="#4B5563" />
        <Text style={styles.itemText}>Delete my account and data</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Drawer items array including new items with relevant icons
const drawerItems = [
  { name: 'Account', icon: 'user-circle', screen: 'ProfileScreen' },
  { name: 'Upcoming', icon: 'calendar-alt', screen: 'HistoryScreen' },
  { name: 'History', icon: 'history', screen: 'UpcomingScreen' },
  { name: 'Subscriptions', icon: 'clipboard-list', screen: 'PricingScreen' },
  { name: 'Refund & Cancellations', icon: 'money-check-alt', screen: 'RefundScreen' },
  { name: 'Privacy Policy', icon: 'shield-alt', screen: 'PrivacyScreen' },
];


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#6B4EFF',
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
    borderBottomColor: '#EDEDED',
  },
  itemText: {
    color: '#4B5563',
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
    color: '#9CA3AF',
    fontSize: 14,
  },
});

export default CustomDrawerContent;
