import React from 'react'
import { Text } from '@primer/components'
import styled from 'styled-components'

export const StyledText = styled(Text)`
  font-family: 'Lato', monospace, Sans-Serif;
  line-height: 1.3;
`

export const P = props =>{
  return (
    <StyledText {...props} fontSize={[4,3,2]} as={'p'} color={'fontColor'}/>
  )
}
