import { useFocus } from '../hooks/use-focus';

export function UseFocus() {
  const [ref, isFocused] = useFocus<HTMLInputElement>();

  return (
    <form>
      <p>{isFocused ? 'Focused' : 'Not Focused'}</p>
      <input ref={ref} type="text" placeholder="focus on me"></input>
    </form>
  );
}
