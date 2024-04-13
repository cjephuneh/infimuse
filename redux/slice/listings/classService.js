// src/services/classService.js
const API_URL = 'https://yourapi.com/api'; // Adjust this to your actual API URL

export const createClassSession = async (classData) => {
  try {
    const response = await fetch(`https://whatever.lat/api/v1/classes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include other headers as needed, such as Authorization tokens
      },
      body: JSON.stringify(classData),
    });
    const json = await response.json();
    return json; // This should include status and doc as per your API response
  } catch (error) {
    console.error("Error creating class session:", error);
    throw error;
  }
};
