import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../constants/Colors';

const plansData = [
  {
    title: 'Flexible',
    subtitle: '',
    features: [
      'Allows users to get full refund anytime before the occurrence of a class, or First class of the Workshop or Package',
      'In case of workshop or packages, users will be allowed to cancel at any point during entire duration of the workshop or package & only pay for the classes they have attended & get a full refund on remaining',
    ],
    price: '',
  },
  {
    title: 'Moderate',
    subtitle: '',
    features: [
      'Users can get a full refund up to 12 hours before the occurrence of a class or the first class, in case of a workshop or a package and (50%) refund after until the occurrence of the first class.',
      'Users can cancel workshops or packages at any point until 50% completion of the listing and get 20% amount refunded',
    ],
    price: '',
  },
];

const MainSubscriptionContainer = () => {
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState(null);

  const toggleExpand = (planTitle) => {
    setExpandedPlan(expandedPlan === planTitle ? null : planTitle);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Cancellation Plan</Text>
      <Text style={styles.desc}>Flexible or Moderate, it's your call</Text>
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
        onPress={() => console.log(`Selected plan: ${plan}`)}
        disabled={!plan || loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text style={styles.payTxt}>Select Plan</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MainSubscriptionContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
