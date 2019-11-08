/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Text } from '@theme-ui/components'

import useThemeContext from '../hooks/themeContext'

export const LightText = ({sx, ...props}) =>{
  const { theme } = useThemeContext()

  return (
    <Text sx={{
      ...sx,
      color:theme.colors.lightText
    }} {...props} />
  )
}

export const DarkText = ({sx, ...props})=>{
  const { theme } = useThemeContext()

  return (
    <Text sx={{
      ...sx,
      color:theme.colors.darkText
    }} {...props} />
  )
}

export const RedText = ({sx, ...props})=>{
  const { theme } = useThemeContext()

  return (
    <Text sx={{
      ...sx,
      color: theme.colors.error,
    }} {...props} />
  )
}
