import { Ref, useRef, useState, useCallback } from 'react';

export function useFocus<T extends HTMLElement>(): [Ref<T>, boolean] {
  const nodeRef = useRef<T | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = useCallback(() => setIsFocused(true), []);
  const handleOnBlur = useCallback(() => setIsFocused(false), []);

  const callbackRef = useCallback(
    (node: T) => {
      console.log('>> node', node);
      const previousNode = nodeRef.current;
      if (previousNode) {
        previousNode.removeEventListener('focus', handleOnFocus);
        previousNode.removeEventListener('blur', handleOnBlur);
      }

      nodeRef.current = node;

      if (node) {
        node.addEventListener('focus', handleOnFocus);
        node.addEventListener('blur', handleOnBlur);
      }
    },
    [handleOnFocus, handleOnBlur]
  );

  return [callbackRef, isFocused];
}
