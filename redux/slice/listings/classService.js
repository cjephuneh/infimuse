// src/services/classService.js
const API_URL = 'https://whatever.lat/api/v1/'; // Adjust this to your actual API URL

export const createClassSession = async (classData, token) => {
  try {
    const response = await fetch(`https://whatever.lat/api/v1/class-sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the request headers
      },
      body: JSON.stringify(classData),
    });
    // console.log('Response body:', await response.text());
    if (!response.ok) {
      throw new Error('Failed to create class session');
    }
    const json = await response.json();
    return json; // This should include status and doc as per your API response
  } catch (error) {
    console.error("Error creating class session:", error);
    throw error;
  }
};


export const getClassSessions = async () => {
  try {
    const response = await fetch(`${API_URL}/class-sessions`);
    if (!response.ok) {
      throw new Error('Failed to fetch class sessions');
    }
    const json = await response.json();
    return json; // This should include status and doc as per your API response
  } catch (error) {
    console.error("Error fetching class sessions:", error);
    throw error;
  }
};

export const updateClassSession = async (classData) => {
  try {
    const response = await fetch(`${API_URL}/class-sessions/${classData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(classData),
    });
    if (!response.ok) {
      throw new Error('Failed to update class session');
    }
    const json = await response.json();
    return json; // This should include status and doc as per your API response
  } catch (error) {
    console.error("Error updating class session:", error);
    throw error;
  }
};

export const deleteClassSession = async (classId) => {
  try {
    const response = await fetch(`${API_URL}/class-sessions/${classId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete class session');
    }
    const json = await response.json();
    return json; // This should include status and doc as per your API response
  } catch (error) {
    console.error("Error deleting class session:", error);
    throw error;
  }
};

