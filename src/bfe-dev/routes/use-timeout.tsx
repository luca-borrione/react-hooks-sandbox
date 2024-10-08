import { UseTimeout } from "../components/use-timeout";

export function UseTimeoutApp() {
  return (
    <>
      <h1>use timeout app</h1>
      <UseTimeout id="1" delay={1000} />
      <UseTimeout id="2" delay={2000} />
    </>
  );
}
