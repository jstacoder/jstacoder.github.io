import React from 'react'
import { ThemeContextProvider } from './src/theme-context'
import { BaseStyles } from '@primer/components'

export const wrapRootElement = ({ element }) => (
  <ThemeContextProvider>
    <BaseStyles>{element}</BaseStyles>
  </ThemeContextProvider>
)
