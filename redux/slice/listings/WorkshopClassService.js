const API_URI = "https://whatever.lat/api/v1/"; // Adjust this to your actual API URL

export const fetchWorkshopClasses = async (token) => {
    try {
        const response = await fetch(`${API_URI}/workshop-classes`, {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
      
        });
            if (!response.ok) {
        throw new Error("Failed to fetch workshop classes");
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error fetching workshop classes:", error);
        throw error;
    }
    };

export const fetchWorkshopClass = async (workshopClassId, token) => {
    try {
        const response = await fetch(`${API_URI}/workshop-classes/${workshopClassId}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
              },
        
          });

        if (!response.ok) {
        throw new Error("Failed to fetch workshop class");
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error fetching workshop class:", error);
        throw error;
    }
    }


export const createWorkshopClass = async (workshopClassData, token) => {
    try {
        const response = await fetch(`${API_URI}/workshop-classes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(workshopClassData),
        });
        if (!response.ok) {
            throw new Error("Failed to create workshop class");
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error creating workshop class:", error);
        throw error;
    }
    }

    

export const updateWorkshopClass = async (workshopClassId, workshopClassData, token) => {
    try {
        const response = await fetch(`${API_URI}/workshop-classes/${workshopClassId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(workshopClassData),
        });
        if (!response.ok) {
            throw new Error("Failed to update workshop class");
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error updating workshop class:", error);
        throw error;
    }
    }


export const deleteWorkshopClass = async (workshopClassId, token) => {
    try {
        const response = await fetch(`${API_URI}/workshop-classes/${workshopClassId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to delete workshop class");
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error deleting workshop class:", error);
        throw error;
    }
    }




