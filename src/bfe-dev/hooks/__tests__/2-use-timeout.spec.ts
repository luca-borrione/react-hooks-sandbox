import { renderHook } from '@testing-library/react';
import { useTimeout } from '../2-use-timeout';

describe('useTimeout', () => {
  let elapsed = 0;

  function advanceTimersTo(targetMs: number) {
    const delta = targetMs - elapsed;
    if (delta > 0) {
      jest.advanceTimersByTime(delta);
      elapsed = targetMs;
    }
  }

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(window, 'setTimeout');
    jest.spyOn(window, 'clearTimeout');
    elapsed = 0;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should trigger the callback after the given delay', () => {
    const callbackSpy = jest.fn();
    const delay = 1000;
    renderHook(() => useTimeout(callbackSpy, delay));
    expect(callbackSpy).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(delay);
    expect(callbackSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear the timeout when unmounting', () => {
    const callbackSpy = jest.fn();
    const delay = 1000;
    expect(window.setTimeout).toHaveBeenCalledTimes(0);

    const { unmount } = renderHook(() => useTimeout(callbackSpy, delay));
    expect(window.setTimeout).toHaveBeenCalledTimes(1);
    expect(window.clearTimeout).toHaveBeenCalledTimes(0);

    unmount();
    expect(window.setTimeout).toHaveBeenCalledTimes(1);
    expect(window.clearTimeout).toHaveBeenCalledTimes(1);
  });

  it('should reset the timeout, when the delay changes', () => {
    const callbackSpy = jest.fn();
    expect(window.setTimeout).toHaveBeenCalledTimes(0);

    const { rerender } = renderHook(
      ({ delay }: { delay: number }) => useTimeout(callbackSpy, delay),
      { initialProps: { delay: 5000 } }
    );
    expect(window.setTimeout).toHaveBeenCalledTimes(1);
    expect(window.clearTimeout).toHaveBeenCalledTimes(0);
    expect(callbackSpy).toHaveBeenCalledTimes(0);

    advanceTimersTo(4500);
    expect(callbackSpy).toHaveBeenCalledTimes(0);

    rerender({ delay: 1000 });
    expect(window.setTimeout).toHaveBeenCalledTimes(2);
    expect(window.clearTimeout).toHaveBeenCalledTimes(1);
    expect(callbackSpy).toHaveBeenCalledTimes(0);

    advanceTimersTo(5000);
    expect(callbackSpy).toHaveBeenCalledTimes(0);

    advanceTimersTo(5500);
    expect(callbackSpy).toHaveBeenCalledTimes(1);
  });

  it('should NOT reset the timeout, when the callback changes', () => {
    const callbackSpy1 = jest.fn();
    const callbackSpy2 = jest.fn();
    const delay = 1000;

    expect(window.setTimeout).toHaveBeenCalledTimes(0);

    const { rerender } = renderHook(
      ({ callback }: { callback: jest.Mock }) => useTimeout(callback, delay),
      { initialProps: { callback: callbackSpy1 } }
    );
    expect(window.setTimeout).toHaveBeenCalledTimes(1);
    expect(window.clearTimeout).toHaveBeenCalledTimes(0);
    expect(callbackSpy1).toHaveBeenCalledTimes(0);
    expect(callbackSpy2).toHaveBeenCalledTimes(0);

    advanceTimersTo(500);
    expect(callbackSpy1).toHaveBeenCalledTimes(0);
    expect(callbackSpy2).toHaveBeenCalledTimes(0);

    rerender({ callback: callbackSpy2 });
    expect(window.clearTimeout).toHaveBeenCalledTimes(0);
    expect(callbackSpy1).toHaveBeenCalledTimes(0);
    expect(callbackSpy2).toHaveBeenCalledTimes(0);

    advanceTimersTo(1000);
    expect(callbackSpy1).toHaveBeenCalledTimes(0);
    expect(callbackSpy2).toHaveBeenCalledTimes(1);
  });
});
