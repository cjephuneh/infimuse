import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { getPackages, updatePackage } from '../../../redux/slice/listings/packageService';

const PackageScheduleScreen = () => {
    // Define state variables
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isStartDatePickerVisible, setIsStartDatePickerVisible] = useState(false);
    const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);

    // Fetch packages on component mount
    useEffect(() => {
        fetchPackages();
    }, []);

    // Function to fetch packages
    const fetchPackages = async () => {
        try {
            const response = await getPackages('token');
            const fetchedPackages = response || [];
            setPackages(fetchedPackages);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };

    // Function to handle scheduling package
    const handleSchedulePackage = async () => {
        try {
            if (!selectedPackage) {
                return;
            }

            // Implement the scheduling logic here
            // You'll need to make an API call to update the package schedule
            const updatedPackage = { ...selectedPackage, startDate, endDate };
            const response = await updatePackage(updatedPackage, 'token');

            console.log('Package scheduled successfully:', response);
        } catch (error) {
            console.error('Error scheduling package:', error);
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
            <Text style={styles.heading}>Available Packages</Text>
            <ScrollView horizontal>
                <View style={styles.cardsContainer}>
                    {packages.map((pkg) => (
                        <TouchableOpacity
                            key={pkg.id}
                            style={styles.packageCard}
                            onPress={() => setSelectedPackage(pkg)}
                        >
                            {/* Render package card content */}
                            <Text>{pkg.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {selectedPackage && (
                <View style={styles.schedulingDetailsContainer}>
                    <Text style={styles.heading}>Schedule Package</Text>
                    <TouchableOpacity style={styles.dateTimeContainer} onPress={showStartDatePicker}>
                        <Text style={styles.label}>Start Date:</Text>
                        <Text>{startDate.toDateString()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dateTimeContainer} onPress={showEndDatePicker}>
                        <Text style={styles.label}>End Date:</Text>
                        <Text>{endDate.toDateString()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.scheduleButton} onPress={handleSchedulePackage}>
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
    packageCard: {
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

export default PackageScheduleScreen;
