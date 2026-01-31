import { useEffect, useRef } from 'react';

// React Coding Question from
// https://bigfrontend.dev/react/usePrevious

export function usePrevious<T>(value: T): T | undefined {
  const previousRef = useRef<T | undefined>(undefined);

  useEffect(() => {
    previousRef.current = value;
  }, [value]);

  // This helper deliberately reads the ref during render to return the previous committed value
  // eslint-disable-next-line react-hooks/refs
  return previousRef.current;
}
