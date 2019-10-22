/** @jsx jsx */
import { jsx } from 'theme-ui'
import styled from 'styled-components'
import { Text } from '@primer/components'
import { Box, css } from 'theme-ui'
import useThemeContext from '../../hooks/themeContext'

const FontHeadingStyle = css({
  fontFamily: "'Lato', monospace, Sans-Serif"
})

export const HeadingWrapper = ({fontSize, color, bg, as, styles, ...props}) => {
  const { theme } = useThemeContext()
  return (<Text 
    {...props}
    theme={theme}
    as={as} 
    color='lightText'
    sx={{            
      bg,
    }}
    styles={styles}
    css={FontHeadingStyle}
  />)
}


