import React from 'react'
import styled from 'styled-components'
import { Text, Box } from '@primer/components'
import { system } from 'styled-system'

const config = {
  textAlign: true
}

const borderConfig = {
  borderRadius: true
}

const borderRadius = system(borderConfig)

const textAlign = system(config)


const LiText = styled(Text).attrs({
  as: 'p'
})`
  font-weight: 700;
  margin-bottom: 0;
  &&& {
    font-family: 'Lato', monospace, Sans-Serif; 
  }
  /* max-width:80%; */
`

const TextBox = styled(Box)`
  ${textAlign};
  ${borderRadius};
`

export const Li = props =>{
  return (
    <TextBox bg="lightBackground" p={2} mx="auto" my={3} borderRadius="2px" textAlign='center'>
      <LiText fontSize={[4,3,3,4]} color="darkText" {...props}/>
    </TextBox>
  )
}
