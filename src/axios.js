import axios from "axios";

const API = axios.create({
  baseURL: "https://grow-0nfm.onrender.com/api", // ✅ make sure /api is included
});

// ✅ Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("gr_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
