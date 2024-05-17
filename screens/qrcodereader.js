import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

const QRCodeScannerScreen = () => {
  const [isScanned, setIsScanned] = useState(false);
  const navigation = useNavigation();

  const handleBarCodeRead = ({ data }) => {
    if (!isScanned) {
      setIsScanned(true);
      Alert.alert("QR Code Scanned", `Data: ${data}`, [
        {
          text: "OK",
          onPress: () => setIsScanned(false),
        },
      ]);
      // Handle the scanned data as per your requirement
    }
  };

  return (
    <View style={tw`flex-1`}>
      <RNCamera
        style={tw`flex-1`}
        onBarCodeRead={handleBarCodeRead}
        captureAudio={false}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }}
      >
        <View style={tw`flex-1 justify-center items-center`}>
          <View style={[tw`bg-transparent border border-red-500`, styles.scanBox]} />
        </View>
      </RNCamera>
      <TouchableOpacity style={tw`absolute top-10 left-4 bg-gray-800 p-2 rounded`} onPress={() => navigation.goBack()}>
        <Text style={tw`text-white`}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scanBox: {
    width: 250,
    height: 250,
  },
});

export default QRCodeScannerScreen;
