import React, { useState } from 'react'
import styled from 'styled-components'
import { StyledOcticon } from '@primer/components'
import PropTypes from 'prop-types'
import { Clippy } from '@primer/octicons-react'


const BaseCopyIcon = styled(StyledOcticon).attrs((props)=>({
  color: props.color,
  size: 25,
  mr:3,
}))`
  cursor: pointer;
  padding: 2px;
  :hover {
    background-color: white;
    border-radius: 5px;
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
