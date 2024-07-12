import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URI = "https://whatever.lat/api/v1/"; // Adjust this to your actual API URL

// Function to delete the current host
const deleteCurrentHost = async (token) => {
    try {
        // Decode the token to extract the host ID
        const decodedToken = jwt_decode(token);
        const hostId = decodedToken.id; // Assuming the host ID is stored as 'id' in the token

        // Log the hostId
        console.log('Host ID:', hostId);

        const response = await fetch(`${API_URI}/hosts/${hostId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to delete current host");
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error deleting current host:", error);
        throw error;
    }
};

const DeleteAccScreen = ({ navigation }) => {
  const handleDeleteAccount = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      // Call the delete API
      const deleteResponse = await deleteCurrentHost(token);
      console.log('Delete Response:', deleteResponse);

      // Perform account deletion actions, e.g., delete user data
      await AsyncStorage.clear(); // Clear all stored data (adjust as per your app's logic)
      navigation.navigate('SignUp'); // Navigate to your login screen after deletion
    } catch (error) {
      console.error('Error deleting account:', error);
      Alert.alert("Error", "Failed to delete account. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="exclamation-circle" size={100} color="#F87171" style={styles.icon} />
      <Text style={styles.title}>Are you sure you want to delete your account?</Text>
      <Text style={styles.subtitle}>This action cannot be undone.</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Delete my account and data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: '#F87171',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DeleteAccScreen;
