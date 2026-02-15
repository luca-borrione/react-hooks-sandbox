import type { Product } from '../cart-types';

export function ProductItem({ name, price }: Product) {
  return (
    <div className="product-item">
      <span>{name}</span>
      <span>£{price}</span>
    </div>
  );
}
