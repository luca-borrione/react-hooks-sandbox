import { EffectCallback, useEffect, useRef } from 'react';

// React Coding Question from
// https://bigfrontend.dev/react/useEffectOnce

export function useEffectOnce(effect: EffectCallback) {
  const effectRef = useRef(effect);
  useEffect(() => effectRef.current(), []);
}
