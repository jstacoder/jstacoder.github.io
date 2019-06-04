import React from 'react'

import 'prismjs/themes/prism-twilight.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

import { ThemeContextProvider } from './src/theme-context'
import { MDXProvider } from '@mdx-js/react'

const components = {
  wrapper: ({ children }) => <>{children}</>,
}

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>
    <ThemeContextProvider>{element}</ThemeContextProvider>
  </MDXProvider>
)
