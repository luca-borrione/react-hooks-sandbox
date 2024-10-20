import { renderHook } from '@testing-library/react';
import { usePrevious } from '../use-previous';

describe('usePrevious', () => {
  it('should always start returning undefined', () => {
    const { result } = renderHook(() => usePrevious(1));
    expect(result.current).toBeUndefined();
  });

  it('should retrieve the previous value', () => {
    const { rerender, result } = renderHook(({ value }: { value: number } = { value: 1 }) =>
      usePrevious(value)
    );
    expect(result.current).toBeUndefined();

    rerender({ value: 2 });
    expect(result.current).toBe(1);

    rerender({ value: 3 });
    expect(result.current).toBe(2);
  });
});
