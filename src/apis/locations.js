import { constructUrl, api } from ".";

// Fetch all units
export const fetchLocations = async (token) => {
  console.log(token);
  const url = constructUrl(`/locations`);
  try {
    const response = await api.get(url);
    return response?.data;
  } catch (error) {
    console.error(`Error fetching locations:`, error.message);
    throw error;
  }
};
