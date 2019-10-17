import React from 'react'
import { Text } from '@primer/components'
import styled from 'styled-components'

export const StyledText = styled(Text)`
  font-family: 'Lato', monospace, Sans-Serif;
  line-height: 1.3;
`

export const P = props =>{
  return (
    <StyledText {...props} fontSize={[2,3,4]} as={'p'} color={'fontColor'}/>
  )
}
