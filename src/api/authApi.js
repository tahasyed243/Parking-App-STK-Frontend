// src/api/authApi.js
import axios from "axios";

// Railway deployed backend base URL
const API = "https://parking-app-stk-backend-production.up.railway.app/api/auth";

export const loginUser = async (credentials) => {
  try {
    const res = await axios.post(`${API}/login`, credentials);
    return res.data; // { success, message, token, user }
  } catch (error) {
    console.error("Login error:", error?.response?.data || error);
    throw error;
  }
};

export const signupUser = async (userData) => {
  try {
    const res = await axios.post(`${API}/register`, userData);
    return res.data; // { success, message, token, user }
  } catch (error) {
    console.error("Signup error:", error?.response?.data || error);
    throw error;
  }
};
