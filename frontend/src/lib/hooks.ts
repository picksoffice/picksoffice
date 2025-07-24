import { useState, useEffect } from 'react';
import { StrapiResponse } from './api';

type FetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

/**
 * Custom hook for fetching data from the API
 * @param fetchFn - Function to fetch data
 * @param dependencies - Dependencies array to control refetching
 */
export function useApiQuery<T>(
  fetchFn: () => Promise<StrapiResponse<T>>,
  dependencies: React.DependencyList = []
): FetchState<StrapiResponse<T>> {
  const [state, setState] = useState<FetchState<StrapiResponse<T>>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setState(prev => ({ ...prev, isLoading: true }));

      try {
        const result = await fetchFn();

        if (isMounted) {
          setState({
            data: result,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            isLoading: false,
            error: error instanceof Error ? error : new Error(String(error)),
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return state;
}
