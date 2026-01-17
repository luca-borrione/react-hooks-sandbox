import { render, screen } from '@testing-library/react';
import { CounterButtons } from '../1-counter-buttons';
import userEvent from '@testing-library/user-event';

describe('CounterButtons', () => {
  it('should render the two buttons and start with the counter set to 0', () => {
    render(<CounterButtons />);
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
    expect(screen.getByText(/^clicked: 0$/)).toBeInTheDocument();
  });

  it('should be able to increment anddecrement the counter', async () => {
    const user = userEvent.setup();
    render(<CounterButtons />);
    expect(screen.getByText(/^clicked: 0$/)).toBeInTheDocument();

    const decrementButton = screen.getByRole('button', { name: '-' });
    const incrementButton = screen.getByRole('button', { name: '+' });

    await user.click(incrementButton);
    expect(screen.getByText(/^clicked: 1$/)).toBeInTheDocument();
    await user.click(incrementButton);
    expect(screen.getByText(/^clicked: 2$/)).toBeInTheDocument();

    await user.click(decrementButton);
    expect(screen.getByText(/^clicked: 1$/)).toBeInTheDocument();
    await user.click(decrementButton);
    expect(screen.getByText(/^clicked: 0$/)).toBeInTheDocument();
  });
});
