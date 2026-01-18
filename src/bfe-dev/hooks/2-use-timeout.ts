import { useRef, useEffect } from 'react';

export function useTimeout(callback: () => void, delay: number) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const timerId = setTimeout(() => callbackRef.current(), delay);
    return () => clearTimeout(timerId);
  }, [delay]);
}
