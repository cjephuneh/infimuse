import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Share
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getClassSessions } from '../redux/slice/listings/classService';
import { getExperiences } from '../redux/slice/listings/ExperienceService';
import { getPackages } from '../redux/slice/listings/packagesServices';
import { getVenues } from '../redux/slice/listings/VenueService';
import { getWorkshops } from '../redux/slice/listings/workshopService';
import { fetchWorkshopClasses } from '../redux/slice/listings/WorkshopClassService';

import placeholderImage from '../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg';

const UpcomingScreen = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            // Assuming these functions return the correct format
            const classSessionsRes = await getClassSessions();
            const experiencesRes = await getExperiences();
            const packagesRes = await getPackages();
            const venuesRes = await getVenues();
            const workshopsRes = await getWorkshops();
            const workshopClassesRes = await fetchWorkshopClasses();

            const allListings = [
                ...classSessionsRes.Document,
                ...experiencesRes.Document,
                ...packagesRes.Document,
                ...venuesRes.Document,
                ...workshopsRes.Document,
                ...workshopClassesRes.Document,
            ].filter(listing => listing.status === "upcoming");

            setListings(allListings);
            console.log('All listings:', allListings);
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Upcoming</Text>
            {listings.length > 0 ? (
                listings.map((listing, index) => (
                    <View key={index} style={styles.listingCard}>
                        <Image
                            source={{ uri: listing.posterUrl || 'https://via.placeholder.com/100' }}
                            style={styles.listingImage}
                            resizeMode="cover"
                        />
                        <View style={styles.listingInfo}>
                            <Text style={styles.listingTitle}>{listing.title || 'No Title'}</Text>
                            <Text style={styles.listingDate}>{new Date(listing.date).toDateString()}</Text>
                            <Text style={styles.listingPrice}>Price: {listing.price || 'Free'}</Text>
                        </View>
                    </View>
                ))
            ) : (
                <Text>No Upcoming Listings</Text>
            )}
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
    listingPrice: {
        fontSize: 14,
        color: 'grey',
    },
});

export default UpcomingScreen;
