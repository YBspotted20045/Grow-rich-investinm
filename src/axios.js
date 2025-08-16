import axios from "axios";

const API = axios.create({
  baseURL: "https://grow-0nfm.onrender.com", // <-- Replace with your Render backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// You can also add interceptors if needed, for auth tokens, etc.
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default API;
