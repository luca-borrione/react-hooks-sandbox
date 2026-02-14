import { useCallback, useState } from 'react';

// React Coding Question from
// https://bigfrontend.dev/react/useToggle

export function useToggle(on: boolean): [boolean, () => void] {
  const [enabled, setEnabled] = useState(on);
  const toggle = useCallback(() => setEnabled(!enabled), [enabled]);
  return [enabled, toggle];
}
