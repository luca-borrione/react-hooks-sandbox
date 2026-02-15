import './product-list.css';

import { useMemo } from 'react';
import { useCart } from '../hooks/use-cart';
import { useProductsList } from '../hooks/use-products-list';
import { ProductItem } from './product-item';
import { CartItemControls } from './cart-item-controls';

export function ProductList() {
  const { items } = useCart();
  const products = useProductsList();

  const cartQuantityLookup = useMemo(
    () =>
      items.reduce(
        (acc, item) => {
          acc[item.id] = item.quantity;
          return acc;
        },
        {} as Record<string, number>,
      ),
    [items],
  );

  return (
    <section className="product-list">
      <header className="product-list__header">
        <h3>Product List</h3>
      </header>

      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-list__row">
            <ProductItem {...product}></ProductItem>
            <CartItemControls {...product} quantity={cartQuantityLookup[product.id]} />
          </li>
        ))}
      </ul>
    </section>
  );
}
