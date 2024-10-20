import { useEffect, useRef } from 'react';
import { useToggle } from '../hooks/use-toggle';

const values: boolean[] = [];

export function UseToggle() {
  const [on, toggle] = useToggle(true);
  const renderCountRef = useRef(1);
  useEffect(() => {
    if (renderCountRef.current < 5) {
      renderCountRef.current += 1;
      toggle();
    }
  }, [on, toggle]);
  values.push(on);
  console.log('>> values', values);
  return null;
}
