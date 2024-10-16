import { useCallback, useEffect, useState } from "react";

export function useSWR<T = any, E = any>(
  _key: string,
  fetcher: () => T | Promise<T>
): {
  data?: T;
  error?: E;
} {
  const [error, setError] = useState<E | undefined>(undefined);
  const [data, setData] = useState<T | undefined>();

  const fetch = useCallback(() => fetcher(), [fetcher]);
  const result = fetch();
  const isPromise = result instanceof Promise;

  useEffect(() => {
    (async function () {
      if (isPromise) {
        try {
          const data = await result;
          setData(data);
        } catch (e) {
          setError(e as E);
        }
      }
    })();
  }, [fetcher, result, isPromise]);

  return {
    data: isPromise ? data : result,
    error,
  };
}
