import { constructUrl, api } from ".";

// Fetch all units
export const fetchUnits = async (page = 1, search = '', status) => {
  console.log('searching...', search);

  let url = "/units";

  // Add search parameter only when it exists
  const queryParams = [];

  if (search && search.trim() !== "") {
    queryParams.push(`search=${encodeURIComponent(search)}`);
  } else {
    queryParams.push(`page=${page}`);
  }

  if (status) {
    queryParams.push(`status=${status}`);
  }

  if (queryParams.length > 0) {
    url += `?${queryParams.join("&")}`;
  }

  try {
    const response = await api.get(constructUrl(url));
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
    const response = await api.patch(url, payload);
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
