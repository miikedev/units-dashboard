import { constructUrl, instance, IS_PRODUCTION, axios } from ".";  

// Fetch all units  
export const fetchPositions = async (token) => {  
    console.log(token)
    const url = constructUrl(`/positions`);  
    try {  
      const response = IS_PRODUCTION  
      ? await instance.get(url,
        {  
            headers: {  
              Authorization: `Bearer ${token}`,  
              "Content-Type": "multipart/form-data"
            }, 
          }
      )  
      : await axios.get(url,
        {  
            headers: {  
              Authorization: `Bearer ${token}`,  
            }, 
          }
      ); 
      console.log(response?.data) 
    return response?.data;   
    } catch (error) {  
      console.error(`Error fetching positions:`, error.message);  
      throw error;  
    }  
}; 