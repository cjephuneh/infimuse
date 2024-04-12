// src/services/AuthService.js
import { API_URI } from '../../../utils/ApiUrls'; // Make sure to have your base API URI correctly set here

const AuthService = {
  signUp: async (data) => {
    try {
      const response = await fetch(`https://whatever.lat/api/v1/hosts/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  },
  // Add other authentication methods (signIn, signOut, etc.) here as needed
    // Add login method
    login: async (data) => {
        try {
          const response = await fetch(`https://whatever.lat/api/v1/hosts/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          const json = await response.json();
          return json;
        } catch (error) {
          console.error('Error during login:', error);
          throw error;
        }
      },
};

export default AuthService;
