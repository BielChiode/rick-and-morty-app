import axios from 'axios';

export interface Params {
  name?: string;
  status?: string;
  species?: string;
  page?: number;
}

const apiClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 5000, // Timeout opcional
});

export const fetchCharacters = async (params: Params = {}) => {
  try {
    const response = await apiClient.get('/character', { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    throw error;
  }
};
