import React from 'react'
import styled from 'styled-components'

import useThemeContext from '../../hooks/themeContext'

const BaseUl = styled.ul`
  color: ${props => props.color};
  list-style-type: none;
  & li {
    font-family: 'Lato', monospace, Sans-Serif;
    max-width: 80%;
    ::before {
      content: '● ';
      color: gray;
      font-weight: bold;
      font-size: 1.5em;
      margin-right: 5px;
    }
  }
  margin-left: 5px;
`

export const Ul = props =>{
  const { theme } = useThemeContext()
  
  return (
    <BaseUl color={theme.colors.fontColor}/>
  )
}

export default Ul

