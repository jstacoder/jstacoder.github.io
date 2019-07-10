// @flow
import React from 'react'
import { ThemeContextProvider } from './src/theme-context'
import { BaseStyles } from '@primer/components'
import { Playground, Props } from 'docz'
import { utilities } from '@primer/components/css'
import { createGlobalStyle } from 'styled-components'

import useThemeContext from './src/hooks/themeContext'
import { AuthContextProvider } from './src/hooks/authContext'
import { BlocksProvider } from 'mdx-blocks'
import { future } from 'mdx-blocks/themes'

import * as components from './src/components/ui'

const Wrapper = ({ children }) => {
  const { theme } = useThemeContext()

  const componentsMap = {
    props: Props,
    playground: Playground,
    pre: components.Code,
    ul: components.Ul,
    ol: components.Ol,
    table: components.Table,
    p: components.P,
    h1: components.H1,
    h2: components.H2,
    h3: components.H3,
    h4: components.H4,
    h5: components.H5,
    h6: components.H6,
    li: components.Li,
    blockquote: components.Blockquote,
  }

  return (
    <BlocksProvider {...future} components={componentsMap} theme={theme}>
      {children}
    </BlocksProvider>
  )
}

export const wrapRootElement = ({ element }) => {
  const PrimerStyle = createGlobalStyle`${utilities}`
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <BaseStyles>
          <PrimerStyle />
          <Wrapper>{element}</Wrapper>
        </BaseStyles>
      </ThemeContextProvider>
    </AuthContextProvider>
  )
}
