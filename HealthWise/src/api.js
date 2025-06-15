import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const registerUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/register/`, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post(`${API_BASE_URL}/login/`, credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });

};

export const fetchUserDetails = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  if (!email) throw new Error("User not logged in");

  const response = await axios.post(`${API_BASE_URL}/get-profile-details/`, {
    email: email,
  });

  return response.data;
};

export const updateProfile = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/update-profile/`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};