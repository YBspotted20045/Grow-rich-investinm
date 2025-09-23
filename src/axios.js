// src/axios.js
import axios from "axios";

// Change this URL to your backend URL on Render or local dev
const API = axios.create({
  baseURL: "https://your-backend-url.com/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
