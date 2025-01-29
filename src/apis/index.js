import axios from "axios";

// Get the environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const IS_PRODUCTION = import.meta.env.VITE_ENV === "production";

// Create axios instance with the base URL
export const instance = axios.create({
  baseURL: API_BASE_URL,
});

// ================== REQUEST INTERCEPTOR ==================
instance.interceptors.request.use(
  (config) => {
    // Add token to headers if it exists
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    
    // Set default headers
    config.headers["Accept"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ================== RESPONSE INTERCEPTOR ==================
instance.interceptors.response.use(
  (response) => {
    // Store token from response (if exists)
    const token = response.data?.token;
    if (token) {
      localStorage.setItem("token", token);
    }
    return response;
  },
  (error) => {
    // Handle errors globally
    return handleApiError(error);
  }
);

// ================== HELPER FUNCTIONS ==================
export const constructUrl = (path) => {
  const basePath = IS_PRODUCTION ? API_BASE_URL : "/api";
  return `${basePath}${path}`;
};

export const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    const message = data?.message || "Unknown error";
    throw new Error(message);
  } else {
    throw new Error("Network error. Please try again.");
  }
};

export { axios };