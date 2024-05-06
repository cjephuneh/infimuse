import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { getExperiences, updateExperience } from '../../../redux/slice/listings/ExperienceService';

const ExperienceScheduleScreen = () => {
    // Define state variables
    const [experiences, setExperiences] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [price, setPrice] = useState('');
    const [isStartTimePickerVisible, setIsStartTimePickerVisible] = useState(false);
    const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);

    // Fetch experiences on component mount
    useEffect(() => {
        fetchExperiences();
    }, []);

    // Function to fetch experiences
    const fetchExperiences = async () => {
        try {
            const response = await getExperiences('token');
            const fetchedExperiences = response || [];
            setExperiences(fetchedExperiences);
        } catch (error) {
            console.error('Error fetching experiences:', error);
        }
    };

    // Function to handle scheduling experience
    const handleScheduleExperience = async () => {
        try {
            if (!selectedExperience || !startTime || !endTime || !selectedDate || !price) {
                return;
            }

            // Implement the scheduling logic here
            // You'll need to make an API call to update the experience schedule
            const experienceData = {
                startTime,
                endTime,
                date: selectedDate,
                price,
            };

            const response = await updateExperience(selectedExperience.id, experienceData, 'token');
            console.log('Experience scheduled successfully:', response);
        } catch (error) {
            console.error('Error scheduling experience:', error);
        }
    };

    // Date picker handlers
    const showStartTimePicker = () => setIsStartTimePickerVisible(true);
    const hideStartTimePicker = () => setIsStartTimePickerVisible(false);
    const showEndTimePicker = () => setIsEndTimePickerVisible(true);
    const hideEndTimePicker = () => setIsEndTimePickerVisible(false);

    const handleStartTimeConfirm = (time) => {
        setStartTime(time);
        hideStartTimePicker();
    };

    const handleEndTimeConfirm = (time) => {
        setEndTime(time);
        hideEndTimePicker();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Available Experiences</Text>
            <ScrollView horizontal>
                <View style={styles.cardsContainer}>
                    {experiences.map((experience) => (
                        <TouchableOpacity
                            key={experience.id}
                            style={styles.experienceCard}
                            onPress={() => setSelectedExperience(experience)}
                        >
                            {/* Render experience card content */}
                            <Text>{experience.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {selectedExperience && (
                <View style={styles.schedulingDetailsContainer}>
                    <Text style={styles.heading}>Schedule Experience</Text>
                    <TouchableOpacity style={styles.dateTimeContainer} onPress={showStartTimePicker}>
                        <Text style={styles.label}>Start Time:</Text>
                        <Text>{startTime.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dateTimeContainer} onPress={showEndTimePicker}>
                        <Text style={styles.label}>End Time:</Text>
                        <Text>{endTime.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dateTimeContainer} onPress={() => {/* Implement date picker functionality */}}>
                        {/* Render date picker */}
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Price"
                        keyboardType="numeric"
                        value={price}
                        onChangeText={setPrice}
                    />
                    <TouchableOpacity style={styles.scheduleButton} onPress={handleScheduleExperience}>
                        <Text style={styles.buttonText}>Schedule</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Date picker modals */}
            <DateTimePickerModal
                isVisible={isStartTimePickerVisible}
                mode="time"
                date={startTime}
                onConfirm={handleStartTimeConfirm}
                onCancel={hideStartTimePicker}
            />

            <DateTimePickerModal
                isVisible={isEndTimePickerVisible}
                mode="time"
                date={endTime}
                onConfirm={handleEndTimeConfirm}
                onCancel={hideEndTimePicker}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cardsContainer: {
        flexDirection: 'row',
    },
    experienceCard: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        margin: 5,
    },
    schedulingDetailsContainer: {
        marginTop: 20,
    },
    dateTimeContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        marginRight: 10,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    scheduleButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default ExperienceScheduleScreen;
