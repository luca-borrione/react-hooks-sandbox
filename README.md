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

- [http://localhost:5173](http://localhost:5173)  default CRA-style landing page (`App`)

Any unknown route will redirect back to `/`.

### BFE routes

Exercises from
[bigfrontend.dev React challenges](https://bigfrontend.dev/react?sort=oldest).

All BFE exercises live under `/bfe/*` routes:

- [1-react-counter-app](http://localhost:5173/bfe/1-react-counter-app)
- [2-use-timeout](http://localhost:5173/bfe/use-timeout)
- [3-use-is-first-render](http://localhost:5173/bfe/use-is-first-render)
- [4-use-sw](http://localhost:5173/bfe/4-use-swr)
- [5-use-previous](http://localhost:5173/bfe/5-use-previous)
- [6-use-hover](http://localhost:5173/bfe/6-use-hover)
- [7-use-toggle](http://localhost:5173/bfe/7-use-toggle)
- [8-use-debounce](http://localhost:5173/bfe/8-use-debounce)
- [9-use-effect-once](http://localhost:5173/bfe/9-use-effect-once/)
- [phone-number-input/](http://localhost:5173/bfe/phone-number-input/)
- [use-focus/](http://localhost:5173/bfe/use-focus/)

### ChatGPT routes

ChatGPT-based interview exercises live under `/gpt/*` routes:

- [1-user-context](http://localhost:5173/gpt/1-user-context/)
- [2-cart-context](http://localhost:5173/gpt/2-cart-context/)
