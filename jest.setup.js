/* global console, global */

const originalError = console.error
global.console.error = (...args) => {
  if (args[0] && args[0].includes && args[0].includes('Warning: ReactDOM.render is no longer supported')) return
  originalError(...args)
}