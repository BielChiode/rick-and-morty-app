import { useState, useEffect } from 'react';
import { Character } from '../../interfaces/Character';
import { getCharacterDetails } from '../getCharacterDetails';

interface UseCharacterDetailsReturn {
  character: Character | null;
  loading: boolean;
  error: string | null;
}

const useCharacterDetails = (
  characterId: string | number
): UseCharacterDetailsReturn => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!characterId) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getCharacterDetails(characterId);
        setCharacter(data);
      } catch (err) {
        const errorMessage =
          (err as Error).message || 'Erro ao carregar detalhes do personagem';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [characterId]);

  return {
    character,
    loading,
    error,
  };
};

export default useCharacterDetails;
