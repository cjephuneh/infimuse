import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { getVenues, updateVenue } from '../../../redux/slice/listings/venueService';

const VenueScheduleScreen = () => {
    // Define state variables
    const [venues, setVenues] = useState([]);
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isStartDatePickerVisible, setIsStartDatePickerVisible] = useState(false);
    const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);

    // Fetch venues on component mount
    useEffect(() => {
        fetchVenues();
    }, []);

    // Function to fetch venues
    const fetchVenues = async () => {
        try {
            const response = await getVenues('token');
            const fetchedVenues = response || [];
            setVenues(fetchedVenues);
        } catch (error) {
            console.error('Error fetching venues:', error);
        }
    };

    // Function to handle scheduling venue session
    const handleScheduleVenue = async () => {
        try {
            if (!selectedVenue) {
                return;
            }

            // Implement the scheduling logic here
            // You'll need to make an API call to update the venue schedule
            const updatedVenue = { ...selectedVenue, startDate, endDate };
            const response = await updateVenue(updatedVenue, 'token');

            console.log('Venue scheduled successfully:', response);
        } catch (error) {
            console.error('Error scheduling venue:', error);
        }
    };

    // Date picker handlers
    const showStartDatePicker = () => setIsStartDatePickerVisible(true);
    const hideStartDatePicker = () => setIsStartDatePickerVisible(false);
    const showEndDatePicker = () => setIsEndDatePickerVisible(true);
    const hideEndDatePicker = () => setIsEndDatePickerVisible(false);

    const handleStartDateConfirm = (date) => {
        setStartDate(date);
        hideStartDatePicker();
    };

    const handleEndDateConfirm = (date) => {
        setEndDate(date);
        hideEndDatePicker();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Available Venues</Text>
            <ScrollView horizontal>
                <View style={styles.cardsContainer}>
                    {venues.map((venue) => (
                        <TouchableOpacity
                            key={venue.id}
                            style={styles.venueCard}
                            onPress={() => setSelectedVenue(venue)}
                        >
                            {/* Render venue card content */}
                            <Text>{venue.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {selectedVenue && (
                <View style={styles.schedulingDetailsContainer}>
                    <Text style={styles.heading}>Schedule Venue</Text>
                    <TouchableOpacity style={styles.dateTimeContainer} onPress={showStartDatePicker}>
                        <Text style={styles.label}>Start Date:</Text>
                        <Text>{startDate.toDateString()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dateTimeContainer} onPress={showEndDatePicker}>
                        <Text style={styles.label}>End Date:</Text>
                        <Text>{endDate.toDateString()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.scheduleButton} onPress={handleScheduleVenue}>
                        <Text style={styles.buttonText}>Schedule</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Date picker modals */}
            <DateTimePickerModal
                isVisible={isStartDatePickerVisible}
                mode="date"
                date={startDate}
                onConfirm={handleStartDateConfirm}
                onCancel={hideStartDatePicker}
            />

            <DateTimePickerModal
                isVisible={isEndDatePickerVisible}
                mode="date"
                date={endDate}
                onConfirm={handleEndDateConfirm}
                onCancel={hideEndDatePicker}
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
    venueCard: {
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

export default VenueScheduleScreen;
