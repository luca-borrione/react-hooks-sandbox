import { renderHook } from '@testing-library/react';
import { useEffectOnce } from '../use-effect-once';

describe('useEffectOnce', () => {
  it('should run an effect only once', () => {
    const mockEffectFn = jest.fn();
    const { rerender } = renderHook(() => useEffectOnce(mockEffectFn));
    expect(mockEffectFn).toHaveBeenCalledTimes(1);
    rerender();
    expect(mockEffectFn).toHaveBeenCalledTimes(1);
  });

  it('should correctly cleanup', () => {
    const mockCleanupFn = jest.fn();
    const { rerender, unmount } = renderHook(() => useEffectOnce(() => mockCleanupFn));
    expect(mockCleanupFn).toHaveBeenCalledTimes(0);
    rerender();
    expect(mockCleanupFn).toHaveBeenCalledTimes(0);
    unmount();
    expect(mockCleanupFn).toHaveBeenCalledTimes(1);
  });
});
