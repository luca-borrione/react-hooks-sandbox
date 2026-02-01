import { renderHook } from '@testing-library/react';
import { useEffectOnce } from '../9-use-effect-once';

describe('useEffectOnce', () => {
  it('should run a given effect only once', () => {
    const mockEffectFn = jest.fn();
    const { rerender } = renderHook(() => useEffectOnce(mockEffectFn));
    expect(mockEffectFn).toHaveBeenCalledTimes(1);
    rerender();
    expect(mockEffectFn).toHaveBeenCalledTimes(1);
  });

  it('should cleanup when unmounting', () => {
    const mockCleanupFn = jest.fn();
    const mockEffectFn = jest.fn().mockReturnValue(mockCleanupFn);
    const { rerender, unmount } = renderHook(() => useEffectOnce(mockEffectFn));
    expect(mockCleanupFn).toHaveBeenCalledTimes(0);

    rerender();
    expect(mockCleanupFn).toHaveBeenCalledTimes(0);

    mockEffectFn.mockClear();
    unmount();
    expect(mockEffectFn).not.toHaveBeenCalled();
    expect(mockCleanupFn).toHaveBeenCalledTimes(1);
  });
});
