import { useState } from 'react';

export function CounterButtons() {
  const [counter, setCounter] = useState(0);
  const handleIncrement = () => setCounter(counter + 1);
  const handleDecrement = () => setCounter(counter - 1);

  return (
    <div>
      <button data-testid="decrement-button" onClick={handleDecrement}>
        -
      </button>
      <button data-testid="increment-button" onClick={handleIncrement}>
        +
      </button>
      <p>clicked: {counter}</p>
    </div>
  );
}
