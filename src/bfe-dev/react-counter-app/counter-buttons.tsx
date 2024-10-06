import React, { useState } from "react";

export function CounterButtons() {
  const [counter, setCounter] = useState(0);

  const inceaseCounter = () => setCounter(counter + 1);
  const decreaseCounter = () => setCounter(counter - 1);

  return (
    <div>
      <button data-testid="decrement-button" onClick={decreaseCounter}>
        -
      </button>
      <button data-testid="increment-button" onClick={inceaseCounter}>
        +
      </button>
      <p>clicked: {counter}</p>
    </div>
  );
}
