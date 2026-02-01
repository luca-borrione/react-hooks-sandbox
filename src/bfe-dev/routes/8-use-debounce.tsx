import { useState } from 'react';
import { useDebounce } from '../hooks/8-use-debounce';

export function UseDebounce() {
  const [counter, setCounter] = useState(1);
  const debouncedValue = useDebounce(counter, 1000);

  const handleClick = () => {
    setCounter(counter + 1);
  };

  return (
    <>
      <h1>DEBOUNCED COUNTER VALUE: {debouncedValue}</h1>
      <h2>counter: {counter}</h2>
      <button onClick={handleClick}>COUNT UP</button>
    </>
  );
}
