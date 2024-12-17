import { useState, useEffect } from 'react';
import { Location } from '../../interfaces/Location';
import { fetchLocations, ParamsLocation } from '../getLocations';

interface ApiResponse {
  results: Location[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

interface UseLocationsReturn {
  locations: Location[];
  loading: boolean;
  error: string | null;
  info: ApiResponse['info'] | null;
  setParams: (params: ParamsLocation) => void;
}

const useGetLocations = (
  initialParams: ParamsLocation = {}
): UseLocationsReturn => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<ApiResponse['info'] | null>(null);
  const [params, setParams] = useState<ParamsLocation>(initialParams);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchLocations(params);
        setLocations(data.results || []);
        setInfo(data.info);
      } catch (err) {
        const errorMessage =
          (err as Error).message || 'Erro ao carregar locations';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  return {
    locations,
    loading,
    error,
    info,
    setParams,
  };
};

export default useGetLocations;
