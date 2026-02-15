import { ReactNode, useCallback, useMemo, useState } from 'react';
import { CartItem, Product } from '../cart-types';
import { CartContext } from '../context/cart-context';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback(
    (product: Product) =>
      setItems((prevItems) => {
        const index = prevItems.findIndex((item) => item.id === product.id);
        if (index === -1) {
          return [...prevItems, { ...product, quantity: 1 }];
        }
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }),
    [],
  );

  const removeItem = useCallback(
    (productId: string) =>
      setItems((prevItems) => {
        const index = prevItems.findIndex((item) => item.id === productId);
        if (index === -1) {
          return prevItems;
        }
        const nextQuantity = prevItems[index].quantity - 1;
        if (nextQuantity === 0) {
          return prevItems.filter((item) => item.id !== productId);
        }
        return prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        );
      }),
    [],
  );

  const clearItem = useCallback(
    (productId: string) =>
      setItems((prevItems) => prevItems.filter((item) => item.id !== productId)),
    [],
  );

  const clear = useCallback(() => setItems([]), []);

  const { totalPrice, totalItems } = useMemo(
    () =>
      items.reduce(
        (acc, item) => ({
          totalPrice: (acc.totalPrice / 100 + item.quantity * item.price) * 100,
          totalItems: acc.totalItems + item.quantity,
        }),
        {
          totalPrice: 0,
          totalItems: 0,
        },
      ),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      clearItem,
      removeItem,
      clear,
      totalPrice,
      totalItems,
    }),
    [items, addItem, clearItem, removeItem, clear, totalPrice, totalItems],
  );

  return <CartContext value={value}>{children}</CartContext>;
}
