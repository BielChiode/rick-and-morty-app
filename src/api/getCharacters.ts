import apiClient from './apiClient';

export interface ParamsCharacter {
  name?: string;
  status?: string;
  species?: string;
  page?: number;
}

export const fetchCharacters = async (params: ParamsCharacter = {}) => {
  try {
    const response = await apiClient.get('/character', { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    throw error;
  }
};
