import { api, constructUrl } from ".";


export const fetchOverview = async () => {    
    const url = constructUrl(`/units/counts`);  
  try {  
    const response = await api.get(url)  
      return response.data;  
  } catch (error) {  
    console.error(`Error fetching units:`, error);  
    throw error;  
  }    
};  