import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useToggle } from '../use-toggle';

describe('useToggle', () => {
  it('should be able to toggle', () => {
    const { result } = renderHook(() => useToggle(true));
    let [on, toggle] = result.current;
    expect(on).toBe(true);

    act(() => {
      toggle();
    });

    [on, toggle] = result.current;
    expect(on).toBe(false);

    act(() => {
      toggle();
    });

    [on, toggle] = result.current;
    expect(on).toBe(true);
  });

  it('can accept an initial value of false', () => {
    const { result } = renderHook(() => useToggle(false));
    let [on, toggle] = result.current;
    expect(on).toBe(false);

    act(() => {
      toggle();
    });

    [on, toggle] = result.current;
    expect(on).toBe(true);
  });
});
