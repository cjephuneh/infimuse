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
import PaystackPop from 'react-native-paystack-popup';

const MainSubscriptionContainer = (props) => {
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [hostId, setHostId] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const getHostIdFromToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Retrieved token:', token);
        if (token) {
          const decodedToken = jwtDecode(token);
          console.log('Decoded token:', decodedToken);
          const id = decodedToken.id;
          setHostId(id);
          console.log('HostId:', id);
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
      console.log('Payment initialization response:', response); // Log the response
      if (response && response.data && response.data.authorizationUrl) {
        const authorizationUrl = response.data.authorizationUrl;
        // Instead of navigating, trigger Paystack checkout process
        triggerPaystackCheckout(authorizationUrl);
      } else {
        console.error('Error initializing payment: Invalid response data');
      }
    } catch (error) {
      console.error('Error initializing payment:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to trigger Paystack checkout process
  const triggerPaystackCheckout = (authorizationUrl) => {
    const accessCode = authorizationUrl.split('/').pop(); // Extract access code from URL
    const paystack = new PaystackPop();
    paystack.checkout({
      accessCode: accessCode,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Monthly Plan</Text>
      <Text style={styles.desc}>Professional or Business, it's your call</Text>
      <FlatList
        data={['Dabbler', 'Dipper', 'Diver']}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setPlan(item)}
            style={[
              styles.plan,
              plan === item && {
                borderColor: Colors.theme.primary,
              },
            ]}
          >
            <View>
              <Text style={styles.planTitle}>{item}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.amount}>KES 2000</Text>
                <Text style={styles.period}>/mo</Text>
              </View>
            </View>
            <View
              style={[
                styles.circle,
                plan === item && {
                  borderColor: Colors.theme.primary,
                },
              ]}
            >
              {plan === item && <View style={styles.active} />}
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
});
