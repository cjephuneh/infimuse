import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getClassSessions, getExperiences, getPackages, getVenues, getWorkshops, fetchWorkshopClasses } from '../../../redux/slice/listings';
import { getClassSessions} from '../redux/slice/listings/classService';
import { getExperiences } from '../redux/slice/listings/ExperienceService';
import { getPackages } from '../redux/slice/listings/packagesServices';
import { getVenues } from '../redux/slice/listings/VenueService';
import { getWorkshops } from '../redux/slice/listings/workshopService';
import { fetchWorkshopClasses } from '../redux/slice/listings/WorkshopClassService';

import placeholderImage from '../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg';

const HistoryScreen = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            // Fetch all types of listings
            const classSessions = await getClassSessions('token');
            const experiences = await getExperiences('token');
            const packages = await getPackages('token');
            const venues = await getVenues('token');
            const workshops = await getWorkshops('token');
            const workshopClasses = await fetchWorkshopClasses('token');

            // Combine all listings into a single array
            const allListings = [
                ...classSessions,
                ...experiences,
                ...packages,
                ...venues,
                ...workshops,
                ...workshopClasses
            ];

            // Sort the listings by date in descending order
            allListings.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Set the sorted listings state
            setListings(allListings);
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>History</Text>
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

export default HistoryScreen;
