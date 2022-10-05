import { useState, useCallback } from "react";
import type { AxiosResponse } from 'axios';

export const useFetch = (fetcher: (params?: any) => Promise<AxiosResponse>) => {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState<AxiosResponse | null>(null);
    const [error, setError] = useState<unknown>(null);
  
    const execute = useCallback(async (params: any) => {
        setLoading(true);
        setValue(null);
        setError(null);
  
        try {
            const response = await fetcher(params);
            setValue(response);
            setLoading(false);
        } catch (error) {
            console.log({ error })
            setError(error);
            setLoading(false);
        }
    }, [fetcher]);

  
    return { execute, loading, value, error };
  };