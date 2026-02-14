import { useState } from 'react';

// React Coding Question from
// https://bigfrontend.dev/react/The-React-Counter

export function CounterButtons() {
  const [counter, setCounter] = useState(0);
  const handleIncrement = () => setCounter(counter + 1);
  const handleDecrement = () => setCounter(counter - 1);

  return (
    <>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleIncrement}>+</button>
      <p>clicked: {counter}</p>
    </>
  );
}
