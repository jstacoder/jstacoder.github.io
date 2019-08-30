/** @jsx jsx */
import { jsx } from 'theme-ui'
import styled from 'styled-components'
import { Box, css } from 'theme-ui'

const FontHeadingStyle = css({
  fontFamily: "'Lato', monospace, Sans-Serif"
})

export const HeadingWrapper = ({fontSize, color, bg, as, styles, ...props}) => (
  <Box 
    {...props}
    as={as} 
    sx={{      
      color: 'fontColor',
      bg,
    }}
    styles={styles}
    css={FontHeadingStyle}
  />
)


