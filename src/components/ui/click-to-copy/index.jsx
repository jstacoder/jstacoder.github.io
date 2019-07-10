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

const CopyIcon = props =>{
  return (
    <BaseCopyIcon {...props} />
  )
}

CopyIcon.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.node,
}

CopyIcon.defaultProps = {
  color: 'lightText'
}


export default CopyIcon
