import apiClient from './apiClient';

export const getCharacterDetails = async (id: string | number) => {
  try {
    const response = await apiClient.get(`/character/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar detalhes do personagem com ID ${id}:`, error);
    throw error;
  }
};
