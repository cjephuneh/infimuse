// src/services/PaymentService.js
const PaymentService = {
  initializePayment: async ({ subscription, hostId, callbackUrl, token }) => {
    try {
      const response = await fetch('https://whatever.lat/api/v1/hostplans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the request headers
        },
        body: JSON.stringify({ subscription, hostId, callbackUrl }),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error initializing payment:', error);
      throw error;
    }
  },
};

export default PaymentService;
