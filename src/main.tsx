import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import { ReactCounterApp } from './bfe-dev/routes/1-react-counter-app';
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/bfe/1-react-counter-app/" element={<ReactCounterApp />} />
        <Route path="/bfe/use-timeout/" element={<UseTimeoutApp />} />
        <Route path="/bfe/use-is-first-render/" element={<UseIsFirstRenderApp />} />
        <Route path="/bfe/use-swr/" element={<UseSWR />} />
        <Route path="/bfe/use-previous/" element={<UsePrevious />} />
        <Route path="/bfe/use-hover/" element={<UseHover />} />
        <Route path="/bfe/use-toggle/" element={<UseToggle />} />
        <Route path="/bfe/use-debounce/" element={<UseDebounce />} />
        <Route path="/bfe/use-effect-once/" element={<UseEffectOnce />} />
        <Route path="/bfe/phone-number-input/" element={<PhoneNumberInput />} />
        <Route path="/bfe/use-focus/" element={<UseFocus />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
