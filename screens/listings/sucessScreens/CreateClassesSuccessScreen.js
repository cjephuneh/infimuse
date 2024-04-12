import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const CreateClassesSuccessScreen = ({ navigation }) => {
  const handleNavigateToTemplates = () => {
    // Navigate to the templates screen
    navigation.navigate('TemplateScreen');
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-white p-6`}>
      <Image 
        source={require('../../../assets/succes1.png')} 
        style={tw`mb-8 w-48 h-48`} 
        resizeMode="contain"
      />
      <Text style={tw`text-3xl font-bold text-gray-800 mb-6 text-center`}>Class Session Created Successfully!</Text>
      <TouchableOpacity 
        style={tw`bg-purple-700 py-3 px-6 rounded-md shadow-md`} 
        onPress={handleNavigateToTemplates}
      >
        <Text style={tw`text-white font-semibold text-lg`}>View Templates</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateClassesSuccessScreen;
