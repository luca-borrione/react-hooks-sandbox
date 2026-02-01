import { act, renderHook } from '@testing-library/react';
import { useDebounce } from '../8-use-debounce';

describe('useDebounce', () => {
  const DEBOUNCED_VALUE = 100;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should apply the debounce time at every given change of the value', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, DEBOUNCED_VALUE), {
      initialProps: { value: 1 },
    });
    expect(result.current).toBe(1);

    act(() => jest.advanceTimersByTime(DEBOUNCED_VALUE - 1));
    expect(result.current).toBe(1);

    rerender({ value: 2 });
    expect(result.current).toBe(1);

    act(() => jest.advanceTimersByTime(DEBOUNCED_VALUE - 1));
    expect(result.current).toBe(1);

    rerender({ value: 3 });
    expect(result.current).toBe(1);

    act(() => jest.advanceTimersByTime(DEBOUNCED_VALUE - 1));
    expect(result.current).toBe(1);

    act(() => jest.advanceTimersByTime(1));
    expect(result.current).toBe(3);
  });

  it('should clear pending updates when unmounted', () => {
    const { result, rerender, unmount } = renderHook(
      ({ value }) => useDebounce(value, DEBOUNCED_VALUE),
      {
        initialProps: { value: 1 },
      },
    );
    expect(result.current).toBe(1);

    act(() => jest.advanceTimersByTime(DEBOUNCED_VALUE - 1));
    expect(result.current).toBe(1);

    rerender({ value: 2 });
    expect(result.current).toBe(1);

    act(() => jest.advanceTimersByTime(DEBOUNCED_VALUE - 1));
    expect(result.current).toBe(1);

    rerender({ value: 3 });
    expect(result.current).toBe(1);

    act(() => jest.advanceTimersByTime(DEBOUNCED_VALUE - 1));
    expect(result.current).toBe(1);

    unmount();
    act(() => jest.advanceTimersByTime(1));
    expect(result.current).toBe(1);
  });
});
