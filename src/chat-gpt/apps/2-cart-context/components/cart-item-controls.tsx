import { MouseEventHandler } from 'react';
import { CartItem } from '../cart-types';
import { useCart } from '../hooks/use-cart';

export function CartItemControls({ quantity, ...product }: CartItem) {
  const { addItem, clearItem, removeItem } = useCart();

  const handleAddItem: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    addItem(product);
  };

  const handleRemoveItem: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    removeItem(product.id);
  };

  const handleClearItem: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    clearItem(product.id);
  };

  return (
    <>
      {(quantity > 0 && (
        <>
          <button onClick={handleRemoveItem}>-</button>
          <span>{quantity}</span>
          <button onClick={handleAddItem}>+</button>
          <button onClick={handleClearItem}>X</button>
        </>
      )) || <button onClick={handleAddItem}>ADD</button>}
    </>
  );
}
