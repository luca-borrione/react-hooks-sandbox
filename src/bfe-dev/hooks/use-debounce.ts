import { useState, useRef, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  const timerId = useRef(0);

  useEffect(() => {
    console.log('>> set a new timer', delay);
    timerId.current = window.setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => window.clearTimeout(timerId.current);
  }, [value, delay]);

  return debounced;
}
