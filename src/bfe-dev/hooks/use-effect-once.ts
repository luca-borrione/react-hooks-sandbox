import { EffectCallback, useEffect, useRef } from 'react';

export function useEffectOnce(effect: EffectCallback) {
  const ref = useRef(effect);
  useEffect(() => ref.current(), []);
}
