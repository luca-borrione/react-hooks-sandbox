import { renderHook, waitFor } from '@testing-library/react';
import { useSWR } from '../4-use-swr';

describe('useSWR', () => {
  it('should return undefined data, when the promise is still pending', () => {
    const fetcher = () => new Promise(() => {});
    let renderCount = 0;
    const { result } = renderHook(() => {
      renderCount++;
      return useSWR('/api', fetcher);
    });
    expect(result.current).toStrictEqual({ data: undefined, error: undefined });
    expect(renderCount).toBe(1);
  });

  it('should not call fetcher again, when rerendering, if fethcer is the same', () => {
    const fetcher = jest.fn(() => new Promise(() => {}));
    expect(fetcher).toHaveBeenCalledTimes(0);

    let renderCount = 0;
    const { rerender } = renderHook(() => {
      renderCount++;
      return useSWR('/api', fetcher);
    });
    expect(fetcher).toHaveBeenCalledTimes(1);

    rerender();
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(renderCount).toBe(2);
  });

  it('should return the expected data, when the promise resolves', async () => {
    let resolvePromise: ((value: unknown) => void) | undefined;
    const fetcher = () =>
      new Promise<unknown>((resolve) => {
        resolvePromise = resolve;
      });

    let renderCount = 0;
    const { result } = renderHook(() => {
      renderCount++;
      return useSWR('/api', fetcher);
    });

    await waitFor(() => expect(resolvePromise).toBeDefined());

    // @ts-expect-error: Cannot invoke an object which is possibly 'undefined'. ts(2722)
    resolvePromise('data');

    await waitFor(() => expect(result.current).toStrictEqual({ data: 'data', error: undefined }));
    expect(renderCount).toBe(2);
  });

  it('should return the expected error, when the promise rejects', async () => {
    let rejectPromise: ((reason?: unknown) => void) | undefined;
    const fetcher = () =>
      new Promise<unknown>((_, reject) => {
        rejectPromise = reject;
      });

    let renderCount = 0;
    const { result } = renderHook(() => {
      renderCount++;
      return useSWR('/api', fetcher);
    });

    await waitFor(() => expect(rejectPromise).toBeDefined());

    // @ts-expect-error: Cannot invoke an object which is possibly 'undefined'. ts(2722)
    rejectPromise('error');

    await waitFor(() => expect(result.current).toStrictEqual({ data: undefined, error: 'error' }));
    expect(renderCount).toBe(2);
  });

  it('should return the expected data, when the fetcher is not a promise', () => {
    const fetcher = () => 'data';
    let renderCount = 0;
    const { result } = renderHook(() => {
      renderCount++;
      return useSWR('/api', fetcher);
    });
    expect(result.current).toStrictEqual({ data: 'data', error: undefined });
    expect(renderCount).toBe(1);
  });

  it('should return the expected error, when the fetcher is not a promise and throws', () => {
    const error = new Error('error');
    const fetcher = () => {
      throw error;
    };
    let renderCount = 0;
    const { result } = renderHook(() => {
      renderCount++;
      return useSWR('/api', fetcher);
    });
    expect(result.current).toStrictEqual({ data: undefined, error });
    expect(renderCount).toBe(1);
  });

  it('should use the latest async fetcher, when the fetcher changes', async () => {
    let resolvePromise1: ((value: unknown) => void) | undefined;
    const fetcher1 = () =>
      new Promise<unknown>((resolve) => {
        resolvePromise1 = resolve;
      });

    let renderCount = 0;
    const { result, rerender } = renderHook(
      ({ fetcher }) => {
        renderCount++;
        return useSWR('/api', fetcher);
      },
      {
        initialProps: { fetcher: fetcher1 },
      },
    );

    await waitFor(() => expect(resolvePromise1).toBeDefined());

    let resolvePromise2: ((value: unknown) => void) | undefined;
    const fetcher2 = () =>
      new Promise<unknown>((resolve) => {
        resolvePromise2 = resolve;
      });

    rerender({ fetcher: fetcher2 });

    await waitFor(() => expect(resolvePromise2).toBeDefined());

    // @ts-expect-error: Cannot invoke an object which is possibly 'undefined'. ts(2722)
    resolvePromise1('data1');
    // @ts-expect-error: Cannot invoke an object which is possibly 'undefined'. ts(2722)
    resolvePromise2('data2');

    await waitFor(() => expect(result.current).toStrictEqual({ data: 'data2', error: undefined }));
    expect(renderCount).toBe(3);
  });

  it('should update synchronously, when the fetcher changes to a new sync fetcher', async () => {
    let resolvePromise: ((value: string) => void) | undefined;
    const asyncFetcher = () =>
      new Promise<string>((resolve) => {
        resolvePromise = resolve;
      });

    let renderCount = 0;
    const { result, rerender } = renderHook(
      ({ fetcher }: { fetcher: () => string | Promise<string> } = { fetcher: asyncFetcher }) => {
        renderCount++;
        return useSWR('/api', fetcher);
      },
    );

    await waitFor(() => expect(resolvePromise).toBeDefined());

    const syncFetcher = () => 'syncData';

    rerender({ fetcher: syncFetcher });
    expect(result.current).toStrictEqual({ data: 'syncData', error: undefined });

    // @ts-expect-error: Cannot invoke an object which is possibly 'undefined'. ts(2722)
    resolvePromise('asyncData');

    // Assert that the async resolution does NOT overwrite the sync value
    await waitFor(() =>
      expect(result.current).toStrictEqual({ data: 'syncData', error: undefined }),
    );

    expect(renderCount).toBe(2);
  });
});
