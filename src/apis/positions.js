import { constructUrl, instance, IS_PRODUCTION, axios } from ".";  

// Fetch all units  
export const fetchPositions = async () => {  
    const url = constructUrl(`/positions`);  
    try {  
      const response = IS_PRODUCTION  
        ? await instance.get(url)  
        : await axios.get(url);  
        return response.data;  
    } catch (error) {  
      console.error(`Error fetching units:`, error);  
      throw error;  
    }  
  }; 