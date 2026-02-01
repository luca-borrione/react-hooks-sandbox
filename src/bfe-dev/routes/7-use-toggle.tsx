import { useToggle } from '../hooks/7-use-toggle';

export function UseToggle() {
  const [enabled, toggle] = useToggle(true);
  return <button onClick={toggle}>{enabled ? 'ON' : 'OFF'}</button>;
}
