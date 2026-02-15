import { CartProvider } from './components/cart-provider';
import { CartSummary } from './components/cart-summary';
import { ProductList } from './components/product-list';

export function CartApp() {
  return (
    <>
      <h1>The Cart App</h1>
      <CartProvider>
        <CartSummary />
        <ProductList />
      </CartProvider>
    </>
  );
}
