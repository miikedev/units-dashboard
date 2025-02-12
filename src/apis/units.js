import { constructUrl, api } from ".";

// Fetch all units
export const fetchUnits = async (page = 1) => {
  const url = constructUrl(`/units?page=${page}`);
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching units:`, error);
    throw error;
  }
};

// Fetch a single unit by ID
export const fetchUnitById = async (id) => {
  const url = constructUrl(`/units/${id}`);
  console.log(url);
  try {
    const response = await api.get(url);
    console.log("fetch unit by id", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching unit with ID ${id}:`, error);
    throw error;
  }
};

// Create a new unit
export const createUnit = async (payload) => {
  console.log("payload in create unit api", payload);
  const url = constructUrl(`/units`);
  try {
    const response = await api.post(url, payload);
    return response;
  } catch (error) {
    console.error(`Error creating unit:`, error.message);
    throw error;
  }
};

// Update an existing unit
export const updateUnit = async (id, payload) => {
  const url = constructUrl(`/units/${id}`);
  console.log(url);
  try {
    const response = await api.put(url, payload);
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
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error(`Error deleting unit with ID ${id}:`, error);
    throw error;
  }
};
