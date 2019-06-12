const React = require('react')
const { ThemeContextProvider } = require('./src/theme-context')

exports.wrapRootElement = ({ element }) => {
  return <ThemeContextProvider>{element}</ThemeContextProvider>
}
