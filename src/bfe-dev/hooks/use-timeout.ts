import { useRef, useEffect } from 'react';

export function useTimeout(callback: () => void, delay: number) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  const timerIdRef = useRef(0);
  useEffect(() => {
    timerIdRef.current = window.setTimeout(() => callbackRef.current(), delay);
    return () => {
      window.clearTimeout(timerIdRef.current);
    };
  }, [delay]);
}
