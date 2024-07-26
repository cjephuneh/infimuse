import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import ListingSchedule from '../components/ListingSchedule';
import Modal from 'react-native-modal';

const CalendarScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState({
    '2022-04-10': [{ id: 1, time: '09:00', title: 'Appointment times' }],
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigateToScheduleScreen = (screenName) => {
    navigation.navigate(screenName);
    toggleModal();
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const EventItem = ({ event }) => {
    return (
      <View style={[tw`flex-row items-center p-2 border-b border-gray-300`, { backgroundColor: 'white' }]}>
        <Icon name="clock-o" size={20} color="#4B5563" style={tw`mr-2`} />
        <View style={tw`flex-1`}>
          <Text style={tw`text-base text-black`}>{event.time}</Text>
          <Text style={tw`text-sm text-gray-500`}>{event.title}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[tw`flex-1`, { backgroundColor: 'white' }]}>
      <Calendar
        theme={{
          calendarBackground: tw.color('white'),
          textSectionTitleColor: tw.color('black'),
          todayTextColor: tw.color('red-500'),
          dayTextColor: tw.color('black'),
          selectedDayBackgroundColor: tw.color('red-500'),
          selectedDayTextColor: tw.color('white'),
          arrowColor: tw.color('black'),
          dotColor: tw.color('red-500'),
          monthTextColor: tw.color('black'),
        }}
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: tw.color('gray-500') },
        }}
      />
      <ListingSchedule date={selectedDate} />

      <TouchableOpacity
        style={[tw`absolute bottom-4 right-4 p-4 rounded-full shadow-lg`, { backgroundColor: '#A72C76' }]}
        onPress={toggleModal}
      >
        <Icon name="plus" size={24} color="#FFF" />
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Create a listing</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => navigateToScheduleScreen('WorkshopScheduleScreen')}
          >
            <Text style={tw`text-white text-center text-lg`}>Workshop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => navigateToScheduleScreen('ClassScheduleScreen')}
          >
            <Text style={tw`text-white text-center text-lg`}>Workshop Class</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => navigateToScheduleScreen('ExperienceScheduleScreen')}
          >
            <Text style={tw`text-white text-center text-lg`}>Experience</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
  },
  modalButton: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#A72C76",
    alignItems: 'center',
  },
});

export default CalendarScreen;