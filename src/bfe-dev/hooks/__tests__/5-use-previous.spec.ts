import { renderHook } from '@testing-library/react';
import { usePrevious } from '../5-use-previous';

describe('usePrevious', () => {
  it('should always start returning undefined', () => {
    const { result } = renderHook(() => usePrevious(1));
    expect(result.current).toBeUndefined();
  });

  it('should return previous values', () => {
    const initialValue = 1;
    const previousValues: (number | undefined)[] = [];

    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: initialValue },
    });
    previousValues.push(result.current);

    for (let value = initialValue + 1; value <= 4; value++) {
      rerender({ value });
      previousValues.push(result.current);
    }

    expect(previousValues).toStrictEqual([undefined, 1, 2, 3]);
  });
});
