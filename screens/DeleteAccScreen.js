import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteAccScreen = ({ navigation }) => {

  const handleDeleteAccount = async () => {
    try {
      // Perform account deletion actions, e.g., delete user data
      await AsyncStorage.clear(); // Clear all stored data (adjust as per your app's logic)
      navigation.navigate('SignUp'); // Navigate to your login screen after deletion
    } catch (error) {
      console.error('Error deleting account:', error);
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
