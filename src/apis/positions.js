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
export const fetchPositionsByLevel   = async (level,token) => {  
  console.log(token)
  const url = constructUrl(`/positions-by-level/${level}`);  
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

export const fetchAllPositionsByAllLevels = async (token) => {
  try {
    // Define the levels to fetch
    const levels = ["state", "district", "township"];

    // Construct URLs for each level
    const urls = levels.map((level) => constructUrl(`/positions-by-level/${level}`));

    // Fetch data for all levels concurrently using Promise.all
    const responses = IS_PRODUCTION
      ? await Promise.all(
          urls.map((url) =>
            instance.get(url, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            })
          )
        )
      : await Promise.all(
          urls.map((url) =>
            axios.get(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );

    // Extract data from responses
    const positionsByLevels = responses.map((response) => response.data);

    // Combine the results into a single object with level keys
    const result = {
      state: positionsByLevels[0],
      district: positionsByLevels[1],
      township: positionsByLevels[2],
    };

    console.log("Fetched positions by levels:", result);
    return result;
  } catch (error) {
    console.error(`Error fetching positions for all levels:`, error.message);
    throw error;
  }
};