import React from 'react'
import { ThemeContextProvider } from './src/theme-context'
import { BaseStyles } from '@primer/components'
import { utilities } from '@primer/components/css'
import { createGlobalStyle } from 'styled-components'

export const wrapRootElement = ({ element }) => {
  const PrimerStyle = createGlobalStyle`${utilities}`
  return (
    <ThemeContextProvider>
      <BaseStyles>
        <PrimerStyle />
        {element}
      </BaseStyles>
    </ThemeContextProvider>
  )
}
