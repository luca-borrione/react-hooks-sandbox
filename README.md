# react-hooks-sandbox

Interview Tests based on React Hooks and RTL

## Tooling

This project currently uses:

- [Vite](https://vite.dev/) for the dev server and build
- [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for tests
- [Yarn 4](https://yarnpkg.com/) as the package manager

## Available scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in development mode.\
Open the URL printed in the terminal (typically [http://localhost:5173](http://localhost:5173)) to view it in the browser.

### `yarn test`

Runs the Jest test suite (React Testing Library, `@testing-library/user-event` v14).

### `yarn build`

Builds the app for production using Vite.

### `yarn preview`

Serves the production build locally so you can test it.

## Routes

When running `yarn dev`, the following routes are available:

Exercises from
[bigfrontend.dev React challenges](https://bigfrontend.dev/react?sort=oldest).

- [http://localhost:5173/](http://localhost:5173/)  default CRA-style landing page (`App`)
- [http://localhost:5173/bfe/1-react-counter-app/](http://localhost:5173/bfe/1-react-counter-app/)  basic counter component
- [http://localhost:5173/bfe/2-use-timeout/](http://localhost:5173/bfe/use-timeout/)  `useTimeout` hook demo
- [http://localhost:5173/bfe/3-use-is-first-render/](http://localhost:5173/bfe/use-is-first-render/)  `useIsFirstRender` hook demo
- [http://localhost:5173/bfe/use-swr/](http://localhost:5173/bfe/use-swr/)  `useSWR`-style data fetching hook demo
- [http://localhost:5173/bfe/use-previous/](http://localhost:5173/bfe/use-previous/)  `usePrevious` hook demo
- [http://localhost:5173/bfe/use-hover/](http://localhost:5173/bfe/use-hover/)  `useHover` hook demo
- [http://localhost:5173/bfe/use-toggle/](http://localhost:5173/bfe/use-toggle/)  `useToggle` hook demo
- [http://localhost:5173/bfe/use-debounce/](http://localhost:5173/bfe/use-debounce/)  `useDebounce` hook demo
- [http://localhost:5173/bfe/use-effect-once/](http://localhost:5173/bfe/use-effect-once/)  `useEffectOnce` hook demo
- [http://localhost:5173/bfe/phone-number-input/](http://localhost:5173/bfe/phone-number-input/)  phone number input formatting component
- [http://localhost:5173/bfe/use-focus/](http://localhost:5173/bfe/use-focus/)  `useFocus` hook demo

Any unknown route will redirect back to `/`.
