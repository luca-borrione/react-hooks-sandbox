import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CounterButtons } from '../counter-buttons';

describe('CounterButtons', () => {
  it('should render two button and start with the counter set to 0', () => {
    render(<CounterButtons />);
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText(/clicked/)).toHaveTextContent(`${0}`);
  });

  it('should be able to increment and decrement', async () => {
    const user = userEvent.setup();
    render(<CounterButtons />);

    const buttonPlus = screen.getByText('+');
    const buttonMinus = screen.getByText('-');

    for (let i = 1; i <= 3; i++) {
      await user.click(buttonPlus);
      expect(screen.getByText(/clicked/)).toHaveTextContent(`${i}`);
    }

    for (let i = 2; i >= -1; i--) {
      await user.click(buttonMinus);
      expect(screen.getByText(/clicked/)).toHaveTextContent(`${i}`);
    }
  });
});
