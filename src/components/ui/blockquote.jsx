/** @jsx jsx */
/* eslint-disable prettier/prettier */
import { jsx, css } from 'theme-ui'
import { BorderBox } from '@primer/components'

import useThemeContext from '../../hooks/themeContext'

export const Blockquote = props =>{
  const { theme } = useThemeContext()
  return (
    <BorderBox 
      theme={theme}
      as='blockquote' 
      py='10px'
      px='30px'
      m='30px 0'
      borderRadius={1}
      border={0}
      borderLeft={'10px solid'}
      borderColor={'gray.7'}
      bg={'lightBackground'}
      {...props}
      />      
  )
}
  

