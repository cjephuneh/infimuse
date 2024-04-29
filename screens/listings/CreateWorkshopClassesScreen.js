import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { createWorkshopClass } from '../../redux/slice/listings/WorkshopClassService'; // Import the createWorkshopClass API function

const CreateWorkshopClassesScreen = ({ route }) => {
    const navigation = useNavigation();
    const { workshopId } = route.params; // Get the workshop ID passed from the previous screen
    const [loading, setLoading] = useState(false); // State to indicate loading state
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
            setLoading(true); // Set loading to true when creating workshop class

            // Call the createWorkshopClass API
            const workshopClassResponse = await createWorkshopClass(workshopClassData);

            if (workshopClassResponse && workshopClassResponse.id) {
                // Navigate to success screen or perform any other action
                navigation.navigate('CreateWorkshopSuccessScreen');
            } else {
                throw new Error("Workshop class ID not found");
            }
        } catch (error) {
            console.error("Error creating workshop class:", error);
            // Handle error here
        } finally {
            setLoading(false); // Set loading to false when the process is complete
        }
    };

    return (
        <KeyboardAvoidingView
            style={tw`flex-1`}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={tw`p-4 bg-gray-50 flex-grow`}>
                <View style={tw`mb-8`}>
                    <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>Classes</Text>
                    {/* Class 1 */}
                    <View style={tw`border-b pb-4 mb-4`}>
                        <TextInput
                            placeholder="Class Topic"
                            style={tw`border-b border-gray-400 text-lg mb-4`}
                            onChangeText={(title) => setWorkshopClassData({ ...workshopClassData, title })}
                        />
                        <TextInput
                            placeholder="Description"
                            style={tw`border-b border-gray-400 text-lg mb-4`}
                            onChangeText={(description) => setWorkshopClassData({ ...workshopClassData, description })}
                        />
                        <TextInput
                            placeholder="Start Time"
                            style={tw`border-b border-gray-400 text-lg mb-4`}
                            onChangeText={(startTime) => setWorkshopClassData({ ...workshopClassData, startTime })}
                        />
                        <TextInput
                            placeholder="End Time"
                            style={tw`border-b border-gray-400 text-lg mb-4`}
                            onChangeText={(endTime) => setWorkshopClassData({ ...workshopClassData, endTime })}
                        />
                        <TouchableOpacity style={tw`flex-row items-center mb-4`}>
                            <Icon name="calendar" size={20} color="#718096" style={tw`mr-2`} />
                            <TextInput placeholder="Date" style={tw`border-b border-gray-400 text-lg flex-1`} onChangeText={(date) => setWorkshopClassData({ ...workshopClassData, date })} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Create Workshop button */}
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
