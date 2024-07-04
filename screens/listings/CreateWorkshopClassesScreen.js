import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { createWorkshopClass } from '../../redux/slice/listings/WorkshopClassService'; 

const CreateWorkshopClassesScreen = ({ route }) => {
    const navigation = useNavigation();
    const { workshopId } = route.params; 
    const [loading, setLoading] = useState(false); 
    const [workshopClassData, setWorkshopClassData] = useState({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        date: '',
        workshopId: workshopId,
    });

    const handleCreateWorkshopClass = async () => {
        try {
            setLoading(true); 
            const workshopClassResponse = await createWorkshopClass(workshopClassData);

            if (workshopClassResponse && workshopClassResponse.id) {
                navigation.navigate('CreateWorkshopSuccessScreen');
            } else {
                throw new Error("Workshop class ID not found");
            }
        } catch (error) {
            console.error("Error creating workshop class:", error);
        } finally {
            setLoading(false); 
        }
    };

    const renderInput = (placeholder, key, keyboardType = 'default') => (
        <View style={tw`mb-4`}>
            <Text style={tw`text-sm text-gray-600 mb-1`}>{placeholder}</Text>
            <TextInput
                placeholder={placeholder}
                value={workshopClassData[key]}
                onChangeText={text => setWorkshopClassData({ ...workshopClassData, [key]: text })}
                style={tw`border border-gray-300 rounded p-3`}
                keyboardType={keyboardType}
            />
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={tw`flex-1`}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={tw`p-4 bg-gray-50 flex-grow`}>
                <View style={tw`mb-8`}>
                    <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>Create Workshop Class</Text>
                    {renderInput('Class Topic', 'title')}
                    {renderInput('Description', 'description')}
                    {renderInput('Start Time', 'startTime')}
                    {renderInput('End Time', 'endTime')}
                    {renderInput('Date', 'date')}
                </View>
                <TouchableOpacity style={tw`rounded-lg bg-purple-700 p-3 items-center`} onPress={handleCreateWorkshopClass}>
                    {loading ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <Text style={tw`text-white font-semibold text-lg`}>Create Workshop</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CreateWorkshopClassesScreen;
