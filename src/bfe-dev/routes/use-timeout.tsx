import { useState, useEffect } from "react";
import { useTimeout } from "../hooks/use-timeout";

const makeCallback = (id: string) => () => {
  console.log(">> fired callback: ", id);
};

const Timer = ({ id, delay }: { id: string; delay: number }) => {
  console.log(">> TIMER");
  useTimeout(makeCallback(id), delay);
  return null;
};

function UseTimeout({ id, delay }: { id: string; delay: number }) {
  const [showTimer, setShowTimer] = useState(true);

  useEffect(() => {
    window.setTimeout(() => {
      console.log(">> set showTimer to OFF");
      setShowTimer(false);
    }, 3000);
  }, []);

  console.log(">> showTimer", showTimer);
  return showTimer ? <Timer id={id} delay={delay} /> : null;
}

export function UseTimeoutApp() {
  return (
    <>
      <h1>use timeout app</h1>
      <UseTimeout id="1" delay={1000} />
      <UseTimeout id="2" delay={2000} />
    </>
  );
}
