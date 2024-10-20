import { useCallback, useState } from 'react';
import { useEffectOnce } from '../hooks/use-effect-once';

export function UseEffectOnce() {
  const [times, setTimes] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  const triggerNextRender = useCallback(() => {
    setRenderCount(renderCount + 1);
  }, [renderCount]);

  window.setTimeout(triggerNextRender, 1000);

  useEffectOnce(() => {
    setTimes(times + 1);
  });

  return (
    <>
      <p>TIMES: {times}</p>
      <p>RENDERS: {renderCount}</p>
    </>
  );
}
