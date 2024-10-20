import { Ref, useRef, useState, useCallback } from 'react';

export function useHover<T extends HTMLElement>(): [Ref<T>, boolean] {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const ref = useRef<T>();

  const callbackRef = useCallback(
    (node: T) => {
      const previousNode = ref.current;

      if (previousNode) {
        previousNode.removeEventListener('mouseenter', handleMouseEnter);
        previousNode.removeEventListener('mouseleave', handleMouseLeave);
      }

      ref.current = node;

      if (node) {
        node.addEventListener('mouseenter', handleMouseEnter);
        node.addEventListener('mouseleave', handleMouseLeave);
      }
    },
    [handleMouseEnter, handleMouseLeave]
  );

  return [callbackRef, isHovered];
}
