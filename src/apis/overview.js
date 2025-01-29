import { instance, constructUrl, IS_PRODUCTION, axios } from ".";


export const fetchOverview = async () => {    
    const url = constructUrl(`/units/counts`);  
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