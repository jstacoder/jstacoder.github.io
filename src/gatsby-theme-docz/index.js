/** @jsx jsx */
import { jsx } from 'theme-ui'
import { theme, useConfig, ComponentsProvider } from 'docz'
import { ThemeProvider, Styled } from 'theme-ui'
import baseComponents from 'gatsby-theme-docz/src/components'
import baseTheme from 'gatsby-theme-docz/src/theme'
import { themes } from '../theme-context'
import merge from 'lodash/merge'

import * as myComponents from 'components/ui'

const components = {
  ...baseComponents,
  ...myComponents,
}

const Theme = ({ children }) => {
  const { themeConfig } = useConfig()

  // console.log(themeConfig)

  return (
    <ThemeProvider theme={themeConfig}>
      <ComponentsProvider components={components}>
        <Styled.root>{children}</Styled.root>
      </ComponentsProvider>
    </ThemeProvider>
  )
}

export const themeConfig = merge(baseTheme, {
  colors: themes.light.colors,
  // colors:{
  //     ...themes.light.colors,
  //     lightText: 'green',
  //     darkBackground: 'purple',
  //     background: 'lightgray',
  //     header: {
  //         bg: baseTheme.colors.muted,
  //         button: {
  //             bg: 'white',
  //             color: 'grey'
  //         }
  //     },
  //     sidebar:{
  //         bg: baseTheme.colors.muted,

  //     },
  //     modes: {
  //         dark:{
  //             ...themes.dark.colors,
  //             lightText: 'pink',
  //             darkBackground: 'gray'
  //         }
  //     }
  // }
})

export const enhance = theme(
  themeConfig,
  ({
    mode = 'light',
    showPlaygroundEditor = true,
    showLiveError = true,
    ...config
  }) => ({
    ...config,
    showLiveError,
    showPlaygroundEditor,
    initialColorMode: mode,
  })
)

export default enhance(Theme)
