import { renderHook } from '@testing-library/react';
import { usePrevious } from '../use-previous';

describe('usePrevious', () => {
  it('', () => {
    const { result } = renderHook(() => usePrevious(1));
    expect(result.current).toBeUndefined();
  });
});
