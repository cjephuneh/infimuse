import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { getWorkshops, updateWorkshop } from '../../../redux/slice/listings/workshopService';

const WorkshopScheduleScreen = () => {
    // Define state variables
    const [workshops, setWorkshops] = useState([]);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isStartDatePickerVisible, setIsStartDatePickerVisible] = useState(false);
    const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);

    // Fetch workshops on component mount
    useEffect(() => {
        fetchWorkshops();
    }, []);

    // Function to fetch workshops
    const fetchWorkshops = async () => {
        try {
            const response = await getWorkshops('token');
            const fetchedWorkshops = response || [];
            setWorkshops(fetchedWorkshops);
        } catch (error) {
            console.error('Error fetching workshops:', error);
        }
    };

    // Function to handle scheduling workshop
    const handleScheduleWorkshop = async () => {
        try {
            if (!selectedWorkshop) {
                return;
            }

            // Implement the scheduling logic here
            // You'll need to make an API call to update the workshop schedule
            const updatedWorkshop = { ...selectedWorkshop, startDate, endDate };
            const response = await updateWorkshop(updatedWorkshop, 'token');

            console.log('Workshop scheduled successfully:', response);
        } catch (error) {
            console.error('Error scheduling workshop:', error);
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
            <Text style={styles.heading}>Available Workshops</Text>
            <ScrollView horizontal>
                <View style={styles.cardsContainer}>
                    {workshops.map((workshop) => (
                        <TouchableOpacity
                            key={workshop.id}
                            style={styles.workshopCard}
                            onPress={() => setSelectedWorkshop(workshop)}
                        >
                            {/* Render workshop card content */}
                            <Text>{workshop.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {selectedWorkshop && (
                <View style={styles.schedulingDetailsContainer}>
                    <Text style={styles.heading}>Schedule Workshop</Text>
                    <TouchableOpacity style={styles.dateTimeContainer} onPress={showStartDatePicker}>
                        <Text style={styles.label}>Start Date:</Text>
                        <Text>{startDate.toDateString()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dateTimeContainer} onPress={showEndDatePicker}>
                        <Text style={styles.label}>End Date:</Text>
                        <Text>{endDate.toDateString()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.scheduleButton} onPress={handleScheduleWorkshop}>
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
    workshopCard: {
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

export default WorkshopScheduleScreen;
