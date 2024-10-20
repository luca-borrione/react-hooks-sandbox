import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useDebounce } from '../use-debounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should be able to debounce', () => {
    const { result, rerender } = renderHook(({ value }: { value: string } = { value: 'A' }) =>
      useDebounce(value, 100)
    );
    expect(result.current).toBe('A');
    act(() => {
      jest.advanceTimersByTime(99);
    });
    rerender({ value: 'B' });
    act(() => {
      jest.advanceTimersByTime(99);
    });
    rerender({ value: 'C' });
    act(() => {
      jest.advanceTimersByTime(99);
    });
    rerender({ value: 'D' });
    act(() => {
      jest.advanceTimersByTime(99);
    });
    expect(result.current).toBe('A');
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe('D');

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe('D');
  });

  it('should clear the debounce every time is is unmounted', () => {
    const { result, rerender, unmount } = renderHook(
      ({ value }: { value: string } = { value: 'A' }) => useDebounce(value, 100)
    );
    expect(result.current).toBe('A');
    rerender({ value: 'B' });
    rerender({ value: 'C' });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    rerender({ value: 'D' });
    act(() => {
      jest.advanceTimersByTime(99);
    });
    unmount();
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe('C');
  });
});
