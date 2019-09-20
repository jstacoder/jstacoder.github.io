import React, { useState } from 'react'
import styled from 'styled-components'
import { StyledOcticon } from '@primer/components'
import PropTypes from 'prop-types'
import { Clippy } from '@primer/octicons-react'


const BaseCopyIcon = styled(StyledOcticon).attrs((props)=>({
  color: props.color,
  size: props.size || 25,
  mr:props.mr !== undefined ? props.mr : 3,
  p: props.p  !== undefined ? props.p : '2px',
}))`
  cursor: pointer;  
  :hover {
    background-color: ${props=> props.hoverBackgroundColor || 'white'};
    
    color: ${props=> props.theme.colors.darkText};
  }
`

export const CopyIcon = props =>{
  return (
    <BaseCopyIcon icon={Clippy} {...props} />                                   
  )
}

CopyIcon.propTypes = {
  color: PropTypes.string,
}

CopyIcon.defaultProps = {
  color: 'lightText'
}
