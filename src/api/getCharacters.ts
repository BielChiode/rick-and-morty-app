import apiClient from "./apiClient";
import type { Character } from "../interfaces/Character";

export interface ParamsCharacter {
  name?: string;
  status?: string;
  species?: string;
  page?: number;
}

export const fetchCharacters = async (params: ParamsCharacter = {}) => {
  try {
    const response = await apiClient.get("/character", { params });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar personagens:", error);
    throw error;
  }
};

export const fetchCharactersByIds = async (
  ids: number[]
): Promise<Character[]> => {
  if (!ids.length) return [];
  try {
    const path = `/character/${ids.join(",")}`;
    const response = await apiClient.get<Character | Character[]>(path);
    const data = response.data;
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Erro ao buscar personagens por IDs:", error);
    throw error;
  }
};
