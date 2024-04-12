import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import tw from 'twrnc';  // Ensure you have twrnc installed and set up

const StaffScreen = ({ route }) => {
  const { member } = route.params;
  console.log("Received member data:", member);

  return (
    <ScrollView style={tw`bg-white flex-1`}>
      <View style={tw`items-center pt-10 pb-6`}>
        <Image
          source={require("../assets/man.png")}
          style={styles.image}
        />
        <Text style={styles.name}>{`${member.firstName} ${member.lastName}`}</Text>
        <Text style={styles.role}>{member.role}</Text>
        <Text style={styles.detail}>{member.email}</Text>
        <Text style={styles.detail}>{member.phone}</Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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
  },
  role: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  detail: {
    fontSize: 16,
    color: '#000000',
    marginTop: 5,

  }
});

export default StaffScreen;
