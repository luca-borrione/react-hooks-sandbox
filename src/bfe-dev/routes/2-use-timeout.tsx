import { useState, useRef, useEffect } from 'react';
import { useTimeout } from '../hooks/2-use-timeout';

interface UseTimeoutParams {
  callback: () => void;
  delay: number;
}

function callback1() {
  console.log('>> this is callback 1');
}

function callback2() {
  console.log('>> this is callback 2');
}

function UseTimeout({ callback, delay }: UseTimeoutParams) {
  const initialTime = useRef(Date.now());

  useEffect(() => {
    initialTime.current = Date.now();
  }, [delay]);

  const handleCallback = () => {
    const delay = Date.now() - initialTime.current;
    console.log('>> delay: ', delay);
    callback();
  };

  useTimeout(handleCallback, delay);
  return null;
}

export function UseTimeoutApp() {
  const [delay, setDelay] = useState(5000);
  const [callback, setCallback] = useState(() => callback1);

  return (
    <>
      <h1>use timeout app</h1>
      <UseTimeout callback={callback} delay={delay} />
      <button onClick={() => setDelay(1000)}>change delay</button>
      <br />
      <button onClick={() => setCallback(() => callback2)}>change callback</button>
    </>
  );
}
