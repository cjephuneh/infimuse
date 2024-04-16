const API_URI = "https://whatever.lat/api/v1/"; // Adjust this to your actual API URL

export const createWorkshop = async (workshopData, token) => {
  try {
    const response = await fetch(`${API_URI}/workshops`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },

      body: JSON.stringify(workshopData),
    });
    if (!response.ok) {
      throw new Error("Failed to create workshop");
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error creating workshop:", error);
    throw error;
  }
};

export const getWorkshops = async (token) => {
  try {
    const response = await fetch(`${API_URI}/workshops`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch workshops");
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching workshops:", error);
    throw error;
  }
};

export const getWorkshop = async (workshopId, token) => {
  try {
    const response = await fetch(`${API_URI}/workshops/${workshopId}`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch workshop");
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching workshop:", error);
    throw error;
  }
};

//

export const updateWorkshop = async (workshopData, token) => {
  try {
    const response = await fetch(`${API_URI}/workshops/${workshopData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(workshopData),
    });
    if (!response.ok) {
      throw new Error("Failed to update workshop");
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error updating workshop:", error);
    throw error;
  }
};

export const deleteWorkshop = async (workshopId, token) => {
  try {
    const response = await fetch(`${API_URI}/workshops/${workshopId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete workshop");
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error deleting workshop:", error);
    throw error;
  }
};
