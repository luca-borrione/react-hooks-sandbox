import { useEffect, useState } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import { useHover } from '../6-use-hover';

describe('useHover', () => {
  const HOVERED_TEXT = 'hovered';
  const NOT_HOVERED_TEXT = 'not hovered';

  it('should correctly listen to whether the referenced dom element is hovered', async () => {
    const user = userEvent.setup();

    function App() {
      const [ref, isHovered] = useHover<HTMLHeadingElement>();

      return (
        <>
          <p>{isHovered ? HOVERED_TEXT : NOT_HOVERED_TEXT}</p>
          <h1 ref={ref}>TARGET</h1>
        </>
      );
    }

    render(<App />);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();
    expect(screen.queryByText(NOT_HOVERED_TEXT)).toBeInTheDocument();

    const target = screen.getByText('TARGET');
    await user.hover(target);
    expect(screen.queryByText(HOVERED_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(NOT_HOVERED_TEXT)).not.toBeInTheDocument();

    await user.unhover(target);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();
    expect(screen.queryByText(NOT_HOVERED_TEXT)).toBeInTheDocument();
  });

  it('should detach the event listeners, if the ref changes', async () => {
    const user = userEvent.setup();

    function App() {
      const [ref, isHovered] = useHover<HTMLHeadingElement>();
      const [currentTarget, setCurrentTarget] = useState(1);
      const handleClick = () => setCurrentTarget(currentTarget === 1 ? 2 : 1);

      return (
        <>
          <p>{isHovered ? HOVERED_TEXT : NOT_HOVERED_TEXT}</p>
          <h1 ref={currentTarget === 1 ? ref : null}>TARGET 1</h1>
          <h1 ref={currentTarget === 2 ? ref : null}>TARGET 2</h1>
          <button onClick={handleClick}>CHANGE TARGET</button>
        </>
      );
    }

    render(<App />);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();
    expect(screen.queryByText(NOT_HOVERED_TEXT)).toBeInTheDocument();

    const target1 = screen.getByText('TARGET 1');
    const target2 = screen.getByText('TARGET 2');
    const toggle = screen.getByRole('button');

    await user.hover(target2);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();

    await user.click(toggle);
    await user.hover(target2);
    expect(screen.queryByText(HOVERED_TEXT)).toBeInTheDocument();

    await user.unhover(target2);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();

    await user.hover(target1);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();
  });

  it('should work on deferred ref', async () => {
    jest.useFakeTimers();

    const user = userEvent.setup({
      advanceTimers: jest.advanceTimersByTime,
    });

    function App() {
      const [ref, isHovered] = useHover<HTMLHeadingElement>();
      const [isReady, setIsReady] = useState(false);

      useEffect(() => {
        window.setTimeout(() => setIsReady(true), 500);
      }, []);

      return (
        <>
          <p>{isHovered ? HOVERED_TEXT : NOT_HOVERED_TEXT}</p>
          <h1 ref={isReady ? ref : null}>TARGET</h1>
        </>
      );
    }

    render(<App />);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();
    expect(screen.queryByText(NOT_HOVERED_TEXT)).toBeInTheDocument();

    const target = screen.getByText('TARGET');
    await user.hover(target);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    await user.unhover(target);
    await user.hover(target);
    expect(screen.queryByText(HOVERED_TEXT)).toBeInTheDocument();
  });
});
