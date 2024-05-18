import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Share,
} from 'react-native';
import { getClassSessions } from '../redux/slice/listings/classService';
import { getExperiences } from '../redux/slice/listings/ExperienceService';
import { getPackages } from '../redux/slice/listings/packagesServices';
import { getVenues } from '../redux/slice/listings/VenueService';
import { getWorkshops } from '../redux/slice/listings/workshopService';
import { fetchWorkshopClasses } from '../redux/slice/listings/WorkshopClassService';
import Poster from '../assets/posterDesign.png';

const UpcomingScreen = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
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
            setLoading(false);
        } catch (error) {
            console.error('Error fetching listings:', error);
            setLoading(false);
        }
    };

    const shareListing = async (listing) => {
        try {
            const shareOptions = {
                title: listing.title,
                message: `Title: ${listing.title}\nDate: ${new Date(listing.date).toDateString()}\nPrice: ${listing.price || 'Free'}`,
                url: listing.posterUrl || Poster, // Use the imported Poster image if posterUrl is not available
            };

            const result = await Share.share(shareOptions);

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // Shared via activity type
                } else {
                    // Shared
                }
            } else if (result.action === Share.dismissedAction) {
                // Dismissed
            }
        } catch (error) {
            console.error('Error sharing:', error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Upcoming</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                listings.length > 0 ? (
                    listings.map((listing, index) => (
                        <TouchableOpacity key={index} style={styles.listingCard} onPress={() => shareListing(listing)}>
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
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text>No Upcoming Listings</Text>
                )
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