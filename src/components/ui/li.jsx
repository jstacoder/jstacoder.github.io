import React from 'react'
import styled from 'styled-components'
import { Text, Box } from '@primer/components'
import { system } from 'styled-system'

import useThemeContext from '../../hooks/themeContext'

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

export const Li = ({children, ...props}) =>{
  const { theme } = useThemeContext()
  return (
    <TextBox bg="lightBackground" p={2} mx="auto" my={3} borderRadius="2px" textAlign='center' theme={theme} {...props}>
      <LiText fontSize={[2,1,1,2]} color="darkText" theme={theme} {...props}>
        {children}
      </LiText>
    </TextBox>
  )
}

