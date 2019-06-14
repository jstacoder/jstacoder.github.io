import React, { useContext } from 'react'
import { ThemeContext } from '../theme-context'

const useThemeContext = () => {
  const {
    state: { theme, style },
    dispatch,
  } = useContext(ThemeContext)

  const setTheme = newTheme => {
    dispatch({ type: 'CHANGE_THEME', value: newTheme })
  }

  return {
    theme,
    style,
    setTheme,
  }
}

export default useThemeContext
