import apiClient from './apiClient';

export interface ParamsLocation {
  name?: string;
  type?: string;
  page?: number;
}

export const fetchLocations = async (params: ParamsLocation = {}) => {
  try {
    const response = await apiClient.get('/location', { params });
    return response.data;
  } catch (error) {
    console.error('Error on get locations:', error);
    throw error;
  }
};
