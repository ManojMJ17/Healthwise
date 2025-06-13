import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const registerUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/register/`, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post(`${API_BASE_URL}/login/`, credentials);
};