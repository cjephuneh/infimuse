// src/services/apiService.js
// import { API_URI } from '../../../utils/ApiUrls'; // Adjust the import path as needed

export const fetchStaffMembers = async () => {
  try {
    const response = await fetch(`https://whatever.lat/api/v1/staffs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include other headers as required, e.g., Authorization for token
      }
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error('Failed to fetch staff: ' + (json.error || 'Unknown Error'));
    }
    return json.Document; // Correctly accessing the array within the 'Document' key
  } catch (error) {
    console.error('Failed to fetch staff:', error);
    throw error;
  }
};

export const updateStaffMember = async (staffId, staffData) => {
  try {
    const response = await fetch(`https://whatever.lat/api/v1/staffs/${staffId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Include other headers as required, e.g., Authorization for token
      },
      body: JSON.stringify(staffData),
    });
    if (!response.ok) {
      throw new Error('Failed to update staff member');
    }
  } catch (error) {
    console.error('Failed to update staff member:', error);
    throw error;
  }
};



//staff login
export const loginStaff = async (email, password) => {
  try {
    const response = await fetch(`https://whatever.lat/api/v1/staffs/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error('Failed to login staff: ' + (json.error || 'Unknown Error'));
    }
    return json;
  } catch (error) {
    console.error('Failed to login staff:', error);
    throw error;
  }
};


//staff register
export const registerStaff = async (staffData) => {
  try {
    const response = await fetch(`https://whatever.lat/api/v1/staffs/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(staffData),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error('Failed to register staff: ' + (json.error || 'Unknown Error'));
    }
    return json;
  } catch (error) {
    console.error('Failed to register staff:', error);
    throw error;
  }
};


/// invite staff to a template with name and email
export const inviteStaff = async (staffData) => {
  try {
    const response = await fetch(`https://whatever.lat/api/v1/staffs/invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(staffData),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error('Failed to invite staff: ' + (json.error || 'Unknown Error'));
    }
    return json;
  } catch (error) {
    console.error('Failed to invite staff:', error);
    throw error;
  }
};