import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const RefundScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Refund & Cancellations</Text>

        <Text style={styles.sectionHeading}>Refund Policy</Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo, eros vitae
          lobortis lobortis, mauris purus feugiat ligula, nec condimentum ipsum elit sed augue.
          Nulla ac semper mi. Proin fringilla arcu quis lorem ullamcorper, vel rutrum enim
          tristique. Nulla aliquam, libero vel rutrum posuere, leo lorem congue neque, at dapibus
          tortor dui at mi. Nulla eget eleifend nulla. Quisque id tortor eu lorem egestas
          condimentum. Nullam aliquam efficitur velit non vehicula.
        </Text>

        <Text style={styles.sectionHeading}>Cancellation Policy</Text>
        <Text style={styles.paragraph}>
          Fusce sit amet erat nec ligula ultrices finibus. Phasellus vel arcu sed arcu
          sollicitudin tincidunt. Nam malesuada ante urna, nec rhoncus metus venenatis non. Sed
          aliquet gravida felis, non pellentesque eros auctor id. Donec elementum tempus ipsum vel
          malesuada. Sed vitae eleifend lectus. Aliquam pulvinar felis id sapien fermentum, et
          posuere tortor placerat. Integer fringilla, velit non dapibus posuere, lectus lorem
          pharetra ligula, a rutrum magna leo ut nibh.
        </Text>

        {/* Add more sections as needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default RefundScreen;
