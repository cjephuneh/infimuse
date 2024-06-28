// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';
// import tw from 'tailwind-react-native-classnames';

// const QRCodeScreen = () => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     alert(`Bar code with type ${type} and data ${data} has been scanned!`);
//     // You can perform additional actions with the scanned data here
//   };

//   if (hasPermission === null) {
//     return (
//       <View style={tw`flex-1 items-center justify-center`}>
//         <Text style={tw`text-gray-600`}>Requesting camera permission...</Text>
//       </View>
//     );
//   }

//   if (hasPermission === false) {
//     return (
//       <View style={tw`flex-1 items-center justify-center`}>
//         <Text style={tw`text-red-500`}>Camera permission not granted</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={tw`flex-1 bg-gray-100`}>
//       <View style={tw`flex-1 items-center justify-center`}>
//         <BarCodeScanner
//           onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//           style={tw`h-96 w-full rounded-lg overflow-hidden`}
//         />
//       </View>
//       <TouchableOpacity
//         style={tw`mx-8 mb-8 py-4 rounded-lg bg-blue-500`}
//         onPress={() => setScanned(false)}
//         disabled={scanned}
//       >
//         <Text style={tw`text-center text-white font-bold`}>
//           {scanned ? 'Scanning...' : 'Scan QR Code'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default QRCodeScreen;

import { View, Text } from 'react-native'
import React from 'react'

const qrcodereader = () => {
  return (
    <View>
      <Text>qrcodereader</Text>
    </View>
  )
}

export default qrcodereader