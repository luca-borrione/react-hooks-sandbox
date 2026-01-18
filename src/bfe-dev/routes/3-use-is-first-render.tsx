import { useState } from 'react';
import { useIsFirstRender } from '../hooks/3-use-is-first-render';

export function UseIsFirstRenderApp() {
  const isFirstRender = useIsFirstRender();
  const [counter, setCounter] = useState(0);
  console.log('>> isFirstRender', isFirstRender);
  return (
    <>
      <h1>use is first render app</h1>
      <p>is first render: {isFirstRender}</p>
      <button onClick={() => setCounter(counter + 1)}>Render Again</button>
    </>
  );
}
