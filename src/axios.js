// src/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://grow-0nfm.onrender.com/api",
  withCredentials: true,
});

export default API;
