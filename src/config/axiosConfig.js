// src/utils/axiosInstance.js
import axios from "axios";
import { URL } from "./PortConfig";

// Base API URL (change as needed)
const BASE_URL = URL;

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization token automatically (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle global errors (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can customize global error handling here
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
