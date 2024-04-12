import React, { useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { ScreenHeight } from '@rneui/base';
import FastImage from 'react-native-fast-image';
import Colors from '../constants/Colors';



const MainSubscriptionContainer = (props) => {
  const [plan, setPlan] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Monthly Plan</Text>
      <Text style={styles.desc}>Professional or Business, it's your call</Text>
      <FlatList
        data={Array(1)}
        keyExtractor={(item) => `${item}`}
        ListFooterComponent={<View style={{ marginBottom: moderateScale(100) }} />}
        renderItem={(item) => (
          <View key={item.index} style={{ marginBottom: moderateScale(100) }}>
            <View style={styles.plans}>
              <TouchableOpacity
                onPress={() => setPlan('Business')}
                style={[
                  styles.plan,
                  plan === 'Business' && { borderColor: Colors.theme.primary },
                ]}
              >
                <View>
                  <Text style={styles.planTitle}>Business</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.amount}>KES 2000</Text>
                    <Text style={styles.period}>/mo</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.circle,
                    plan === 'Business' && {
                      borderColor: Colors.theme.primary,
                    },
                  ]}
                >
                  {plan === 'Business' && <View style={styles.active}></View>}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPlan('Professional')}
                style={[
                  styles.plan,
                  plan === 'Professional' && {
                    borderColor: Colors.theme.primary,
                  },
                ]}
              >
                <View>
                  <Text style={styles.planTitle}>Professional</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.amount}>KES 2000</Text>
                    <Text style={styles.period}>/mo</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.circle,
                    plan === 'Professional' && {
                      borderColor: Colors.theme.primary,
                    },
                  ]}
                >
                  {plan === 'Professional' && (
                    <View style={styles.active}></View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: moderateScale(20) }}>
              <Text style={{ fontSize: moderateScale(15), fontWeight: '900' }}>
                Payment Method
              </Text>
              <View style={styles.cardContainer}>
                <TouchableOpacity
                  onPress={() => setPaymentMethod('Card')}
                  style={styles.cardSelector}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FastImage
                      source={require('../assets/icons/card.png')}
                      style={{
                        width: moderateScale(40),
                        height: moderateScale(40),
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text
                      style={{
                        marginLeft: moderateScale(10),
                        fontSize: moderateScale(15),
                        fontWeight: '800',
                      }}
                    >
                      Credit/Debit card
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.circle,
                      paymentMethod === 'Card' && {
                        borderColor: Colors.theme.primary,
                      },
                    ]}
                  >
                    {paymentMethod === 'Card' && (
                      <View style={styles.active}></View>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                styles.cardContainer,
                {
                  marginTop: moderateScale(20),
                  borderRadius: moderateScale(10),
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => setPaymentMethod('Mpesa')}
                style={styles.cardSelector}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FastImage
                    source={require('../assets/icons/mpesa.png')}
                    style={{
                      width: moderateScale(40),
                      height: moderateScale(40),
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <Text
                    style={{
                      marginLeft: moderateScale(10),
                      fontSize: moderateScale(15),
                      fontWeight: '800',
                    }}
                  >
                    Mpesa
                  </Text>
                </View>
                <View
                  style={[
                    styles.circle,
                    paymentMethod === 'Mpesa' && {
                      borderColor: Colors.theme.primary,
                    },
                  ]}
                >
                  {paymentMethod === 'Mpesa' && (
                    <View style={styles.active}></View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={[
          styles.pay,
          (plan === 'Business' || plan === 'Professional') &&
            (paymentMethod === 'Card' || paymentMethod === 'Mpesa')
            ? {
                backgroundColor: Colors.theme.primary,
              }
            : { backgroundColor: '#999' },
        ]}
        disabled={plan === 'Business' || 'Professional' ? false : true}
      >
        <Text style={styles.payTxt}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainSubscriptionContainer;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(20),
    height: ScreenHeight,
  },
  title: {
    fontSize: moderateScale(22),
    fontWeight: '800',
  },
  cardSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(10),
  },
  savedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(10),
  },
  newCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(10),
  },
  cardContainer: {
    backgroundColor: Colors.theme.primaryLightBg,
    padding: moderateScale(10),
    marginTop: moderateScale(10),
    borderRadius: moderateScale(10),
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#F2E0F2',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
        }
      : {
          elevation: 5,
        }),
    marginHorizontal: moderateScale(5),
  },
  desc: {
    color: '#999',
    fontSize: moderateScale(13),
    marginTop: moderateScale(5),
  },
  pay: {
    bottom: ScreenHeight * 0.22,
    width: '100%',
    backgroundColor: Colors.theme.primary,
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

