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

export const getClassSessions = async (token) => {
  try {
    const response = await fetch(`${API_URL}/class-sessions`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the request headers
      },
    });
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

// Add this function to fetch a single class session
export const getClassSession = async (classId, token) => {
  try {
    const response = await fetch(`${API_URL}/class-sessions/${classId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the request headers
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch class session');
    }
    const json = await response.json();
    return json; // This should include status and doc as per your API response
  } catch (error) {
    console.error("Error fetching class session:", error);
    throw error;
  }
};

export const updateClassSession = async (classData, token) => {
  try {
    const response = await fetch(`${API_URL}/class-sessions/${classData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the request headers

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

export const deleteClassSession = async (classId, token) => {
  try {
    const response = await fetch(`${API_URL}/class-sessions/${classId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json ',
        'Authorization': `Bearer ${token}`, // Include the token in the request headers
      }

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

