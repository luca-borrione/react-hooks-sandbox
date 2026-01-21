import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';
import airbnbBestPractices from 'eslint-config-airbnb-base/rules/best-practices';
import airbnbErrors from 'eslint-config-airbnb-base/rules/errors';
import airbnbNode from 'eslint-config-airbnb-base/rules/node';
import airbnbStyle from 'eslint-config-airbnb-base/rules/style';
import airbnbVariables from 'eslint-config-airbnb-base/rules/variables';
import airbnbEs6 from 'eslint-config-airbnb-base/rules/es6';
import airbnbImports from 'eslint-config-airbnb-base/rules/imports';
import airbnbStrict from 'eslint-config-airbnb-base/rules/strict';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';

const airbnbRules = {
  ...airbnbBestPractices.rules,
  ...airbnbErrors.rules,
  ...airbnbNode.rules,
  ...airbnbStyle.rules,
  ...airbnbVariables.rules,
  ...airbnbEs6.rules,
  ...airbnbImports.rules,
  ...airbnbStrict.rules,
};

// ESLint flat config for the React + TypeScript app
export default [
  // Ignore generated / build artefacts
  {
    ignores: ['dist', 'coverage', 'node_modules', '**/.history/**'],
  },

  // Base JS recommended rules (equivalent to "eslint:recommended")
  js.configs.recommended,

  // TypeScript rules (non type-aware, so no project service required)
  ...tseslint.configs.recommended,

  // Project-specific settings and rules for our TS/TSX source files
  {
    name: 'app:src',
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    plugins: {
      import: importPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      // Airbnb base style guide (all merged rule sets)
      ...airbnbRules,

      // React Hooks best practices
      ...reactHooks.configs.recommended.rules,

      // Disable stylistic rules that conflict with Prettier (keep this before the custom ones)
      ...prettier.rules,

      // Disallow default exports; always use named exports
      'import/prefer-default-export': 'off',
      'import/no-default-export': 'error',

      // Allow devDependencies in test files and Jest setup
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

      // Allow extension-less imports for JS/TS modules
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],

      // Vite / React Fast Refresh guard
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Always require curly braces for control statements
      curly: ['error', 'all'],

      // Allow ++ / --
      'no-plusplus': 'off',

      // Use the TypeScript-aware unused-vars rule instead of the base one
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'all',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_+$', // Ignore parameters that are exactly underscore
          varsIgnorePattern: '^_+$', // Ignore variables that are exactly underscore
          caughtErrorsIgnorePattern: '^_+$', // Ignore caught errors that are exactly underscore
        },
      ],
    },
  },

  // ESLint config file (Node ESM)
  {
    name: 'config:eslint',
    files: ['eslint.config.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },

  // Jest config file (Node CJS, using `module.exports`)
  {
    name: 'config:jest',
    files: ['jest.config.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        ...globals.node,
      },
    },
  },

  // Jest-specific rules and globals for test files
  {
    name: 'app:test',
    ...jestPlugin.configs['flat/recommended'],
    files: ['**/*.{spec,test}.{js,jsx,ts,tsx}'],
  },
];
