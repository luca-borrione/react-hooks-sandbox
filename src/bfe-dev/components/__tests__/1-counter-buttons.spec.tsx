import { render, screen } from '@testing-library/react';
import { CounterButtons } from '../1-counter-buttons';

describe('CounterButtons', () => {
  it('should render the two buttons and start with the counter set to 0', () => {
    render(<CounterButtons />);
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
    expect(screen.getByText(/clicked/)).toHaveTextContent(`${0}`);
  });
});
