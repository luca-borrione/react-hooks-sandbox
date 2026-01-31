import { useRef, useState } from 'react';
import type { MouseEventHandler } from 'react';
import { usePrevious } from '../hooks/5-use-previous';

export function UsePrevious() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [currentValue, setCurrentValue] = useState<string | undefined>(undefined);
  const previousValue = usePrevious(currentValue);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (inputRef.current) {
      console.log('>> inputRef.current', inputRef.current.value);
      setCurrentValue(inputRef.current.value);
    }
  };

  return (
    <>
      {previousValue && <p>Previous Value: {previousValue}</p>}
      <input ref={inputRef} type="text"></input>
      <button onClick={handleClick}>UPDATE VALUE</button>
    </>
  );
}
