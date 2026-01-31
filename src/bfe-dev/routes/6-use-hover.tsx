import { useState } from 'react';
import { useHover } from '../hooks/6-use-hover';

export function UseHover() {
  const [ref, isHovered] = useHover<HTMLHeadingElement>();
  const [currentTarget, setCurrentTarget] = useState(1);
  const handleClick = () => setCurrentTarget(currentTarget === 1 ? 2 : 1);

  return (
    <>
      <p>
        current target: {currentTarget} {isHovered ? 'hovered' : 'not hovered'}
      </p>
      <h1 ref={currentTarget === 1 ? ref : null}>TARGET 1</h1>
      <h1 ref={currentTarget === 2 ? ref : null}>TARGET 2</h1>
      <button onClick={handleClick}>CHANGE TARGET</button>
    </>
  );
}
