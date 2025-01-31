import { IS_PRODUCTION, constructUrl, instance, axios } from ".";  

// Fetch all units  
export const fetchUnits = async (page=1) => {  
  const url = constructUrl(`/units?page=${page}`);  
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

// Fetch a single unit by ID  
export const fetchUnitById = async (id) => {  
  const url = constructUrl(`/units/${id}`); 
  console.log(url) 
  try {  
    const response = IS_PRODUCTION  
      ? await instance.get(url)  
      : await axios.get(url);  
    console.log('fetch unit by id', response.data)
    return response.data;  
  } catch (error) {  
    console.error(`Error fetching unit with ID ${id}:`, error);  
    throw error;  
  }  
};  

// Create a new unit  
export const createUnit = async (payload, token) => {  
  console.log(payload)
  const url = constructUrl(`/units`);  
  try {  
    const response = IS_PRODUCTION  
      ? await instance.post(url, payload,
        {  
            headers: {  
              Authorization: `Bearer ${token}`,  
              "Content-Type": "multipart/form-data"
            }, 
          }
      )  
      : await axios.post(url, payload,
        {  
            headers: {  
              Authorization: `Bearer ${token}`,  
            }, 
          }
      );  
    return response;  
  } catch (error) {  
    console.error(`Error creating unit:`, error.message);  
    throw error;  
  }  
};  

// Update an existing unit  
export const updateUnit = async (id, payload) => {
  const url = constructUrl(`/units/${id}`);
  console.log(url)
  try {
    const response = IS_PRODUCTION ? await instance.put(url, payload) : await axios.put(url, payload);
    console.log('update unit', response.data)  // Debugging purposes
    return response.data;
  } catch (error) {
    console.error(`Error updating unit with ID ${id}:`, error);
    throw error;
  }
};

// Delete a unit  
export const deleteUnit = async (id) => {  
  const url = constructUrl(`/units/${id}`);  
  try {  
    const response = IS_PRODUCTION  
      ? await instance.delete(url)  
      : await axios.delete(url);  
    return response.data;  
  } catch (error) {  
    console.error(`Error deleting unit with ID ${id}:`, error);  
    throw error;  
  }  
};  

