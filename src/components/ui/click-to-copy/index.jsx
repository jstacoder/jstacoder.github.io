import React, { useState } from 'react'
import styled from 'styled-components'
import { StyledOcticon } from '@primer/components'
import PropTypes from 'prop-types'
import { Clippy } from '@primer/octicons-react'
import useThemeContext from '../../../hooks/themeContext'

const BaseCopyIcon = styled(StyledOcticon).attrs((props)=>({
  color: props.color || props.theme.colors.lightText,
  size: props.size || 25,
  mr:props.mr !== undefined ? props.mr : 3,
  p: props.p  !== undefined ? props.p : '2px',  
}))`
  border-radius: 3px;
  cursor: pointer;  
  :hover {
    background-color: ${props=> props.theme.colors.mainBackground};    
    color: ${props=> props.theme.colors.darkText};
  }
`

export const CopyIcon = props =>{
  const { theme } = useThemeContext()
  return (
    <BaseCopyIcon theme={theme} icon={Clippy} {...props} />                                   
  )
}

CopyIcon.propTypes = {
  color: PropTypes.string,
}

CopyIcon.defaultProps = {
  color: 'lightText'
}
