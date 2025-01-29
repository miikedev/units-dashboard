import { instance, handleApiError } from ".";

export const fetchLogin = async ({ email, password }) => {   
    const payload = { email, password };  
    try {  
      const response = instance.post('/login',payload)  
      console.log(response)
        return response;
    } catch (error) {  
        console.log(error)
       return handleApiError(error);
  };  
}
  
  export const fetchLogout = async () => {  
    try {  
      const response = instance.post('/logout')    
      console.log(response)
      return response;  
    } catch (error) {  
      console.error(`Error fetching logout:`, error);  
      throw error; // Throw the error after logging it  
    }  
  };