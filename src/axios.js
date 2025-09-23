// src/axios.js
import axios from "axios";

// Use your live backend URL
const API = axios.create({
  baseURL: "https://grow-0nfm.onrender.com/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically add Authorization header if token exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
