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
    StyleSheet
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';

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
        return Array.isArray(json) ? json : []; // Ensure it returns an array
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
            console.log('Fetched Venues:', fetchedVenues); // Debugging line
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

    const handleNext = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    const VenueDropdown = () => (
        <Picker
            selectedValue={formData.venueId}
            style={styles.picker}
            onValueChange={(itemValue) => setFormData({ ...formData, venueId: itemValue })}
        >
            {Array.isArray(venues) && venues.map(venue => (
                <Picker.Item key={venue.id} label={venue.name} value={venue.id} />
            ))}
        </Picker>
    );

    const Step1 = () => (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Poster URL"
                value={formData.posterUrl}
                onChangeText={(text) => setFormData({ ...formData, posterUrl: text })}
            />
            <TouchableOpacity onPress={handleNext} style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );

    const Step2 = () => (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Duration"
                value={formData.duration}
                onChangeText={(text) => setFormData({ ...formData, duration: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Capacity"
                value={formData.capacity}
                onChangeText={(text) => setFormData({ ...formData, capacity: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Start Time"
                value={formData.startTime}
                onChangeText={(text) => setFormData({ ...formData, startTime: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="End Time"
                value={formData.endTime}
                onChangeText={(text) => setFormData({ ...formData, endTime: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Date"
                value={formData.date}
                onChangeText={(text) => setFormData({ ...formData, date: text })}
            />
            <TouchableOpacity onPress={handleBack} style={[styles.button, styles.buttonSecondary]}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext} style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );

    const Step3 = () => (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={formData.price}
                onChangeText={(text) => setFormData({ ...formData, price: text })}
            />
            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setFormData({ ...formData, capacityStatus: !formData.capacityStatus })}
                >
                    {formData.capacityStatus && <View style={styles.checkboxChecked} />}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Capacity Status</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Age Group"
                value={formData.ageGroup}
                onChangeText={(text) => setFormData({ ...formData, ageGroup: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Age Min"
                value={formData.ageMin}
                onChangeText={(text) => setFormData({ ...formData, ageMin: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Age Max"
                value={formData.ageMax}
                onChangeText={(text) => setFormData({ ...formData, ageMax: text })}
            />
            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setFormData({ ...formData, templateStatus: !formData.templateStatus })}
                >
                    {formData.templateStatus && <View style={styles.checkboxChecked} />}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Template Status</Text>
            </View>
            <VenueDropdown />
            <TouchableOpacity onPress={handleBack} style={[styles.button, styles.buttonSecondary]}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateExperience} disabled={loading} style={styles.button}>
                {loading && <ActivityIndicator color="#ffffff" />}
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <KeyboardAvoidingView style={tw`flex-1 bg-gray-50`} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={tw`p-4`}>
                <Text style={tw`text-xl font-bold mb-6`}>Create Experience</Text>
                {currentStep === 1 && <Step1 />}
                {currentStep === 2 && <Step2 />}
                {currentStep === 3 && <Step3 />}
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
    buttonSecondary: {
        backgroundColor: '#9CA3AF',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 6,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#ffffff',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    checkboxChecked: {
        width: 12,
        height: 12,
        backgroundColor: '#4B5563',
        borderRadius: 2,
    },
    checkboxLabel: {
        fontSize: 16,
    }
});

export default CreateExperienceScreen;
