import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Modal, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getClassSessions } from '../../../redux/slice/listings/classService';
import { updateClassSession } from '../../../redux/slice/listings/classService';

const ClassScheduleScreen = () => {
    const [classSessions, setClassSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [scheduledSessions, setScheduledSessions] = useState([]);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [price, setPrice] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

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

    const selectSessionAndShowModal = (session) => {
        setSelectedSession(session);
        setShowModal(true);
    };

    const handleStartTimeChange = (event, selectedTime) => {
        setShowStartTimePicker(false);
        setStartTime(selectedTime || startTime);
    };

    const handleEndTimeChange = (event, selectedTime) => {
        setShowEndTimePicker(false);
        setEndTime(selectedTime || endTime);
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
        <Text style={styles.heading}>Scheduled Sessions</Text>
        {/* Render scheduled class sessions */}
        {scheduledSessions.map((session) => (
            <View key={session.id} style={styles.scheduledSessionItem}>
                <Text style={styles.scheduledSessionTitle}>{session.title}</Text>
                <Text>{session.startTime} - {session.endTime}</Text>
            </View>
        ))}


            <Text style={styles.heading}>Available Classes</Text>
            {classSessions && classSessions.map((session) => (
                <TouchableOpacity
                    key={session.id}
                    style={styles.sessionItem}
                    onPress={() => selectSessionAndShowModal(session)}
                >
                    <Image source={{ uri: session.posterUrl }} style={styles.sessionImage} resizeMode="cover" />
                    <Text style={styles.sessionTitle}>{session.title}</Text>
                    <Text>{session.description}</Text>               
                    
                 </TouchableOpacity>
            ))}

            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeading}>Schedule Session</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Price"
                            keyboardType="numeric"
                            value={price}
                            onChangeText={setPrice}
                        />
                        {/* <View style={styles.dateTimeContainer}>
                            <Text style={styles.label}>Start Date:</Text>
                            <DateTimePicker
                                value={startDate}
                                mode="date"
                                display="spinner"
                                onChange={(event, date) => setStartDate(date)}
                            />
                        </View> */}
                        <View style={styles.dateTimeContainer}>
                            <Text style={styles.label}>End Date:</Text>
                            <DateTimePicker
                                value={endDate}
                                mode="date"
                                display="spinner"
                                onChange={(event, date) => setEndDate(date)}
                            />
                        </View>
                        <View style={styles.dateTimeContainer}>
                            <Text style={styles.label}>Start Time:</Text>
                            <DateTimePicker
                                value={startTime}
                                mode="time"
                                display="spinner"
                                onChange={(event, time) => setStartTime(time)}
                            />
                        </View>
                        <View style={styles.dateTimeContainer}>
                            <Text style={styles.label}>End Time:</Text>
                            <DateTimePicker
                                value={endTime}
                                mode="time"
                                display="spinner"
                                onChange={(event, time) => setEndTime(time)}
                            />
                        </View>
                        <TouchableOpacity style={styles.scheduleButton} onPress={handleScheduleSession}>
                            <Text style={styles.buttonText}>Schedule</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    sessionItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    sessionImage: {
        width: '100%',
        height: 200,
    },
    scheduledSessionItem: {
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    scheduledSessionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'green',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: '80%',
    },
    modalHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    dateTimeContainer: {
        marginBottom: 10,
    },
    label: {
        marginBottom: 5,
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

export default ClassScheduleScreen;
