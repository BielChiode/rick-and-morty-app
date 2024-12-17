import { useState, useEffect } from 'react';
import { fetchCharacters, ParamsCharacter } from '../getCharacters';
import { Character } from '../../interfaces/Character';

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
  setParams: (params: ParamsCharacter) => void;
}

const useGetCharacters = (
  initialParams: ParamsCharacter = {}
): UseCharactersReturn => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<ApiResponse['info'] | null>(null);
  const [params, setParams] = useState<ParamsCharacter>(initialParams);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCharacters(params);
        setCharacters(data.results || []);
        setInfo(data.info);
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
    info,
    setParams,
  };
};

export default useGetCharacters;
