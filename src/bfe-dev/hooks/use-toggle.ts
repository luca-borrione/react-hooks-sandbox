import { useCallback, useState, useReducer } from 'react';

export function useToggle(on: boolean): [boolean, () => void] {
  const [enbaled, setEnabled] = useState(on);
  const toggle = useCallback(() => {
    setEnabled(!enbaled);
  }, [enbaled]);
  return [enbaled, toggle];
}

export function useToggleq1(on: boolean): [boolean, () => void] {
  return useReducer((state) => !state, on);
}
