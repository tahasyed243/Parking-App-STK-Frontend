// src/api/authApi.js
import axios from "axios";

const API = "https://parking-app-stk-backend-production.up.railway.app/api";

export const loginUser = async (credentials) => {
    try {
        const res = await axios.post(`${API}/auth/login`, credentials);
        return res.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const signupUser = async (userData) => {
    try {
        const res = await axios.post(`${API}/auth/register`, userData);
        return res.data;
    } catch (error) {
        console.error("Signup error:", error);
        throw error;
    }
};