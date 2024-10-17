import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import { useSWR } from '../use-swr';

interface ReturnData {
  name: string;
}

interface Error {
  message: string;
}

describe('useSWR', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return undefined data, when the promise is still pending', () => {
    const fetcher = () => new Promise<ReturnData>(() => {});
    const { result, rerender } = renderHook(() => useSWR<ReturnData, Error>('key', fetcher));
    rerender();
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
  });

  it('should return the expected data, when the promise resolves', async () => {
    const returnData: ReturnData = { name: 'BFE.dev' };
    const fetcher = () =>
      new Promise<ReturnData>((resolve) => {
        window.setTimeout(() => resolve(returnData), 2000);
      });

    const { result } = renderHook(() => useSWR<ReturnData, Error>('key', fetcher));
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      jest.advanceTimersToNextTimer();
      await waitFor(() => result.current.data);
    });

    expect(result.current.data).toStrictEqual(returnData);
    expect(result.current.error).toBeUndefined();
  });

  it('should return the expected error, when the promise resolves', async () => {
    const error: Error = { message: 'BFE.dev' };
    const fetcher = () =>
      new Promise<ReturnData>((resolve, reject) => {
        window.setTimeout(() => reject(error), 2000);
      });

    const { result } = renderHook(() => useSWR<ReturnData, Error>('key', fetcher));

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      jest.advanceTimersToNextTimer();
      await waitFor(() => result.current.error);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toStrictEqual(error);
  });

  it('should return the expected data, when the fetcher is not a promise', async () => {
    const returnData: ReturnData = { name: 'BFE.dev' };
    const fetcher = () => {
      return returnData;
    };

    const { result } = renderHook(() => useSWR<ReturnData, Error>('key', fetcher));

    await waitFor(() => result.current.data);

    expect(result.current.data).toStrictEqual(returnData);
    expect(result.current.error).toBeUndefined();
  });
});
