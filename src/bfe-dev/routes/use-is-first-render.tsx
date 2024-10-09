import { useState, useEffect } from "react";
import { useIsFirstRender } from "../hooks/use-is-first-render";

export function UseIsFirstRenderApp() {
  const [showTimer, setShowTimer] = useState(true);

  useEffect(() => {
    window.setTimeout(() => {
      console.log(">> set showTimer to OFF");
      setShowTimer(false);
    }, 3000);
  }, []);

  console.log(">> new render showTimer", showTimer);
  const isFirstRender = useIsFirstRender();
  console.log(">> isFirstRender", isFirstRender);

  return (
    <>
      <h1>use is first render app 1</h1>
    </>
  );
}
