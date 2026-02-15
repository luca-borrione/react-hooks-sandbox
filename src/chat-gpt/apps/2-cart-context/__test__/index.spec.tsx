import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { CartApp } from '../index';

function getTotalItemsValue() {
  return screen.getByText(/total items:/i).nextElementSibling as HTMLElement;
}

function getTotalPriceValue() {
  return screen.getByText(/total price:/i).nextElementSibling as HTMLElement;
}

function getProductListSection() {
  return screen.getByRole('heading', { name: /product list/i }).closest('section') as HTMLElement;
}

describe('CartApp', () => {
  it('should render an empty cart and the products list initially', () => {
    render(<CartApp />);

    expect(screen.getByRole('heading', { name: /cart summary/i })).toBeInTheDocument();
    expect(getTotalItemsValue()).toHaveTextContent('0');
    expect(getTotalPriceValue()).toHaveTextContent('£0');
    expect(screen.queryByRole('button', { name: /empty cart/i })).not.toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /product list/i })).toBeInTheDocument();
    const productList = within(getProductListSection());
    expect(productList.getByText('Product A')).toBeInTheDocument();
    expect(productList.getByText('Product B')).toBeInTheDocument();
    expect(productList.getByText('Product C')).toBeInTheDocument();
    expect(productList.getAllByRole('button', { name: /add/i })).toHaveLength(3);
  });

  it('adds a product from the product list and updates totals', async () => {
    const user = userEvent.setup();
    render(<CartApp />);

    const [addProductA] = screen.getAllByRole('button', { name: /add/i });
    await user.click(addProductA);
    expect(addProductA).not.toBeInTheDocument();

    expect(getTotalItemsValue()).toHaveTextContent('1');
    expect(getTotalPriceValue()).toHaveTextContent('£10.99');

    expect(screen.getByRole('button', { name: /empty cart/i })).toBeInTheDocument();
  });

  it('should increment and decrement the quantity for a product', async () => {
    const user = userEvent.setup();
    render(<CartApp />);

    const productList = within(getProductListSection());
    const [productAListItem] = productList.getAllByRole('listitem');
    const productARow = within(productAListItem);

    const addButton = productARow.getByRole('button', { name: /add/i });
    await user.click(addButton);
    expect(productARow.queryByRole('button', { name: /add/i })).not.toBeInTheDocument();

    expect(productARow.getByText('1')).toBeInTheDocument();

    const incrementButton = productARow.getByRole('button', { name: '+' });
    await user.click(incrementButton);
    expect(productARow.getByText('2')).toBeInTheDocument();

    const decrementButton = productARow.getByRole('button', { name: '-' });
    await user.click(decrementButton);
    expect(productARow.getByText('1')).toBeInTheDocument();

    // Decrement again: quantity becomes 0 and the row should render only an ADD button
    await user.click(decrementButton);

    expect(productARow.getByRole('button', { name: /add/i })).toBeInTheDocument();
    expect(productARow.queryByRole('button', { name: '-' })).not.toBeInTheDocument();
    expect(productARow.queryByRole('button', { name: '+' })).not.toBeInTheDocument();
  });

  it('empties the cart when clicking the EMPTY CART button', async () => {
    const user = userEvent.setup();
    render(<CartApp />);

    const addButtons = screen.getAllByRole('button', { name: /add/i });
    await user.click(addButtons[0]); // Product A
    await user.click(addButtons[1]); // Product B

    expect(getTotalItemsValue()).toHaveTextContent('2');
    expect(getTotalPriceValue()).toHaveTextContent('£11.56');

    await user.click(screen.getByRole('button', { name: /empty cart/i }));

    expect(getTotalItemsValue()).toHaveTextContent('0');
    expect(getTotalPriceValue()).toHaveTextContent('£0');

    // Back to initial state: 3 ADD buttons, no EMPTY CART button
    expect(screen.getAllByRole('button', { name: /add/i })).toHaveLength(3);
    expect(screen.queryByRole('button', { name: /empty cart/i })).not.toBeInTheDocument();
  });
});
