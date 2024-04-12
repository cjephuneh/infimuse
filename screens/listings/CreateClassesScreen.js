import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, DatePickerAndroid } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


const CreateClassesScreen = () => {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const showDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
        mode: 'spinner',
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        setStartDate(`${year}-${month + 1}-${day}`);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  const handleCreateClassSession = () => {
    // Here you can perform any necessary actions before navigating
    navigation.navigate('CreateClassesSuccessScreen');
  };

  return (
    <KeyboardAvoidingView 
      style={tw`flex-1`} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={tw`p-4 bg-gray-50 flex-grow`} >
        <View style={tw`mb-8`}>
          <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>Create Class Session</Text>
          <TextInput placeholder="Title" style={tw`border-b border-gray-400 text-lg mb-4`} />
          <TextInput
            placeholder="Description"
            multiline
            style={tw`border-b border-gray-400 text-lg mb-4`}
          />
          <TextInput placeholder="Poster URL" style={tw`border-b border-gray-400 text-lg mb-4`} />
          <TouchableOpacity onPress={showDatePicker} style={tw`flex-row items-center mb-4`}>
            <Icon name="calendar" size={20} color="#718096" style={tw`mr-2`} />
            <TextInput placeholder="Date" value={startDate} editable={false} style={tw`border-b border-gray-400 text-lg flex-1`} />
          </TouchableOpacity>
          <View style={tw`flex-row items-center mb-4`}>
            <Icon name="clock-o" size={20} color="#718096" style={tw`mr-2`} />
            <TextInput placeholder="Start Time" value={startTime} onChangeText={setStartTime} style={tw`border-b border-gray-400 text-lg flex-1`} />
          </View>
          <View style={tw`flex-row items-center mb-4`}>
            <Icon name="clock-o" size={20} color="#718096" style={tw`mr-2`} />
            <TextInput placeholder="End Time" value={endTime} onChangeText={setEndTime} style={tw`border-b border-gray-400 text-lg flex-1`} />
          </View>
          <TextInput placeholder="Price" keyboardType="numeric" style={tw`border-b border-gray-400 text-lg mb-4`} />
          <TextInput placeholder="Capacity" keyboardType="numeric" style={tw`border-b border-gray-400 text-lg mb-4`} />
          <TextInput placeholder="Age Group" style={tw`border-b border-gray-400 text-lg mb-4`} />
          <TextInput placeholder="Age Min" keyboardType="numeric" style={tw`border-b border-gray-400 text-lg mb-4`} />
          <TextInput placeholder="Age Max" keyboardType="numeric" style={tw`border-b border-gray-400 text-lg mb-4`} />
        </View>

        <TouchableOpacity style={tw`rounded-lg bg-purple-700 p-3 items-center`} onPress={handleCreateClassSession}>
          <Text style={tw`text-white font-semibold text-lg`}>Create Class Session</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateClassesScreen;
