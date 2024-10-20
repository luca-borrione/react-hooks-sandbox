import { useRef, useCallback } from 'react';

const NUMBERS_IN_PARENTHESIS = 3;
const DASH_NUMBER = 6;
const MAX_NUMBERS_ALLOWED = 10;

function formatNumbers(text: string) {
  const digits = text.replace(/[^\d]+/g, '').substring(0, MAX_NUMBERS_ALLOWED);
  if (digits.length > NUMBERS_IN_PARENTHESIS) {
    const numberInParenthesis = digits.substring(0, NUMBERS_IN_PARENTHESIS);
    if (digits.length > DASH_NUMBER) {
      const firstPart = digits.substring(NUMBERS_IN_PARENTHESIS, DASH_NUMBER);
      const rest = digits.substring(DASH_NUMBER);
      return `(${numberInParenthesis})${firstPart}-${rest}`;
    }
    const rest = digits.substring(NUMBERS_IN_PARENTHESIS);
    return `(${numberInParenthesis})${rest}`;
  }
  return digits;
}

export function PhoneNumberInput() {
  const nodeRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<string>('');

  const handleOnChange = useCallback(() => {
    const target = nodeRef.current as HTMLInputElement;
    const cursorPosition = target.selectionStart || 0;
    let delta = 0;

    if (/^[()\d-]*$/.test(target.value)) {
      const formatted = formatNumbers(target.value);
      delta = Math.max(formatted.length - target.value.length, -1);
      target.value = textRef.current = formatted;
    } else {
      target.value = textRef.current;
      delta = -1;
    }

    target.setSelectionRange(cursorPosition + delta, cursorPosition + delta);
  }, []);

  return <input ref={nodeRef} onChange={handleOnChange} data-testid="phone-number-input" />;
}
