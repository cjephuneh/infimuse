import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import tw from 'twrnc';  // Ensure you have twrnc installed and set up

const StaffScreen = ({ route }) => {
  const { member } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text
        style={tw`text-2xl font-bold text-gray-800 text-center mt-6 mb-4`}
      >
        Staff Details
      </Text>
      <View style={styles.content}>
        <Image
          source={{ uri: member.imageUrl }}
          style={styles.image}
        />
        <Text style={styles.name}>{`${member.firstName} ${member.lastName}`}</Text>
        <Text style={styles.role}>Role: {member.role}</Text>
        <Text style={styles.detail}>Email: {member.email}</Text>
        <Text style={styles.detail}>Phone No: {member.phone}</Text>
        <Text style={styles.bio}>Bio: {member.description}</Text>
      </View>
      <TouchableOpacity
        style={styles.inviteButton}
      >
        <Text style={styles.inviteText}>
          Invite {member.firstName}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  role: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  detail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  inviteButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#18BDFA',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inviteText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StaffScreen;
