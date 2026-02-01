import { useCallback, useState } from 'react';

export function useToggle(on: boolean): [boolean, () => void] {
  const [enabled, setEnabled] = useState(on);
  const toggle = useCallback(() => setEnabled(!enabled), [enabled]);
  return [enabled, toggle];
}
