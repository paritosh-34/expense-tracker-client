import { useState, useEffect } from 'react';
import { IEndpoint } from '@constants/apiEndpoints';
import apiService from '@services/apiService';
import { baseApiReturn } from '@interfaces/';

const useFetch = <T extends baseApiReturn>(
  endpoint: IEndpoint,
  payload: Record<string, unknown> = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    apiService<T>(endpoint, payload)
      .then((r) => {
        if (!r) setError(true);
        else setData(r);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

export default useFetch;
