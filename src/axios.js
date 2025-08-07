import axios from 'axios';

const API = axios.create({
  baseURL: 'https://grow-0nfm.onrender.com/api', // Your live backend URL
});

export default API;
