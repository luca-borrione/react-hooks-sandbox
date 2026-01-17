import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhoneNumberInput } from '../phone-number-input';

describe('PhoneNumberInput', () => {
  it('should initialise as an empty input', async () => {
    render(<PhoneNumberInput />);
    const $input = screen.getByTestId<HTMLInputElement>('phone-number-input');
    expect($input.value).toBe('');
  });

  it('should automatically add round parenthesis around the first thee digits', async () => {
    const user = userEvent.setup();
    render(<PhoneNumberInput />);
    const $input = screen.getByTestId<HTMLInputElement>('phone-number-input');

    await user.type($input, '123');
    expect($input.value).toBe('123');

    await user.type($input, '4');
    expect($input.value).toBe('(123)4');
  });

  it('should remove the round parenthesis when removing the forth entry', () => {
    render(<PhoneNumberInput />);
    const $input = screen.getByTestId<HTMLInputElement>('phone-number-input');

    // Simulate the user editing the number so the raw digits become "1423"
    // (we drive this through React's change handler rather than manipulating
    // the DOM value directly)
    fireEvent.change($input, { target: { value: '1423' } });

    expect($input.value).toBe('(142)3');
  });

  it('should automatically add a dash before the seventh digits', async () => {
    const user = userEvent.setup();
    render(<PhoneNumberInput />);
    const $input = screen.getByTestId<HTMLInputElement>('phone-number-input');

    await user.type($input, '123456');
    expect($input.value).toBe('(123)456');

    await user.type($input, '7');
    expect($input.value).toBe('(123)456-7');

    await user.type($input, '890');
    expect($input.value).toBe('(123)456-7890');
  });

  it('should remove the dash when removing the seventh digits', () => {
    render(<PhoneNumberInput />);
    const $input = screen.getByTestId<HTMLInputElement>('phone-number-input');

    // Simulate the user editing the number so the raw digits become "1237456"
    fireEvent.change($input, { target: { value: '1237456' } });

    expect($input.value).toBe('(123)745-6');
  });

  it('should filter non-numerical entries', async () => {
    const user = userEvent.setup();
    render(<PhoneNumberInput />);
    const $input = screen.getByTestId<HTMLInputElement>('phone-number-input');

    await user.type($input, '$1./. 23456789!!+--+0.  ');
    expect($input.value).toBe('(123)456-7890');
  });

  it('should accept a maximum of ten entries', async () => {
    const user = userEvent.setup();
    render(<PhoneNumberInput />);
    const $input = screen.getByTestId<HTMLInputElement>('phone-number-input');

    await user.type($input, '123456789012');
    expect($input.value).toBe('(123)456-7890');
  });
});
