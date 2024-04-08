import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Card } from 'react-native-elements';

const CalenderScreen = () => {
  // Dummy data for upcoming events or updates
  const upcomingEvents = [
    { id: 1, title: 'Event 1', date: '2024-04-10', description: 'Description for Event 1' },
    { id: 2, title: 'Event 2', date: '2024-04-15', description: 'Description for Event 2' },
    { id: 3, title: 'Event 3', date: '2024-04-20', description: 'Description for Event 3' },
    // Add more events as needed
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Calendar Section */}
      <Calendar
        // Customize calendar appearance here
        style={styles.calendar}
        // Add any calendar props as needed
      />

      {/* Upcoming Events Section */}
      <View style={styles.upcomingEventsContainer}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        {/* Render cards for upcoming events */}
        {upcomingEvents.map(event => (
          <TouchableOpacity key={event.id} style={styles.cardContainer}>
            <Card containerStyle={styles.card}>
              <Card.Title style={styles.cardTitle}>{event.title}</Card.Title>
              <Card.Divider />
              <Text style={styles.cardText}>{event.date}</Text>
              <Text style={styles.cardText}>{event.description}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8F9FA', // Background color for the screen
    padding: 20,
  },
  calendar: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#CED0CE', // Border color for the calendar
    borderRadius: 10,
    // Add any additional calendar styles here
  },
  upcomingEventsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContainer: {
    marginBottom: 10,
  },
  card: {
    borderRadius: 15,
    elevation: 3, // For Android
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 14,
  },
});

export default CalenderScreen;
