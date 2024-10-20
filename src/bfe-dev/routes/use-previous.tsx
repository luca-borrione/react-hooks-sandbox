import { type MouseEvent, useRef, useState } from 'react';
import { usePrevious } from '../hooks/use-previous';

export function UsePrevious() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<string | undefined>();
  const previousValue = usePrevious(value);
  console.log('>> value', value, ' | previousValue: ', previousValue);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!ref.current || ref.current.value === '') {
      console.log('>> abort');
      return false;
    }
    setValue(ref.current.value);
    ref.current.value = '';
    return false;
  }

  return (
    <>
      <p>PREVIOUS VALUE: {previousValue}</p>
      <form>
        <input ref={ref} type="text"></input>
        <button onClick={handleClick}>CHANGE</button>
      </form>
    </>
  );
}
