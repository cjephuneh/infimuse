import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";

const WalletCard = ({ name, balance, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        tw` flex-row rounded-lg p-4 mb-4 items-center shadow-md`,{backgroundColor: "#A72C76"}
      ]}
    >
      <Image
        source={require("../assets/mpesa.png")} // Add your wallet icon image here
        style={styles.image}
      />
      <View style={tw`ml-4`}>
        <Text style={tw`text-xl font-bold text-white`}>{name}</Text>
        <Text style={tw`text-gray-300`}>Balance: {balance}</Text>
      </View>
    </TouchableOpacity>
  );
};

const WalletDetails = ({ navigation }) => {
  const wallet = {
    name: "My Wallet",
    balance: "$1000", // Example balance
  };

  const handlePress = () => {
    // Navigate to WalletDetails screen or any other screen for wallet details
    navigation.navigate("WalletDetails");
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#A72C76" />
      <ScrollView style={tw`flex-1 bg-white`}>
        <View style={tw`p-4`}>
        <Text style={tw`text-xl font-semibold mb-4`}>Wallet</Text>

          <WalletCard
            name={wallet.name}
            balance={wallet.balance}
            onPress={handlePress}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 10,
    elevation: 5, // for Android shadow
    shadowColor: "#000000", // for iOS shadow
    shadowOpacity: 0.3, // for iOS shadow
    shadowRadius: 3, // for iOS shadow
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain", // Ensure image fits within container
  },
});

export default WalletDetails;
