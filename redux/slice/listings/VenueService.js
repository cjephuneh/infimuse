const API_URI = "https://whatever.lat/api/v1/"; // Adjust this to your actual API URL

export const createVenue = async (venueData, token) => {
    try {
        const response = await fetch(`${API_URI}/venues`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
    
        body: JSON.stringify(venueData),
        });
        if (!response.ok) {
        throw new Error("Failed to create venue");
        }
    
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error creating venue:", error);
        throw error;
    }
};


export const getVenues = async (token) => {
    try {
        const response = await fetch(`${API_URI}/venues`, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        });

        if (!response.ok) {
        throw new Error("Failed to fetch venues");
        }
        const json = await response.json();
        return json;
    }
    catch (error) {
        console.error("Error fetching venues:", error);
        throw error;
    }
}


export const getVenue = async (venueId, token) => {
    try {
        const response = await fetch(`${API_URI}/venues/${venueId}`, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        });
        if (!response.ok) {
        throw new Error("Failed to fetch venue");
        }
        const json = await response.json();
        return json;
    }
    catch (error) {
        console.error("Error fetching venue:", error);
        throw error;
    }
}


export const updateVenue = async (venueData, token) => {
    try {
        const response = await fetch(`${API_URI}/venues/${venueData.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(venueData),
        })
        if (!response.ok) {
            throw new Error("Failed to update venue");
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error updating venue:", error);
        throw error;
    }
}


export const deleteVenue = async (venueId, token) => {
    try {
        const response = await fetch(`${API_URI}/venues/${venueId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        });
        if (!response.ok) {
        throw new Error("Failed to delete venue");
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error deleting venue:", error);
        throw error;
    }
}



