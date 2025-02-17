import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Install jwt-decode for decoding tokens

const API_URL = "http://localhost:8080/api/v1"; // Replace with your backend URL

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Function to check if a token is expired
const isTokenExpired = (token: string): boolean => {
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp! < currentTime;
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");

    // If the access token is expired, redirect to login
    if (accessToken && isTokenExpired(accessToken)) {
      localStorage.removeItem("accessToken"); // Clear expired token
      window.location.href = "/login"; // Redirect to login page
      return config;
    }

    // Attach the access token to the request headers
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to an expired access token, redirect to login
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      localStorage.removeItem("accessToken"); // Clear expired token
      window.location.href = "/login"; // Redirect to login page
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
