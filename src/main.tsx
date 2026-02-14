import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { App } from './App';
import { ReactCounterApp } from './bfe-dev/routes/1-react-counter-app';
import { UseTimeoutApp } from './bfe-dev/routes/2-use-timeout';
import { UseIsFirstRenderApp } from './bfe-dev/routes/3-use-is-first-render';
import { UseSWRApp } from './bfe-dev/routes/4-use-swr';
import { UsePrevious } from './bfe-dev/routes/5-use-previous';
import { UseHover } from './bfe-dev/routes/6-use-hover';
import { UseToggle } from './bfe-dev/routes/7-use-toggle';
import { UseDebounce } from './bfe-dev/routes/8-use-debounce';
import { UseEffectOnce } from './bfe-dev/routes/9-use-effect-once';
import { PhoneNumberInput } from './bfe-dev/components/phone-number-input';
import { UseFocus } from './bfe-dev/routes/use-focus';
import { UserProfile } from './chat-gpt/apps/1-user-profile-app';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/bfe/1-react-counter-app/" element={<ReactCounterApp />} />
        <Route path="/bfe/2-use-timeout/" element={<UseTimeoutApp />} />
        <Route path="/bfe/3-use-is-first-render/" element={<UseIsFirstRenderApp />} />
        <Route path="/bfe/4-use-swr/" element={<UseSWRApp />} />
        <Route path="/bfe/5-use-previous/" element={<UsePrevious />} />
        <Route path="/bfe/6-use-hover/" element={<UseHover />} />
        <Route path="/bfe/7-use-toggle/" element={<UseToggle />} />
        <Route path="/bfe/8-use-debounce/" element={<UseDebounce />} />
        <Route path="/bfe/9-use-effect-once/" element={<UseEffectOnce />} />
        <Route path="/bfe/phone-number-input/" element={<PhoneNumberInput />} />
        <Route path="/bfe/use-focus/" element={<UseFocus />} />
        <Route path="/gpt/1-user-context/" element={<UserProfile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
