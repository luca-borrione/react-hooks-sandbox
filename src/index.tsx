import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactCounterApp } from './bfe-dev/routes/react-counter-app';
import { UseTimeoutApp } from './bfe-dev/routes/use-timeout';
import { UseIsFirstRenderApp } from './bfe-dev/routes/use-is-first-render';
import { UseSWR } from './bfe-dev/routes/use-swr';
import { UsePrevious } from './bfe-dev/routes/use-previous';
import { UseHover } from './bfe-dev/routes/use-hover';
import { UseToggle } from './bfe-dev/routes/use-toggle';
import { UseDebounce } from './bfe-dev/routes/use-debounce';
import { UseEffectOnce } from './bfe-dev/routes/use-effect-once';
import { PhoneNumberInput } from './bfe-dev/components/phone-number-input';
import { UseFocus } from './bfe-dev/routes/use-focus';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/bfe/react-counter-app/" element={<ReactCounterApp />}></Route>
        <Route path="/bfe/use-timeout/" element={<UseTimeoutApp />}></Route>
        <Route path="/bfe/use-is-first-render/" element={<UseIsFirstRenderApp />}></Route>
        <Route path="/bfe/use-swr/" element={<UseSWR />}></Route>
        <Route path="/bfe/use-previous/" element={<UsePrevious />}></Route>
        <Route path="/bfe/use-hover/" element={<UseHover />}></Route>
        <Route path="/bfe/use-toggle/" element={<UseToggle />}></Route>
        <Route path="/bfe/use-debounce/" element={<UseDebounce />}></Route>
        <Route path="/bfe/use-effect-once/" element={<UseEffectOnce />}></Route>
        <Route path="/bfe/phone-number-input/" element={<PhoneNumberInput />}></Route>
        <Route path="/bfe/use-focus/" element={<UseFocus />}></Route>
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
