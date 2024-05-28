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

  const paymentHistory = [
    { id: 1, course: 'Basic Cooking', amount: 'KSh 1,000.00', date: '2024-05-01' },
    { id: 2, course: 'Yoga for Beginners', amount: 'KSh 2,500.00', date: '2024-04-15' },
    { id: 3, course: 'Web Development Bootcamp', amount: 'KSh 5,000.00', date: '2024-03-20' },
    // Add more payment history entries as needed
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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

        <Text style={styles.subHeader}>Payment History</Text>
        {paymentHistory.map(history => (
          <Card key={history.id} containerStyle={styles.historyCard}>
            <Card.Title>{history.course}</Card.Title>
            <Card.Divider />
            <View style={styles.cardContent}>
              <View style={styles.historyContent}>
                <Text style={styles.historyAmount}>{history.amount}</Text>
                <Text style={styles.historyDate}>{history.date}</Text>
              </View>
              <Icon name="check-circle" size={24} color="#4CAF50" />
            </View>
          </Card>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.withdrawButton}>
        <Icon name="bank" size={24} color="#FFF" />
        <Text style={styles.withdrawText}>Withdraw</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    padding: 20,
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
  historyCard: {
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
  historyContent: {
    flexDirection: 'column',
  },
  historyAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  historyDate: {
    fontSize: 14,
    color: '#777',
  },
  withdrawButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 10,
    width: '90%',
  },
  withdrawText: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default WalletScreen;
