import { useState } from 'react';
import { useEffectOnce } from '../hooks/9-use-effect-once';

export function UseEffectOnce() {
  const [counter, setCounter] = useState(1);
  const [effectResult, setEffectResult] = useState<number | null>(null);

  useEffectOnce(() => setEffectResult(counter));

  const handleClick = () => setCounter(counter + 1);

  return (
    <>
      <h1>EFFECT RESULT: {effectResult}</h1>
      <h2>counter: {counter}</h2>
      <button onClick={handleClick}>COUNT UP</button>
    </>
  );
}
