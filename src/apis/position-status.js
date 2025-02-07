import { constructUrl, api } from ".";
export const fetchPositionStatuses = async (type, page, limit) => {  
    console.log('type in fetch position statuses', type);
    const url = constructUrl(`/position-statuses?type=${type}&page=${page}&limit=${limit}`);  
    try {  
      const response = await api.get(url) 
    return response?.data;   
    } catch (error) {  
      console.error(`Error fetching positions:`, error.message);  
      throw error;  
    }  
}; 