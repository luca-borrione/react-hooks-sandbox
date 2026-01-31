import { Ref, useCallback, useState } from 'react';

export function useHover<T extends HTMLElement>(): [Ref<T>, boolean] {
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = useCallback(() => setIsHover(true), []);
  const handleMouseLeave = useCallback(() => setIsHover(false), []);

  const callbackRef = useCallback(
    (node: T) => {
      if (node) {
        node.addEventListener('mouseenter', handleMouseEnter);
        node.addEventListener('mouseleave', handleMouseLeave);
      }
      return () => {
        if (node) {
          node.removeEventListener('mouseenter', handleMouseEnter);
          node.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    },
    [handleMouseEnter, handleMouseLeave],
  );

  return [callbackRef, isHover];
}
