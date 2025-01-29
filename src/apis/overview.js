import { axios, constructUrl, instance, IS_PRODUCTION, handleApiError } from ".";


export const fetchOverview = async () => {  
    const url = constructUrl(`/units/counts`);  
    try {  
      const response = IS_PRODUCTION  
        ? await instance.get(url)  
        : await axios.get(url);  
        return response.data;  
    } catch (error) {  
        return handleApiError(error);
    }  
  };  