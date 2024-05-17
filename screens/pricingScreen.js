import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../constants/Colors';
import { initializePayment } from '../redux/slice/payments/paymentSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import { Linking } from 'react-native';

const plansData = [
  {
    title: 'Dabbler',
    subtitle: 'Starter - (Free Plan)',
    description: `Commission Package\n8% commission per Class booking including the Payment Processing Charges\n8% commission per Workshop & Package Booking inc payments\nHost decides the bearer of the cost (Host or User)\nHost pays entire commission\nAllows Hosts to schedule;\n50 Classes Listings per month\n1 Workshop Listings per month\n1 Package Listings per month`,
    price: 'Pay as you go',
  },
  {
    title: 'Dipper',
    subtitle: 'Growth',
    description: `Costs 9999/-\n5% Commission is applied to transactions of Hosts in this plan\nHost decides the bearer of the cost (Host or User)\nHost pays entire commission\nHost Pays Infimuse Commission, User pays Payment Processing Fees\nAllows Hosts to schedule upto;\n200 Classes per month\n20 Workshops per month\n2 Sponsored Listing Boots per month\nBasic analytics report\nManage Staff`,
    price: 'KES 9999',
  },
  {
    title: 'Diver',
    subtitle: 'Pro',
    description: `Costs 16,999/-  (3 months, 6 month, 12 months)\n2.9% Commission is applied to transactions of Hosts in this plan\nHost decides the bearer of the cost (Host or User)\nHost pays entire commission\nUser pays entire commission\nAllows Hosts to schedule and offers them;\nUnlimited Classes per month\nUnlimited Workshops per month\n5 sponsored Listings per month\nManage Staff\nDetailed analytics report`,
    price: 'KES 16999',
  },
];

const MainSubscriptionContainer = (props) => {
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [hostId, setHostId] = useState(null);
  const [expandedPlan, setExpandedPlan] = useState(null); // State to track expanded card
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const getHostIdFromToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Retrieved token:', token);
        if (token) {
          const decodedToken = jwtDecode(token);
          console.log('Decoded token:', decodedToken); // Add this line to check the decoded token
          const id = decodedToken.id;
          setHostId(id);
          console.log('HostId:', id); // Log the hostId
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
              styles.plan,
              plan === item.title && {
                borderColor: Colors.theme.primary,
              },
            ]}
          >
            <View>
              <Text style={styles.planTitle}>{item.title}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.amount}>{item.price}</Text>
                <Text style={styles.period}>/mo</Text>
              </View>
              {expandedPlan === item.title && (
                <Text style={styles.planDescription}>{item.description}</Text>
              )}
            </View>
            <View
              style={[
                styles.circle,
                plan === item.title && {
                  borderColor: Colors.theme.primary,
                },
              ]}
            >
              {plan === item.title && <View style={styles.active} />}
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={[
          styles.pay,
          plan && {
            backgroundColor: Colors.theme.primary,
          },
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
    fontSize: moderateScale(22),
    fontWeight: '800',
  },
  desc: {
    color: '#999',
    fontSize: moderateScale(13),
    marginTop: moderateScale(5),
  },
  pay: {
    width: '100%',
    backgroundColor: '#999',
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20),
  },
  payTxt: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  plans: {
    marginTop: moderateScale(20),
  },
  plan: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: moderateScale(15),
    borderWidth: moderateScale(1),
    borderStyle: 'solid',
    borderColor: '#D7D7D7',
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(10),
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
  active: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(10 / 2),
    backgroundColor: Colors.theme.primary,
  },
  planTitle: {
    color: Colors.theme.primary,
    fontSize: moderateScale(20),
    marginBottom: moderateScale(10),
  },
  amount: {
    fontSize: moderateScale(20),
    fontWeight: '900',
  },
  period: {
    color: '#999',
  },
  planDescription: {
    marginTop: moderateScale(10),
    color: '#666',
  },
});
