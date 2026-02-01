import { act, renderHook } from '@testing-library/react';
import { useToggle } from '../7-use-toggle';

describe('useToggle', () => {
  it('should be able to toggle', () => {
    const { result } = renderHook(() => useToggle(true));
    let [enabled, toggle] = result.current;
    expect(enabled).toBe(true);

    act(() => toggle());
    [enabled, toggle] = result.current;
    expect(enabled).toBe(false);

    act(() => toggle());
    [enabled, toggle] = result.current;
    expect(enabled).toBe(true);
  });

  it('should accept an initial value of false', () => {
    const { result } = renderHook(() => useToggle(false));
    let [enabled, toggle] = result.current;
    expect(enabled).toBe(false);

    act(() => toggle());
    [enabled, toggle] = result.current;
    expect(enabled).toBe(true);

    act(() => toggle());
    [enabled, toggle] = result.current;
    expect(enabled).toBe(false);
  });
});
