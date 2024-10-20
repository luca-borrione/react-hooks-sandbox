import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/use-debounce';

const list: Array<string> = [];
const throttledList: Array<string> = [];

export function UseDebounce() {
  const [data, setData] = useState('A');
  const throttledData = useDebounce(data, 3);

  useEffect(() => {
    run(['B@1'], setData);
  }, []);

  console.log('>> data', data);
  console.log('>> throttledData', throttledData);
  list.push(data + '@' + Date.now());
  throttledList.push(throttledData + '@' + Date.now());

  console.log('>> list', list);
  console.log('>> throttledList', throttledList);
  return null;
}

async function run(input: string[], setState: (value: string) => void) {
  input.forEach((call) => {
    const [value, time] = call.split('@');
    setTimeout(() => setState(value), parseInt(time, 10));
  });
}
