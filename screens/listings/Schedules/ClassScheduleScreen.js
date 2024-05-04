import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Modal, TextInput, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { getClassSessions } from '../../../redux/slice/listings/classService';
import { updateClassSession } from '../../../redux/slice/listings/classService';

const ClassScheduleScreen = () => {
    const [classSessions, setClassSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [scheduledSessions, setScheduledSessions] = useState([]);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [price, setPrice] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isStartDatePickerVisible, setIsStartDatePickerVisible] = useState(false);
    const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
    const [isStartTimePickerVisible, setIsStartTimePickerVisible] = useState(false);
    const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);

    
    useEffect(() => {
        fetchClassSessions();
    }, []);

    const fetchClassSessions = async () => {
        try {
            const response = await getClassSessions('token');
            const sessions = response.Document || [];
            setClassSessions(sessions);
        } catch (error) {
            console.error('Error fetching class sessions:', error);
        }
    };

    const showStartDatePicker = () => setIsStartDatePickerVisible(true);
    const hideStartDatePicker = () => setIsStartDatePickerVisible(false);
    const showEndDatePicker = () => setIsEndDatePickerVisible(true);
    const hideEndDatePicker = () => setIsEndDatePickerVisible(false);
    const showStartTimePicker = () => setIsStartTimePickerVisible(true);
    const hideStartTimePicker = () => setIsStartTimePickerVisible(false);
    const showEndTimePicker = () => setIsEndTimePickerVisible(true);
    const hideEndTimePicker = () => setIsEndTimePickerVisible(false);

    const handleStartDateConfirm = (date) => {
        setStartDate(date);
        hideStartDatePicker();
    };

    const handleEndDateConfirm = (date) => {
        setEndDate(date);
        hideEndDatePicker();
    };

    const handleStartTimeConfirm = (time) => {
        setStartTime(time);
        hideStartTimePicker();
    };

    const handleEndTimeConfirm = (time) => {
        setEndTime(time);
        hideEndTimePicker();
    };

    const handleScheduleSession = async () => {
        try {
            if (!selectedSession || !startTime || !endTime || !selectedDate || !price || !startDate || !endDate) {
                return;
            }

            const updatedSession = { ...selectedSession, startTime, endTime };

            const response = await updateClassSession(updatedSession, 'token');
            console.log('Session scheduled successfully:', response);

            setScheduledSessions([...scheduledSessions, updatedSession]);
            setShowModal(false);
        } catch (error) {
            console.error('Error scheduling session:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Available Classes</Text>
            <ScrollView horizontal>
                <View style={styles.cardsContainer}>
                    {classSessions.map((session) => (
                        <TouchableOpacity
                            key={session.id}
                            style={styles.sessionCard}
                            onPress={() => setSelectedSession(session)}
                        >
                            <Image source={{ uri: session.posterUrl }} style={styles.sessionImage} resizeMode="cover" />
                            <Text style={styles.sessionTitle}>{session.title}</Text>
                            <Text style={styles.sessionDescription}>{session.description}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {selectedSession && (
                <View style={styles.schedulingDetailsContainer}>
                    <Text style={styles.heading}>Schedule Session</Text>
                    <TouchableOpacity style={styles.dateTimeContainer} onPress={showStartDatePicker}>
                        <Text style={styles.label}>Start Date:</Text>
                        <Text>{startDate.toDateString()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dateTimeContainer} onPress={showEndDatePicker}>
                        <Text style={styles.label}>End Date:</Text>
                        <Text>{endDate.toDateString()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dateTimeContainer} onPress={showStartTimePicker}>
                        <Text style={styles.label}>Start Time:</Text>
                        <Text>{startTime.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dateTimeContainer} onPress={showEndTimePicker}>
                        <Text style={styles.label}>End Time:</Text>
                        <Text>{endTime.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Price"
                        keyboardType="numeric"
                        value={price}
                        onChangeText={setPrice}
                    />
                    <TouchableOpacity style={styles.scheduleButton} onPress={handleScheduleSession}>
                        <Text style={styles.buttonText}>Schedule</Text>
                    </TouchableOpacity>
                </View>
            )}

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
    sessionCard: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        margin: 5,
    },
    sessionImage: {
        width: 150,
        height: 150,
        marginBottom: 5,
    },
    sessionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    sessionDescription: {
        fontSize: 14,
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

export default ClassScheduleScreen;
