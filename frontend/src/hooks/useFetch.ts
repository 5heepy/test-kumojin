import { useState, useCallback } from 'react';
import type { AxiosResponse } from 'axios';
import { FetchStatus } from '../enums';

export const useFetch = <T>(
  fetcher: (params?: unknown) => Promise<AxiosResponse<T>>
) => {
  const [status, setStatus] = useState(FetchStatus.PENDING);
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);

  const execute = useCallback(
    async (params: unknown) => {
      setStatus(FetchStatus.FETCHING);
      setResult(null);
      setError(null);

      try {
        const response = await fetcher(params);
        setResult(response.data);
        setStatus(FetchStatus.SUCCESS);
      } catch (error) {
        console.error({ error });
        setError(error);
        setStatus(FetchStatus.ERROR);
      }
    },
    [fetcher]
  );

  return { execute, status, result, error };
};
