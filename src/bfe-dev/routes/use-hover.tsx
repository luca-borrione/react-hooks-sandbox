import { useState } from 'react';
import { useHover } from '../hooks/use-hover';

export function UseHover() {
  const [ref, isHovered] = useHover<HTMLDivElement>();
  const [refTarget, setRefTarget] = useState<number>(0);
  console.log('>> refTarget', refTarget);

  return (
    <div>
      <p>{isHovered ? 'hovered' : 'not hovered'}</p>
      <button
        data-testid="change-ref-target-button"
        onClick={() => {
          setRefTarget((target) => (target + 1) % 2);
        }}
      >
        toggle ref target
      </button>
      <div id="id-0" ref={refTarget === 0 ? ref : null} data-testid="hover-target0">
        target 0
      </div>
      <div id="id-1" ref={refTarget === 1 ? ref : null} data-testid="hover-target1">
        target 1
      </div>
    </div>
  );
}
