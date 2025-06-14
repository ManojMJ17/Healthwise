import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const registerUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/register/`, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post(`${API_BASE_URL}/login/`, credentials);
};

export const fetchUserDetails = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user-details/`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error.response?.data || error.message);
    throw error;
  }
};

