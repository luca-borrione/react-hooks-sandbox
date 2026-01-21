import { useSWR } from '../hooks/4-use-swr';

const fetcher = () =>
  new Promise<{ name: string }>((resolve) => {
    window.setTimeout(() => resolve({ name: 'BFE.dev' }), 2000);
  });

export function UseSWRApp() {
  const { data, error } = useSWR('/api', fetcher);
  if (error) {
    return <div>errored</div>;
  }
  if (!data) {
    return <div>loading</div>;
  }
  return <div>{data.name}</div>;
}
