import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const WalletScreen = () => {
  const pendingPayments = [
    { id: 1, course: 'Introduction to Computers', amount: 'KSh 1,234.56' },
    { id: 2, course: 'Introduction to Guitar for Intermediates', amount: 'KSh 3,456.78' },
    { id: 3, course: 'Advanced Mathematics', amount: 'KSh 2,345.67' },
    // Add more pending payments as needed
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>My Wallet</Text>

      <Card containerStyle={styles.accountCard}>
        <Card.Title>Account Balance</Card.Title>
        <Card.Divider />
        <View style={styles.cardContent}>
          <Icon name="money" size={40} color="#4CAF50" />
          <Text style={styles.accountAmount}>KSh 123,456.78</Text>
        </View>
      </Card>

      <Text style={styles.subHeader}>Pending Payments</Text>
      {pendingPayments.map(payment => (
        <Card key={payment.id} containerStyle={styles.pendingCard}>
          <Card.Title>{payment.course}</Card.Title>
          <Card.Divider />
          <View style={styles.cardContent}>
            <Icon name="hourglass-half" size={24} color="#FFC107" />
            <Text style={styles.pendingAmount}>{payment.amount}</Text>
          </View>
        </Card>
      ))}

      <TouchableOpacity style={styles.withdrawButton}>
        <Icon name="bank" size={24} color="#FFF" />
        <Text style={styles.withdrawText}>Withdraw</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'left',
  },
  accountCard: {
    borderRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  pendingCard: {
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accountAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  pendingAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
  },
  withdrawText: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default WalletScreen;
