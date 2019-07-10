import React from 'react'
import styled from 'styled-components'

import useThemeContext from '../../hooks/themeContext'

const BaseOl = styled.ol`
  color: ${props=> props.color};
  list-style-type: none;
  
  &li {
    max-width: 80%;
    font-family: 'Lato', monospace, Sans-Serif;
    
    ::before {
      content: '-- ';
      font-weight: bold;
      font-size: 0.5em;
      margin-right: 5px;
      color: white;
    }
  }
  margin-left: 5px;
`

export
const Ol = props => {
  
  const { theme } = useThemeContext()
  
  return (
    <BaseOl {...props} color={theme.colors.fontColor}/>
  )
  
}

export default Ol
