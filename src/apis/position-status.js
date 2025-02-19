import { constructUrl, api } from ".";
export const fetchPositionStatuses = async (
  type,
  page = 1,
  limit = 20,
  search = ''
) => {
  const baseUrl = '/position-statuses';
  const queryParams = [];

  // Add required parameters
  queryParams.push(`type=${encodeURIComponent(type)}`);
  queryParams.push(`page=${page}`);
  queryParams.push(`limit=${limit}`);

  // Add search if provided
  if (search && search.trim() !== '') {
    queryParams.push(`search=${encodeURIComponent(search.trim())}`);
  }

  // Construct final URL
  const url = `${baseUrl}?${queryParams.join('&')}`;

  try {
    const response = await api.get(constructUrl(url));
    return response?.data;
  } catch (error) {
    console.error(`Error fetching position statuses:`, error.message);
    throw error;
  }
};
