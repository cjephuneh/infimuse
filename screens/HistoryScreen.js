import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Share
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getClassSessions } from '../redux/slice/listings/classService';
import { getExperiences } from '../redux/slice/listings/ExperienceService';
import { getPackages } from '../redux/slice/listings/packagesServices';
import { getVenues } from '../redux/slice/listings/VenueService';
import { getWorkshops } from '../redux/slice/listings/workshopService';
import { fetchWorkshopClasses } from '../redux/slice/listings/WorkshopClassService';
import placeholderImage from '../assets/_8e7e9a6e-d314-4014-b9ad-4bfaaa838ff1.jpeg';
import NoDataIcon from '../assets/image copy.png'; // Assuming you have an icon or GIF in assets

const HistoryScreen = () => {
    const navigation = useNavigation();
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
                url: listing.posterUrl || placeholderImage,
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
        <View style={styles.container}>
            <Text style={styles.heading}>History</Text>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {listings.length > 0 ? (
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
                        <View style={styles.noDataContainer}>
                            <Image source={NoDataIcon} style={styles.noDataImage} />
                            <Text style={styles.noDataText}>No History Listings Found</Text>
                            <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CreateTemplatesScreen')}>
                                <Text style={styles.createButtonText}>Create a Listing</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#000',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    listingCard: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
        padding: 10,
    },
    listingImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    listingInfo: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
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
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    noDataImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    noDataText: {
        fontSize: 18,
        color: 'grey',
        marginBottom: 20,
    },
    createButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    createButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HistoryScreen;
