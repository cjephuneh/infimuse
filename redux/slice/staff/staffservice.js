// src/services/apiService.js
// import { API_URI } from '../../../utils/ApiUrls'; // Adjust the import path as needed

export const fetchStaffMembers = async () => {
  try {
    const response = await fetch(`https://whatever.lat/api/v1/staffs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include other headers as required, e.g., Authorization for token
      }
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error('Failed to fetch staff: ' + (json.error || 'Unknown Error'));
    }
    return json.Document; // Correctly accessing the array within the 'Document' key
  } catch (error) {
    console.error('Failed to fetch staff:', error);
    throw error;
  }
};
