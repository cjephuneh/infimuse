const API_URL = 'https://whatever.lat/api/v1/'; // Adjust this to your actual API URL


export const createWorkshop = async (workshopData, token) => {
  try {
    const response = await fetch(`${API_URI}/workshops`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },

        body: JSON.stringify(workshopData),
    });
    if (!response.ok) {
      throw new Error('Failed to create workshop');
    }

    const json = await response.json();
    return json;
    } catch (error) {
        console.error('Error creating workshop:', error);
        throw error;
        }

}


export const getWorkshops = async () => {    
  try {
    const response = await fetch(`${API_URI}/workshops`);
    if (!response.ok) {
      throw new Error('Failed to fetch workshops');
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching workshops:', error);
    throw error;
  }
}




export const updateWorkshop = async (workshopData) => {
    try {
        const response = await fetch(`${API_URI}/workshops/${workshopData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(workshopData),
        });
        if (!response.ok) {
        throw new Error('Failed to update workshop');
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error updating workshop:', error);
        throw error;
    }
    };


export const deleteWorkshop = async (workshopId) => {
    try {
        const response = await fetch(`${API_URI}/workshops/${workshopId}`, {
        method: 'DELETE',
        });
        if (!response.ok) {
        throw new Error('Failed to delete workshop');
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error deleting workshop:', error);
        throw error;
    }
    }

    