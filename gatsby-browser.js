/** @jsx jsx */
import { jsx } from 'theme-ui'
import { ThemeContextProvider } from './src/theme-context'
import { utilities } from '@primer/components/css'
import { createGlobalStyle } from 'styled-components'

import componentsMap from './src/gatsby-plugin-theme-ui/components'

export const wrapRootElement = ({ element }) => {
  const PrimerStyle = createGlobalStyle`${utilities}`
  return (
    <ThemeContextProvider components={componentsMap}>
      <PrimerStyle />
      {element}
    </ThemeContextProvider>
  )
}
