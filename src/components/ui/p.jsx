import React from 'react'
import { Text } from '@primer/components'
import styled from 'styled-components'
import useThemeContext from '../../hooks/themeContext'

export const StyledText = styled(Text)`
  font-family: 'Lato', monospace, Sans-Serif;
  line-height: 1.3;
`

export const P = props =>{
  const { theme } = useThemeContext()
  return (
    <StyledText {...props} theme={theme} fontSize={[4,3,2]} as={'p'} color={'lightText'}/>
  )
}
