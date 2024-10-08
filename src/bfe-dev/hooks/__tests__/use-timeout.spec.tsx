import { renderHook } from "@testing-library/react";
import { useTimeout } from "../use-timeout";

describe("useTimeout", () => {
  const delay = 1000;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("callback should be triggered after the delay", () => {
    const callbackSpy = jest.fn();
    renderHook(() => {
      useTimeout(callbackSpy, delay);
    });

    expect(callbackSpy).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(delay);
    expect(callbackSpy).toHaveBeenCalledTimes(1);
  });

  it("should clear the timeout, when unmounted", () => {
    const callbackSpy = jest.fn();
    const setTimeoutSpy = jest.spyOn(window, "setTimeout");
    const clearTimeoutSpy = jest.spyOn(window, "clearTimeout");

    const { unmount } = renderHook(() => {
      useTimeout(callbackSpy, 2000);
    });

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(0);
    unmount();
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
  });

  it("should reset the timeout, when delay changes", () => {
    const callbackSpy = jest.fn();
    const { rerender } = renderHook(({ d }: { d: number } = { d: 2000 }) => {
      useTimeout(callbackSpy, d);
    });

    expect(callbackSpy).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(500);
    expect(callbackSpy).toHaveBeenCalledTimes(0);

    rerender({ d: 1000 });

    expect(callbackSpy).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(1000);
    expect(callbackSpy).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(2000);
    expect(callbackSpy).toHaveBeenCalledTimes(1);
  });

  it("should NOT reset the timeout, when callback changes", () => {
    const callbackSpy1 = jest.fn();
    const callbackSpy2 = jest.fn();
    const { rerender } = renderHook(
      ({ callback }: { callback: jest.Mock } = { callback: callbackSpy1 }) => {
        useTimeout(callback, 1000);
      }
    );

    expect(callbackSpy1).toHaveBeenCalledTimes(0);
    expect(callbackSpy2).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(500);

    expect(callbackSpy1).toHaveBeenCalledTimes(0);
    expect(callbackSpy2).toHaveBeenCalledTimes(0);

    rerender({ callback: callbackSpy2 });

    expect(callbackSpy1).toHaveBeenCalledTimes(0);
    expect(callbackSpy2).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(500);

    expect(callbackSpy1).toHaveBeenCalledTimes(0);
    expect(callbackSpy2).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(2000);

    expect(callbackSpy1).toHaveBeenCalledTimes(0);
    expect(callbackSpy2).toHaveBeenCalledTimes(1);
  });
});
