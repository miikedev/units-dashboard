import { constructUrl, api } from ".";
export const fetchPositionStatuses = async (
  type,
  page = 1,
  limit = 10,
  search = '',
  status = ''
) => {
  const baseUrl = '/position-statuses';
  const queryParams = [];

  // Add always-included parameters
  queryParams.push(`type=${encodeURIComponent(type)}`);
  queryParams.push(`limit=${limit}`);

  // Conditionally add page parameter
  if (!search.trim()) {
    queryParams.push(`page=${page}`);
  }

  // Add search if provided
  if (search.trim()) {
    queryParams.push(`search=${encodeURIComponent(search.trim())}`);
  }

  // Add status if provided
  if (status.trim()) {
    queryParams.push(`status=${encodeURIComponent(status.trim())}`);
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