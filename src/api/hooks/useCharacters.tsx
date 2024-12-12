import { useState, useEffect } from 'react';
import { fetchCharacters, Params } from '../getCharacters';

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
}

interface ApiResponse {
  results: Character[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

interface UseCharactersReturn {
  characters: Character[];
  loading: boolean;
  error: string | null;
  info: ApiResponse['info'] | null;
  setParams: (params: Params) => void;
}

const useCharacters = (initialParams: Params = {}): UseCharactersReturn => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<ApiResponse['info'] | null>(null); // Para armazenar as informações de paginação
  const [params, setParams] = useState<Params>(initialParams);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCharacters(params);
        setCharacters(data.results || []);
        setInfo(data.info); // Armazenando as informações de paginação
      } catch (err) {
        const errorMessage =
          (err as Error).message || 'Erro ao carregar personagens';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  return {
    characters,
    loading,
    error,
    info, // Retornando as informações de paginação
    setParams,
  };
};

export default useCharacters;
