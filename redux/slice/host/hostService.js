import jwt_decode from 'jwt-decode'; // Import the jwt_decode function from the jwt-decode library
const API_URI = "https://whatever.lat/api/v1/"; // Adjust this to your actual API URL


// Fetch current user
export const fetchCurrentHost = async (token) => {
    try {
        // Decode the token to extract the host ID
        const decodedToken = decodeToken(token);
        const hostId = decodedToken.hostId;

        // Log the hostId
        console.log('Host ID:', hostId);

        const response = await fetch(`${API_URI}/hosts/33`, {
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
        const decodedToken = decodeToken(token);
        const hostId = decodedToken.hostId;

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

// Function to decode JWT token
const decodeToken = (token) => {
    try {
        // Decode the JWT token using jwt-decode library
        const decodedToken = jwt_decode(token);
        return decodedToken;
    } catch (error) {
        console.error("Error decoding token:", error);
        throw error;
    }
}
