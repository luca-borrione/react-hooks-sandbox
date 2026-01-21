import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/use-debounce';

const list: Array<string> = [];
const throttledList: Array<string> = [];

type StringSetter = (value: string) => void;

async function run(input: string[], setState: StringSetter) {
  input.forEach((call) => {
    const [value, time] = call.split('@');
    setTimeout(() => setState(value), parseInt(time, 10));
  });
}

export function UseDebounce() {
  const [data, setData] = useState('A');
  const throttledData = useDebounce(data, 3);

  useEffect(() => {
    run(['B@1'], setData);
  }, []);

  console.log('>> data', data);
  console.log('>> throttledData', throttledData);

  useEffect(() => {
    list.push(`${data}@${Date.now()}`);
    throttledList.push(`${throttledData}@${Date.now()}`);
    console.log('>> list', list);
    console.log('>> throttledList', throttledList);
  }, [data, throttledData]);

  return null;
}
