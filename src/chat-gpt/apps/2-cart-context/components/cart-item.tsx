import type { CartItem as TCartItem } from '../cart-types';

export function CartItem({ name, price }: TCartItem) {
  return (
    <div className="cart-item">
      <span>{name}</span>
      <span>{price}</span>
    </div>
  );
}
