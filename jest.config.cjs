/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/src/**/*.{test,spec}.{ts,tsx}'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: '<rootDir>/tsconfig.json',
      },
    ],
  },
  moduleNameMapper: {
    // Stub out static asset imports (CSS, images, SVGs) for tests
    '\\.(css|less|scss|sass|svg|png|jpg|jpeg|gif)$': '<rootDir>/src/test-utils/fileMock.ts',
  },
};
