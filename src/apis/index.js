import axios from "axios";

// Environment variables (Vite handles .env files)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ENVIRONMENT = import.meta.env.VITE_ENV || "development";
export const IS_PRODUCTION = ENVIRONMENT === "production";

// Configure base URL based on environment
const baseURL = IS_PRODUCTION 
  ? API_BASE_URL 
  : "/api"; // Matches Vite proxy in development

console.log(`Environment: ${ENVIRONMENT}, API Base: ${baseURL}`);

// Create axios instance
export const instance = axios.create({ baseURL });

// ================== REQUEST INTERCEPTOR ==================
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.Accept = "application/json";
    
    // Add cache busting in production
    if (IS_PRODUCTION) {
      config.params = {
        ...config.params,
        _: Date.now()
      };
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// ================== RESPONSE INTERCEPTOR ==================
instance.interceptors.response.use(
  (response) => {
    const token = response.data?.token;
    if (token) {
      localStorage.setItem("token", token);
      
      // Secure cookie storage in production
      if (IS_PRODUCTION && typeof document !== 'undefined') {
        document.cookie = `token=${token}; Secure; SameSite=Strict; path=/`;
      }
    }
    return response;
  },
  (error) => {
    // Production error logging
    if (IS_PRODUCTION && window._Sentry) {
      window._Sentry.captureException(error);
    }
    
    return handleApiError(error);
  }
);

// ================== ERROR HANDLER ==================
export const handleApiError = (error) => {
  const fallbackMessage = IS_PRODUCTION
    ? "Service unavailable. Please try again later."
    : "Connection error. Check your network.";

  if (error.response) {
    const { status, data } = error.response;
    const message = data?.message || `HTTP Error ${status}`;
    throw new Error(message);
  }

  throw new Error(fallbackMessage);
};

export {axios}