import { useEffect, useRef } from 'react';

export function useIsFirstRender(): boolean {
  const isFirstRender = useRef(true);
  useEffect(() => {
    isFirstRender.current = false;
  });
  // This hook intentionally exposes the ref value during render to model
  // eslint-disable-next-line react-hooks/refs
  return isFirstRender.current;
}
