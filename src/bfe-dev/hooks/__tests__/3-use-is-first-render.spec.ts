import { renderHook } from '@testing-library/react';
import { useIsFirstRender } from '../3-use-is-first-render';

describe('useIsFirstRender', () => {
  it('should return true, only when first rendered', () => {
    const { result, rerender } = renderHook(() => useIsFirstRender());
    expect(result.current).toBe(true);
    rerender();
    expect(result.current).toBe(false);
  });
});
