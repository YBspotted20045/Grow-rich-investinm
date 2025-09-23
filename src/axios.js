import axios from "axios";

// Base URL for your backend
const API = axios.create({
  baseURL: "https://grow-0nfm.onrender.com/api",
});

// Add token automatically to requests if user is logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Assuming JWT stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
