import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState();
    // State to manage the visibility of the modal
    const [isModalVisible, setModalVisible] = useState(false);

  const [events, setEvents] = useState({
    // Mock data: events indexed by date
    '2022-04-10': [{ id: 1, time: '09:00', title: 'Appointment times' }],
    // Add more events here
  });



    // Function to toggle the modal
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const EventItem = ({ event }) => {
    return (
      <View style={tw`flex-row items-center p-2 border-b border-gray-200`}>
        <Icon name="clock-o" size={20} color="#4B5563" style={tw`mr-2`} />
        <View style={tw`flex-1`}>
          <Text style={tw`text-base text-gray-800`}>{event.time}</Text>
          <Text style={tw`text-sm text-gray-500`}>{event.title}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={tw`flex-1 bg-gray-900`}>
      <Calendar
        // The theme property allows for custom styling
        theme={{
          calendarBackground: tw.color('gray-900'),
          textSectionTitleColor: tw.color('gray-400'),
          todayTextColor: tw.color('red-500'),
          dayTextColor: tw.color('gray-300'),
          selectedDayBackgroundColor: tw.color('red-500'),
          selectedDayTextColor: tw.color('gray-900'),
          arrowColor: tw.color('gray-600'),
          dotColor: tw.color('red-500'),
          monthTextColor: tw.color('gray-100'),
        }}
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: tw.color('gray-500') },
          // ...mark other dates with dots or custom styles if needed
        }}
        // ...other Calendar props
      />
      <View style={tw`flex-1 bg-gray-800 p-4`}>
        {events[selectedDate]?.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </View>
      <TouchableOpacity
        style={[tw`absolute bottom-4 right-4  p-4 rounded-full shadow-lg`,{backgroundColor: '#A72C76'}]}
        onPress={toggleModal}
      >
        <Icon name="plus" size={24} color="#FFF" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create a listing </Text>
            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
              <Text 
                style={tw`text-white text-center text-lg`}
              >Workshop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
              <Text
                style={tw`text-white text-center text-lg`}
              >Class</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
              <Text
                style={tw`text-white text-center text-lg`}
              >PackageClass</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
              <Text
                style={tw`text-white text-center text-lg`}
              >Venue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dimmed background
  },
  modalView: {
    width: '80%', // Makes modal take up 80% of screen width
    backgroundColor: 'white',
    borderRadius: 20,
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
    fontSize: 18, // Larger font size for title
  },
  modalButton: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%', // Make buttons spread out to the full width of the modal
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#A72C76", // Tailwind gray-300
    alignItems: 'center', // Center text in the button
  },
});

export default CalendarScreen;