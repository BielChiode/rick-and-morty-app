// src/api/hooks/useGetCharactersByIds.ts

import { useState, useEffect } from "react";
import { fetchCharactersByIds } from "../getCharacters";
import type { Character } from "../../interfaces/Character";

interface UseGetCharactersByIdsReturn {
  charactersMap: Record<number, Character>;
  loading: boolean;
  error: string | null;
}

const charactersCache = new Map<number, Character>();

const useGetCharactersByIds = (ids: number[]): UseGetCharactersByIdsReturn => {
  const [charactersMap, setCharactersMap] = useState<Record<number, Character>>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ids.length) {
      setCharactersMap({});
      return;
    }

    const missingIds = ids.filter((id) => !charactersCache.has(id));

    if (missingIds.length === 0) {
      const mapAll = ids.reduce((acc, id) => {
        const char = charactersCache.get(id)!;
        acc[id] = char;
        return acc;
      }, {} as Record<number, Character>);
      setCharactersMap(mapAll);
      return;
    }

    setLoading(true);
    setError(null);

    fetchCharactersByIds(missingIds)
      .then((list) => {
        list.forEach((char) => charactersCache.set(char.id, char));

        const completeMap = ids.reduce((acc, id) => {
          const char = charactersCache.get(id);
          if (char) acc[id] = char;
          return acc;
        }, {} as Record<number, Character>);

        setCharactersMap(completeMap);
      })
      .catch((err) => {
        setError((err as Error).message || "Erro ao carregar personagens");
      })
      .finally(() => setLoading(false));
  }, [ids]);

  return { charactersMap, loading, error };
};

export default useGetCharactersByIds;
