import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act, useCallback, useState } from 'react';
import { useFocus } from '../use-focus';

describe('useFocus', () => {
  const HOVERED_TEXT = 'focused';
  const NOT_HOVERED_TEXT = 'not focused';

  function App() {
    const [ref, isFocused] = useFocus<HTMLInputElement>();
    const [refTarget, setRefTarget] = useState(0);
    const handleClick = useCallback(() => {
      setRefTarget((prev) => (prev + 1) % 2);
    }, []);

    return (
      <>
        <p>{isFocused ? HOVERED_TEXT : NOT_HOVERED_TEXT}</p>
        <button onClick={handleClick}></button>
        <input type="text" ref={refTarget === 0 ? ref : null}></input>
        <input type="text" ref={refTarget === 1 ? ref : null}></input>
      </>
    );
  }

  it('should correctly listen to whether the referenced dom element is focused or not', async () => {
    render(<App />);
    const textboxes = screen.getAllByRole('textbox');

    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();

    act(() => {
      textboxes[0].focus();
    });
    expect(screen.getByText(HOVERED_TEXT)).toBeInTheDocument();

    act(() => {
      textboxes[0].blur();
    });
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();
  });

  it('should change the target of the focus listeners according to the ref, if this changes', async () => {
    render(<App />);
    const textboxes = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    act(() => {
      textboxes[1].focus();
    });
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();

    userEvent.click(button);

    act(() => {
      textboxes[1].focus();
    });
    expect(screen.getByText(HOVERED_TEXT)).toBeInTheDocument();

    act(() => {
      textboxes[1].blur();
    });
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();

    act(() => {
      textboxes[0].focus();
    });
    expect(screen.queryByText(HOVERED_TEXT)).not.toBeInTheDocument();
  });
});
