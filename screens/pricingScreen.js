import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../constants/Colors';
import { initializePayment } from '../redux/slice/payments/paymentSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import { Linking } from 'react-native';

const plansData = [
  {
    title: 'Dabbler',
    subtitle: 'Starter - (Pay as you go)',
    features: [
      '8% commission per Class booking including the Payment Processing Charges',
      '8% commission per Workshop & Package Booking inc payments',
      'Host decides the bearer of the cost (Host or User)',
      'Host pays entire commission',
      'Allows Hosts to schedule:',
      '- 50 Classes Listings per month',
      '- 1 Workshop Listings per month',
      '- 1 Package Listings per month',
    ],
    price: 'Pay as you go',
  },
  {
    title: 'Dipper',
    subtitle: 'Growth',
    features: [
      'Costs 9999/-',
      '5% Commission is applied to transactions of Hosts in this plan',
      'Host decides the bearer of the cost (Host or User)',
      'Host pays entire commission',
      'Host Pays Infimuse Commission, User pays Payment Processing Fees',
      'Allows Hosts to schedule:',
      '- 200 Classes per month',
      '- 20 Workshops per month',
      '- 2 Sponsored Listing Boots per month',
      'Basic analytics report',
      'Manage Staff',
    ],
    price: 'KES 9999',
  },
  {
    title: 'Diver',
    subtitle: 'Pro',
    features: [
      'Costs 16,999/- (3 months, 6 month, 12 months)',
      '2.9% Commission is applied to transactions of Hosts in this plan',
      'Host decides the bearer of the cost (Host or User)',
      'Host pays entire commission',
      'User pays entire commission',
      'Allows Hosts to schedule:',
      '- Unlimited Classes per month',
      '- Unlimited Workshops per month',
      '- 5 sponsored Listings per month',
      'Manage Staff',
      'Detailed analytics report',
    ],
    price: 'KES 16999',
  },
];

const MainSubscriptionContainer = (props) => {
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [hostId, setHostId] = useState(null);
  const [expandedPlan, setExpandedPlan] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const getHostIdFromToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          const id = decodedToken.id;
          setHostId(id);
        } else {
          console.error('Token not found in local storage');
        }
      } catch (error) {
        console.error('Error retrieving token from local storage:', error);
      }
    };

    getHostIdFromToken();
  }, []);

  const handlePayment = async () => {
    if (!hostId) {
      console.error('HostId is null');
      return;
    }

    setLoading(true);

    const paymentData = {
      hostId: hostId,
      callbackUrl: 'https://whatever.lat/api/v1/hostplans/verify',
      subscription: plan,
    };

    try {
      const response = await dispatch(initializePayment(paymentData));
      if (response && response.data && response.data.authorizationUrl) {
        const authorizationUrl = response.data.authorizationUrl;
        Linking.openURL(authorizationUrl);
      } else {
        console.error('Error initializing payment: Invalid response data');
      }
    } catch (error) {
      console.error('Error initializing payment:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (planTitle) => {
    setExpandedPlan(expandedPlan === planTitle ? null : planTitle);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Monthly Plan</Text>
      <Text style={styles.desc}>Professional or Business, it's your call</Text>
      <FlatList
        data={plansData}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setPlan(item.title);
              toggleExpand(item.title);
            }}
            style={[
              styles.planCard,
              plan === item.title && styles.planCardActive,
            ]}
          >
            <View>
              <Text style={styles.planTitle}>{item.title}</Text>
              <Text style={styles.planSubtitle}>{item.subtitle}</Text>
              {expandedPlan === item.title && (
                <View style={styles.planFeatures}>
                  {item.features.map((feature, index) => (
                    <Text key={index} style={styles.planFeatureText}>
                      • {feature}
                    </Text>
                  ))}
                </View>
              )}
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{item.price}</Text>
              <View
                style={[
                  styles.circle,
                  plan === item.title && styles.circleActive,
                ]}
              >
                {plan === item.title && <View style={styles.active} />}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={[
          styles.pay,
          plan && styles.payActive,
        ]}
        onPress={handlePayment}
        disabled={!plan || loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text style={styles.payTxt}>Pay Now</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MainSubscriptionContainer;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(20),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: Colors.theme.primary,
  },
  desc: {
    color: '#666',
    fontSize: moderateScale(14),
    marginTop: moderateScale(5),
    marginBottom: moderateScale(20),
  },
  pay: {
    width: '100%',
    backgroundColor: '#999',
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(25),
  },
  payTxt: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  payActive: {
    backgroundColor: Colors.theme.primary,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
    marginBottom: moderateScale(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planCardActive: {
    borderWidth: 2,
    borderColor: Colors.theme.primary,
  },
  planTitle: {
    color: Colors.theme.primary,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginBottom: moderateScale(5),
  },
  planSubtitle: {
    color: '#666',
    fontSize: moderateScale(14),
    marginBottom: moderateScale(10),
  },
  planFeatures: {
    marginTop: moderateScale(10),
  },
  planFeatureText: {
    color: '#666',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: Colors.theme.primary,
    marginBottom: moderateScale(5),
  },
  circle: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderStyle: 'solid',
    borderColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActive: {
    borderColor: Colors.theme.primary,
  },
  active: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(10 / 2),
    backgroundColor: Colors.theme.primary,
  },
});