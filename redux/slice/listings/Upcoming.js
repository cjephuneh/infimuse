const API_URI = "https://whatever.lat/api/v1/"; // Adjust this to your actual API URL

export const getUpcoming = async (token) => {
    try {
        const response = await fetch(`${API_URI}hosts/upcoming`, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        });
    
        if (!response.ok) {
        throw new Error("Failed to fetch Upcoming");
        }
        const json = await response.json();
        return json;
    }
    catch (error) {
        console.error("Error fetching Upcoming:", error);
        throw error;
    }
}