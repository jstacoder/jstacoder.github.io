import React from 'react'
import { ThemeContext } from '../theme-context'

const useTheme = () => {
  return React.useContext(ThemeContext)
}

export default useTheme
