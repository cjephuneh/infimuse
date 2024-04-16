const API_URL = 'https://whatever.lat/api/v1/'; // Adjust this to your actual API URL

export const createPackage = async (packageData, token) => {
  try {
    const response = await fetch(`${API_URL}/package-classes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(packageData),
    });
    if (!response.ok) {
      throw new Error('Failed to create package-classes');
    }
    const json = await response.json();
    return json;
    }
    catch (error) {
        console.error('Error creating package-classes:', error);
        throw error;
        }
}

export const getPackages = async (token) => {    
  try {
    const response = await fetch(`${API_URL}/package-classes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch package-classes');
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching package-classes:', error);
    throw error;
  }
}

// Add this function to fetch a single package-classes
export const getaPackage = async (packageId, token) => {
    try {
        const response = await fetch(`${API_URL}/package-classes/${packageId}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
        throw new Error('Failed to fetch package-classes');
        }
        const json = await response.json();
        return json;
    }
    catch (error) {
        console.error('Error fetching package-classes:', error);
        throw error;
    }
}


export const updatePackage = async (packageData, token) => {
    try {
        const response = await fetch(`${API_URL}/package-classes/${packageData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(packageData),
        });
        if (!response.ok) {
        throw new Error('Failed to update package-classes');
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error updating package-classes:', error);
        throw error;w
    }
}


export const deletePackage = async (packageId) => {
    try {
        const response = await fetch(`${API_URL}/package-classes/${packageId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        });
        if (!response.ok) {
        throw new Error('Failed to delete package-classes');
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error deleting package-classes:', error);
        throw error;
    }
}


