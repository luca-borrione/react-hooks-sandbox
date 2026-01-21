import { useState, useEffect, useRef } from 'react';

function isPromise<T>(value: T | Promise<T> | undefined): value is Promise<T> {
  return value instanceof Promise;
}

// intentionally read and write these refs during render to track the latest fetcher and avoid re-running it unnecessarily
/* eslint-disable react-hooks/refs */
export function useSWR<T = unknown, E = unknown>(
  _: string,
  fetcher: () => T | Promise<T>,
): {
  data?: T;
  error?: E;
} {
  const resultRef = useRef<T | Promise<T> | undefined>(undefined);
  const prevFetcherRef = useRef<(() => T | Promise<T>) | undefined>(undefined);
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<E | undefined>();
  let syncError: E | undefined;

  // Reset when the fetcher changes
  if (prevFetcherRef.current !== fetcher) {
    resultRef.current = undefined;
    prevFetcherRef.current = fetcher;
  }

  if (resultRef.current === undefined) {
    try {
      resultRef.current = fetcher();
    } catch (e) {
      syncError = e as E;
    }
  }

  useEffect(() => {
    if (!isPromise(resultRef.current)) {
      return undefined;
    }
    let cancelled = false;
    resultRef.current
      .then((value) => cancelled || setData(value))
      .catch((err) => cancelled || setError(err as E));
    return () => {
      cancelled = true;
    };
  }, [fetcher]);

  return {
    data: isPromise(resultRef.current) ? data : resultRef.current,
    error: syncError || error,
  };
}
/* eslint-enable react-hooks/refs */
