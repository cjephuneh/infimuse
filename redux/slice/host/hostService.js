import * as jwt_decode from 'jwt-decode';
const API_URI = "https://whatever.lat/api/v1/"; // Adjust this to your actual API URL
import "core-js/stable/atob";


// Fetch current user
export const fetchCurrentHost = async (token) => {
    try {
        // Decode the token to extract the host ID
        const decodedToken = jwt_decode(token);
        const hostId = decodedToken.id; // Assuming the host ID is stored as 'id' in the token

        // Log the hostId
        console.log('Host ID:', hostId);

        const response = await fetch(`${API_URI}/hosts/${hostId}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch current host");
        }
        const json = await response.json();
        return json;
    }
    catch (error) {
        console.error("Error fetching current host:", error);
        throw error;
    }
}

// Update current user
export const updateCurrentHost = async (hostData, token) => {
    try {
        // Decode the token to extract the host ID
        const decodedToken = jwt_decode(token);
        const hostId = decodedToken.id; // Assuming the host ID is stored as 'id' in the token

        // Log the hostId
        console.log('Host ID:', hostId);

        const response = await fetch(`${API_URI}/hosts/${hostId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(hostData),
        });
        if (!response.ok) {
            throw new Error("Failed to update current host");
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error updating current host:", error);
        throw error;
    }
}
