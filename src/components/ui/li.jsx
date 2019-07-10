import React from 'react'
import styled from 'styled-components'
import { Text } from '@primer/components'

const LiText = styled(Text).attrs({
  as: 'li'
})`
  &&& {
    font-family: 'Lato', monospace, Sans-Serif;
  }
`

export const Li = props =>{
  return (
    <LiText fontSize={[4,3,2]} {...props}/>
  )
}
