import { useMemo } from 'react';

export function useProductsList() {
  return useMemo(
    () => [
      { id: 'prod-a', name: 'Product A', price: 10.99 },
      { id: 'prod-b', name: 'Product B', price: 0.57 },
      { id: 'prod-c', name: 'Product C', price: 14.25 },
    ],
    [],
  );
}
