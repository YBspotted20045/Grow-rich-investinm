// src/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://grow-0nfm.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

// Attach token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("gr_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Helpful error logging
API.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err.message;
    console.error("API Error:", msg, err?.response || "");
    return Promise.reject(err);
  }
);

export default API;
