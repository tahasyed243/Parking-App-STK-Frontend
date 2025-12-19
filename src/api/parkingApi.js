import axios from "axios";

const API = "https://parking-app-stk-backend-production.up.railway.app/api";

export const getSpots = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const reserveSpot = async (id, name, minutes) => {
  const res = await axios.post(`${API}/reserve/${id}`, { name, minutes });
  return res.data;
};

export const occupySpot = async (id) => {
  const res = await axios.post(`${API}/occupy/${id}`);
  return res.data;
};

export const freeSpot = async (id) => {
  const res = await axios.post(`${API}/free/${id}`);
  return res.data;
};
