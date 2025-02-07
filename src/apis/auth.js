import { api, constructUrl } from ".";

export const fetchLogin = async ({ email, password }) => {  
    const url = constructUrl(`/login`);  
    const payload = { email, password };  
    try {  
      const response = await api.post(url, payload);
      return response;  
    } catch (error) {  
      console.error(`Error fetching login:`, error);  
      throw error; // It's usually a good idea to throw the error after logging it  
    }  
  };  
  
  export const fetchLogout = async ({ token, refreshToken }) => {  
    const url = constructUrl(`/logout`);  

    console.log('fetch logout', url, token, refreshToken);

    try {  
        const response = await api.post(url, { refreshToken });  

        return response.data;  
    } catch (error) {  
        console.error(`Error fetching logout:`, error?.response?.data || error.message);  
        throw error;  
    }  
};