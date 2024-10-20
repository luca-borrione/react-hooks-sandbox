import { render, screen } from '@testing-library/react';

import { useHover } from '../use-hover';
import userEvent from '@testing-library/user-event';
import { useCallback, useState } from 'react';

describe('useHover', () => {
  const HOVERED_TEXT = 'hovered';
  const NOT_HOVERED_TEXT = 'not hovered';

  function App() {
    let i = 0;
    const [ref, isHovered] = useHover<HTMLInputElement>();
    const [refTarget, setRefTarget] = useState(i % 2);

    const handleClick = useCallback(() => {
      setRefTarget(++i % 2);
    }, [i, setRefTarget]);

    return (
      <>
        <p>{isHovered ? HOVERED_TEXT : NOT_HOVERED_TEXT}</p>
        <label htmlFor="username-input">Username</label>
        <input ref={refTarget === 0 ? ref : null} id="username-input" />
        <label htmlFor="password-input">Password</label>
        <input ref={refTarget === 1 ? ref : null} id="password-input" />
        <button onClick={handleClick}>toggle</button>
      </>
    );
  }

  it('should correctly listen to whether the referenced dom element is hovered or not', () => {
    render(<App />);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();

    const targetElement = screen.getByLabelText('Username');

    userEvent.hover(targetElement);
    expect(screen.getByText(HOVERED_TEXT)).toBeInTheDocument();

    userEvent.unhover(targetElement);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();
  });

  it('should change the target of the hovering listeners according to the ref, if this changes', () => {
    render(<App />);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();

    const inputElement0 = screen.getByLabelText('Username');
    const inputElement1 = screen.getByLabelText('Password');
    const buttonElement = screen.getByText('toggle');

    userEvent.hover(inputElement0);
    expect(screen.getByText(HOVERED_TEXT)).toBeInTheDocument();
    userEvent.unhover(inputElement0);
    userEvent.hover(inputElement1);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();

    userEvent.click(buttonElement);

    userEvent.hover(inputElement0);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();
    userEvent.unhover(inputElement0);
    userEvent.hover(inputElement1);
    expect(screen.getByText(HOVERED_TEXT)).toBeInTheDocument();
    userEvent.unhover(inputElement1);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();
  });
});
