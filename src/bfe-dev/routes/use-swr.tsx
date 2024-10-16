import { useSWR } from "../hooks/use-swr";

interface ReturnData {
  name: string;
}

// const fetcher = () => ({ name: "BFE.dev" });
const fetcher = () =>
  new Promise<ReturnData>((resolve) => {
    window.setTimeout(() => resolve({ name: "BFE.dev" }), 2000);
  });

export function UseSWR() {
  const { data, error } = useSWR("/api", fetcher);
  if (error) return <div>errored</div>;
  if (!data) return <div>loading</div>;
  return <div>{data.name}</div>;
}
