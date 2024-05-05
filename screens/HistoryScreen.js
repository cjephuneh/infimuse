import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getClassSessions, getExperiences, getPackages, getVenues, getWorkshops, fetchWorkshopClasses } from '../../../redux/slice/listings';
import placeholderImage from '../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg';

const UpcomingScreen = () => {
    const [listings, setListings] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        retrieveToken();
    }, []);

    const retrieveToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                setToken(token);
                fetchListings(token);
            }
        } catch (error) {
            console.error('Error retrieving token:', error);
        }
    };

    const fetchListings = async (token) => {
        try {
            // Fetch all types of listings
            const classSessions = await getClassSessions(token);
            const experiences = await getExperiences(token);
            const packages = await getPackages(token);
            const venues = await getVenues(token);
            const workshops = await getWorkshops(token);
            const workshopClasses = await fetchWorkshopClasses(token);

            // Combine all listings into a single array
            const allListings = [
                ...classSessions,
                ...experiences,
                ...packages,
                ...venues,
                ...workshops,
                ...workshopClasses
            ];

            // Filter upcoming listings based on date
            const currentDate = new Date();
            const upcomingListings = allListings.filter(listing => new Date(listing.date) >= currentDate);

            // Sort the upcoming listings by date in ascending order
            upcomingListings.sort((a, b) => new Date(a.date) - new Date(b.date));

            // Set the sorted listings state
            setListings(upcomingListings);
        } catch (error) {
            console.error('Error fetching upcoming listings:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Upcoming</Text>
            {listings.map((listing) => (
                <TouchableOpacity key={listing.id} style={styles.listingCard}>
                    <Image
                        source={{ uri: listing.posterUrl || placeholderImage }}
                        style={styles.listingImage}
                        resizeMode="cover"
                    />
                    <View style={styles.listingInfo}>
                        <Text style={styles.listingTitle}>{listing.title}</Text>
                        <Text style={styles.listingDate}>{new Date(listing.date).toDateString()}</Text>
                        {/* Display listing type */}
                        <Text style={styles.listingType}>{listing.__typename}</Text>
                    </View>
                </TouchableOpacity>
            ))}
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
    listingCard: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
    },
    listingImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    listingInfo: {
        flex: 1,
        padding: 10,
    },
    listingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    listingDate: {
        fontSize: 16,
        marginBottom: 5,
    },
    listingType: {
        fontSize: 14,
        color: 'grey',
    },
});

export default UpcomingScreen;
