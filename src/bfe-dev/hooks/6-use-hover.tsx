import { Ref, useCallback, useState } from 'react';

// React Coding Question from
// https://bigfrontend.dev/react/useHover

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
        // The cleanup of the callback ref needs React 19+
        // Currently this is failing on the online bfe validation, because they are using a previous version
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
