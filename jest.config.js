module.exports = {
  cacheDirectory: '.cache/jest',
  clearMocks: true,
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '^.*\\.stories\\.[jt]sx?$',
  ],
  snapshotSerializers: ['@emotion/jest'],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['./scripts/jest.init.js'],
  coverageReporters: ['lcov'],
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: [],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
};