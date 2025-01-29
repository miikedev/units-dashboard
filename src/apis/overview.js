import { instance, handleApiError } from ".";


export const fetchOverview = async () => {    
    try {  
      const response = await instance.get('/units/counts')  
        return response.data;  
    } catch (error) {  
        return handleApiError(error);
    }  
};  