import React, { useState, useEffect } from "react";
import { useTimeout } from "../hooks/use-timeout";

const makeCallback = (id: string) => () => {
  console.log(">> fired callback: ", id);
};

const Timer = ({ id, delay }: { id: string; delay: number }) => {
  console.log(">> TIMER");
  useTimeout(makeCallback(id), delay);
  return null;
};

export function UseTimeout({ id, delay }: { id: string; delay: number }) {
  const [showTimer, setShowTimer] = useState(true);
  useEffect(() => {
    window.setTimeout(() => setShowTimer(false), 3000);
  }, []);
  console.log(">> showTimer", showTimer);
  return showTimer ? <Timer id={id} delay={delay} /> : null;
}
