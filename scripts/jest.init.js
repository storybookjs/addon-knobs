// setup file
import '@testing-library/jest-dom';

/**
 * Fail tests on console errors and warnings.
 */
const consoleError = global.console.error;
global.console.error = (...args) => {
  consoleError(...args);
  throw new Error(JSON.stringify(args));
}
const consoleWarn = global.console.warn;
global.console.warn = (...args) => {
  consoleWarn(...args);
  throw new Error(JSON.stringify(args));
}
