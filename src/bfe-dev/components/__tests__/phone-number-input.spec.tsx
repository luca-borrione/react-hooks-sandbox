import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhoneNumberInput } from '../phone-number-input';

describe('PhoneNumberInput', () => {
  it('should initialise as an empty input', async () => {
    render(<PhoneNumberInput />);
    const $input = screen.getByTestId<HTMLInputElement>('phone-number-input');
    expect($input.value).toBe('');
  });

  it('should automatically add round parenthesis around the first thee digits', async () => {
    render(<PhoneNumberInput />);
    const $input = screen.getByTestId<HTMLInputElement>('phone-number-input');

    userEvent.type($input, '123');
    expect($input.value).toBe('123');

    userEvent.type($input, '4');
    expect($input.value).toBe('(123)4');
  });

  it('should remove the round parenthesis when removing the forth entry', async () => {
    render(<PhoneNumberInput />);
    const $input = screen.getByTestId<HTMLInputElement>('phone-number-input');

    userEvent.type($input, '123');
    expect($input.value).toBe('123');

    userEvent.type($input, '4');
    expect($input.value).toBe('(123)4');

    userEvent.keyboard('{Backspace}');
    expect($input.value).toBe('123');

    expect($input.selectionEnd).toBe(3);
    $input.selectionEnd = 1;

    userEvent.type($input, '4');
    expect($input.value).toBe('(142)3');

    expect($input.selectionEnd).toBe(4);
    $input.selectionEnd = 2;

    userEvent.keyboard('{Backspace}');
    expect($input.value).toBe('423');
  });

  it('should automatically add a dash before the seventh digits', async () => {
    render(<PhoneNumberInput />);
    const $input = screen.getByTestId<HTMLInputElement>('phone-number-input');

    userEvent.type($input, '123456');
    expect($input.value).toBe('(123)456');

    userEvent.type($input, '7');
    expect($input.value).toBe('(123)456-7');

    userEvent.type($input, '890');
    expect($input.value).toBe('(123)456-7890');
  });

  it('should remove the dash when removing the seventh digits', async () => {
    render(<PhoneNumberInput />);
    const $input = screen.getByTestId<HTMLInputElement>('phone-number-input');

    userEvent.type($input, '123456');
    expect($input.value).toBe('(123)456');

    userEvent.type($input, '7');
    expect($input.value).toBe('(123)456-7');

    userEvent.keyboard('{Backspace}');
    expect($input.value).toBe('(123)456');

    expect($input.selectionEnd).toBe(8);
    $input.selectionEnd = 5;

    userEvent.type($input, '7');
    expect($input.value).toBe('(123)745-6');

    expect($input.selectionEnd).toBe(7);
    $input.selectionEnd = 4;

    userEvent.keyboard('{Backspace}');
    expect($input.value).toBe('(127)456');
  });

  it('should filter non-numerical entries', () => {
    render(<PhoneNumberInput />);
    const $input = screen.getByTestId<HTMLInputElement>('phone-number-input');

    userEvent.type($input, '$1./. 23456789!!+--+0.  ');
    expect($input.value).toBe('(123)456-7890');
  });

  it('should accept a maximum of ten entries', () => {
    render(<PhoneNumberInput />);
    const $input = screen.getByTestId<HTMLInputElement>('phone-number-input');

    userEvent.type($input, '123456789012');
    expect($input.value).toBe('(123)456-7890');
  });
});
