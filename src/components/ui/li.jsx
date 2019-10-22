import React from 'react'
import styled from 'styled-components'
import { Text, Box, StyledOcticon } from '@primer/components'
import { system } from 'styled-system'
import { ChevronRight } from '@primer/octicons-react'

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
  &:hover {
    background-color: transparent;
    opacity: .7;
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
    <TextBox bg="lightBackground" p={2} style={{display: 'flex', justifyContent:'flex-start'}} mx="auto" my={3} borderRadius="2px" textAlign='center' theme={theme} {...props}>
      <StyledOcticon icon={ChevronRight} size={30}/>
      <LiText fontSize={[2,1,1,2]} color="darkText" theme={theme} style={{flex: 1}} {...props}>
        {children}
      </LiText>
    </TextBox>
  )
}

