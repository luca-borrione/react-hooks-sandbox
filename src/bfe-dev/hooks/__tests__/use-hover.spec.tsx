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

  it('should correctly listen to whether the referenced dom element is hovered or not', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();

    const targetElement = screen.getByLabelText('Username');

    await user.hover(targetElement);
    expect(screen.getByText(HOVERED_TEXT)).toBeInTheDocument();

    await user.unhover(targetElement);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();
  });

  it('should change the target of the hovering listeners according to the ref, if this changes', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();

    const inputElement0 = screen.getByLabelText('Username');
    const inputElement1 = screen.getByLabelText('Password');
    const buttonElement = screen.getByText('toggle');

    await user.hover(inputElement0);
    expect(screen.getByText(HOVERED_TEXT)).toBeInTheDocument();
    await user.unhover(inputElement0);
    await user.hover(inputElement1);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();

    await user.click(buttonElement);

    await user.hover(inputElement0);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();
    await user.unhover(inputElement0);
    await user.hover(inputElement1);
    expect(screen.getByText(HOVERED_TEXT)).toBeInTheDocument();
    await user.unhover(inputElement1);
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();
  });
});
