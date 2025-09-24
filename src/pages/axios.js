// src/pages/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://grow-0nfm.onrender.com/api",
});

// Automatically attach JWT token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // JWT stored here
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
