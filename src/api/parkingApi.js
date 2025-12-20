import axios from "axios";

// Use deployed Railway backend
const API = "https://parking-app-stk-backend-production.up.railway.app/api/spots";

export const getSpots = async () => {
  try {
    const res = await axios.get(API);
    return res.data.data;
  } catch (error) {
    console.error("❌ API Error:", error.message);
    return [];
  }
};

export const reserveSpot = async (id, name) => {
  const res = await axios.put(`${API}/${id}/reserve`, { name });
  return res.data.spot;
};

export const occupySpot = async (id) => {
  const res = await axios.put(`${API}/${id}/occupy`);
  return res.data.spot;
};

export const freeSpot = async (id) => {
  const res = await axios.put(`${API}/${id}/free`);
  return res.data.spot;
};
