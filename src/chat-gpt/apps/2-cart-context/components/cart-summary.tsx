import './cart-summary.css';

import { MouseEventHandler } from 'react';
import { useCart } from '../hooks/use-cart';
import { CartItem } from './cart-item';
import { CartItemControls } from './cart-item-controls';

export function CartSummary() {
  const { items, clear, totalPrice, totalItems } = useCart();

  const handleEmptyCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    clear();
  };

  return (
    <section className="cart-summary">
      <header className="cart-summary__header">
        <h3>Cart Summary</h3>
      </header>

      <dl className="cart-summary__stats">
        <div className="cart-summary__stat-row">
          <dt>Total items:</dt>
          <dd>{totalItems}</dd>
        </div>
        <div className="cart-summary__stat-row">
          <dt>Total price:</dt>
          <dd>£{totalPrice / 100}</dd>
        </div>
      </dl>

      {totalItems > 0 && (
        <div className="cart-summary__actions">
          <button onClick={handleEmptyCart}>EMPTY CART</button>
        </div>
      )}

      {items.length > 0 && (
        <ul className="cart-list">
          {items.map((item) => (
            <li key={item.id} className="cart-list__row">
              <CartItem {...item} />
              <CartItemControls {...item} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
