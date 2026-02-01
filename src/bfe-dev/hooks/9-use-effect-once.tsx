import { EffectCallback, useEffect, useRef } from 'react';

export function useEffectOnce(effect: EffectCallback) {
  const effectRef = useRef(effect);
  useEffect(() => effectRef.current(), []);
}
