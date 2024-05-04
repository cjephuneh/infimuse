const API_URI = "https://whatever.lat/api/v1/"; // Adjust this to your actual API URL

export const createExperience = async (experienceData, token) => {
    try {
        const response = await fetch(`${API_URI}/experiences`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
    
        body: JSON.stringify(experienceData),
        });
        if (!response.ok) {
        throw new Error("Failed to create experience");
        }
    
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error creating experience:", error);
        throw error;
    }
};

export const getExperiences = async (token) => {
    try {
        const response = await fetch(`${API_URI}/experiences`, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        });
    
        if (!response.ok) {
        throw new Error("Failed to fetch experiences");
        }
        const json = await response.json();
        return json;
    }
    catch (error) {
        console.error("Error fetching experiences:", error);
        throw error;
    }
}


export const getExperience = async (experienceId, token) => {
    try {
        const response = await fetch(`${API_URI}/experiences/${experienceId}`, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        });
        if (!response.ok) {
        throw new Error("Failed to fetch experience");
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error fetching experience:", error);
        throw error;
    }
}

export const updateExperience = async (experienceId, experienceData, token) => {
    try {
        const response = await fetch(`${API_URI}/experiences/${experienceId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(experienceData),
        });
        if (!response.ok) {
        throw new Error("Failed to update experience");
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error updating experience:", error);
        throw error;
    }
}

export const deleteExperience = async (experienceId, token) => {
    try {
        const response = await fetch(`${API_URI}/experiences/${experienceId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        });
        if (!response.ok) {
        throw new Error("Failed to delete experience");
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error deleting experience:", error);
        throw error;
    }
}


