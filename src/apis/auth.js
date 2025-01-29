import { axios, constructUrl, instance, IS_PRODUCTION } from ".";

export const fetchLogin = async ({ email, password }) => {  
    const url = constructUrl(`/login`);  
    const payload = { email, password };  
    try {  
      const response = IS_PRODUCTION  
        ? await instance.post(url, payload)  
        : await axios.post(url, payload);  
      return response;  
    } catch (error) {  
      console.error(`Error fetching login:`, error);  
      throw error; // It's usually a good idea to throw the error after logging it  
    }  
  };  
  
  export const fetchLogout = async ({ token }) => {  
    const url = constructUrl(`/logout`);  
    try {  
      const response = IS_PRODUCTION  
        ? await instance.post(url, null, {  
            headers: {  
              Authorization: `Bearer ${token}`,  
            },  
          })  
        : await axios.post(url, null, {  
            headers: {  
              Authorization: `Bearer ${token}`,  
            },  
          });  
      
      return response;  
    } catch (error) {  
      console.error(`Error fetching logout:`, error);  
      throw error; // Throw the error after logging it  
    }  
  };