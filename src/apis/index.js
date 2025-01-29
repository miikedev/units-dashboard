import axios from "axios";  

// Get the environment variables  
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;  
const IS_PRODUCTION = import.meta.env.VITE_ENV === "production";  
console.log(IS_PRODUCTION);
console.log(API_BASE_URL)
// Create axios instance with the base URL  
const instance = axios.create({  
  baseURL: API_BASE_URL,  
});  

const constructUrl = (path) => {  
  // In production, do not include /api; in development, include it  
  const basePath = IS_PRODUCTION ? API_BASE_URL : `/api`;  

  return `${basePath}${path}`;  
};  
export { IS_PRODUCTION, constructUrl, instance, axios };

