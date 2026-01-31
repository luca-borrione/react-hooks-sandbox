import { useRef, useEffect } from 'react';

// React Coding Question from
// https://bigfrontend.dev/react/usetimeout

export function useTimeout(callback: () => void, delay: number) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const timerId = setTimeout(() => callbackRef.current(), delay);
    return () => clearTimeout(timerId);
  }, [delay]);
}
