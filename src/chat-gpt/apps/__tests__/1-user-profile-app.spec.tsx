import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProfile } from '../1-user-profile-app';

describe('UserProfile', () => {
  it('should render the user name', () => {
    render(<UserProfile />);
    expect(screen.getByText(/Hello\s+Luca/i)).toBeInTheDocument();
  });

  it('should show the user name as a placeholder', () => {
    render(<UserProfile />);
    expect(screen.getByPlaceholderText(/Luca/i)).toBeInTheDocument();
  });

  it('should not update the user name, if the input value has not changed', async () => {
    const user = userEvent.setup();
    render(<UserProfile />);
    const button = screen.getByRole('button', { name: 'Update' });
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(screen.getByText(/Hello\s+Luca/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Luca/i)).toBeInTheDocument();
  });

  it('should update the user name, if the input value has changed', async () => {
    const user = userEvent.setup();
    render(<UserProfile />);
    const inputNameField = screen.getByPlaceholderText(/Luca/i);
    await user.type(inputNameField, 'Elizabeth');
    expect(inputNameField).toHaveValue('Elizabeth');
    const button = screen.getByRole('button', { name: 'Update' });
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(screen.getByText(/Hello\s+Elizabeth/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Elizabeth/i)).toBeInTheDocument();
    expect(inputNameField).toHaveValue('');
  });
});
