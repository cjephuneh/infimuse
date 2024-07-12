import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Picker,
    StyleSheet
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const API_URI = "https://whatever.lat/api/v1/";

// Function to fetch venues
const fetchVenues = async (token) => {
    try {
        const response = await fetch(`${API_URI}venues`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const json = await response.json();
        if (!response.ok) throw new Error(json.message);
        return json;
    } catch (error) {
        console.error('Error fetching venues:', error);
        return [];
    }
};

// Function to create an experience
const createExperience = async (formData, token) => {
    try {
        const response = await fetch(`${API_URI}experiences`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        const json = await response.json();
        return { status: response.ok ? 'success' : 'error', message: json.message };
    } catch (error) {
        console.error('Error posting experience:', error);
        return { status: 'error', message: 'Failed to post experience' };
    }
};

const CreateExperienceScreen = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        posterUrl: '',
        duration: '',
        capacity: '',
        startTime: '',
        endTime: '',
        date: '',
        price: '',
        capacityStatus: false,
        ageGroup: '',
        ageMin: '',
        ageMax: '',
        templateStatus: false,
        venueId: ''
    });
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadVenues = async () => {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Toast.show({ type: 'error', text1: 'Authentication Error', text2: 'No token found. Please re-login.' });
                return;
            }
            const fetchedVenues = await fetchVenues(token);
            setVenues(fetchedVenues);
        };
        loadVenues();
    }, []);

    const handleCreateExperience = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            Toast.show({ type: 'error', text1: 'Authentication Error', text2: 'Token not found. Please sign in again.' });
            setLoading(false);
            return;
        }
        const response = await createExperience(formData, token);
        Toast.show({ type: response.status, text1: response.status === 'success' ? 'Success' : 'Error', text2: response.message });
        if (response.status === 'success') setCurrentStep(1); // Reset after success
        setLoading(false);
    };

    const VenueDropdown = () => (
        <Picker
            selectedValue={formData.venueId}
            style={styles.picker}
            onValueChange={(itemValue) => setFormData({ ...formData, venueId: itemValue })}
        >
            {venues.map(venue => (
                <Picker.Item key={venue.id} label={venue.name} value={venue.id} />
            ))}
        </Picker>
    );

    return (
        <KeyboardAvoidingView style={tw`flex-1 bg-gray-50`} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={tw`p-4`}>
                <Text style={tw`text-xl font-bold mb-6`}>Create Experience</Text>
                <VenueDropdown />
                <TouchableOpacity onPress={handleCreateExperience} disabled={loading} style={[styles.button, tw`flex-row items-center justify-center`]}>
                    {loading && <ActivityIndicator color="#ffffff" />}
                    <Text style={tw`text-white text-lg ml-2`}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4B5563',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    }
});

export default CreateExperienceScreen;
