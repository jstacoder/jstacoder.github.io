import React, { useReducer, createContext, useLayoutEffect } from 'react'
import { ThemeProvider } from 'styled-components'

export const themes = {
  light: {
    background: '#ffffff',
    iconColor: '#24292e',
    colors: {
      grey: '#6a737d',
      white: '#fff',
    },
    border: 'border : 1px solid #dee2e6',
  },
  dark: {
    background: '#2f363d',
    iconColor: '#ffffff',
    colors: {
      grey: '#586069',
      white: '#fff',
    },
    border: 'box-shadow: 0 1px 1px rgba(27,31,35,0.1)',
  },
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '1rem',
    4: '1.5rem',
    5: '3rem',
  },
}

const windowGlobal = typeof window !== 'undefined' && window

export const getLocalThemeFromStorage = () =>
  (windowGlobal.localStorage && windowGlobal.localStorage.getItem('theme')) ||
  'light'

export const setLocalThemeInStorage = theme => {
  windowGlobal.localStorage && windowGlobal.localStorage.setItem('theme', theme)
}

const localTheme = getLocalThemeFromStorage()

const initialState = {
  style: localTheme,
  theme: themes[localTheme],
}

const reducer = (state, { value, type }) => {
  setLocalThemeInStorage(value)
  const theme = themes[value]
  switch (type) {
    case 'TOGGLE_THEME':
    case 'CHANGE_THEME':
      return { theme, style: value }
    default:
      return state
  }
}

const ThemeContext = createContext({
  state: initialState,
  dispatch: () => {},
})

function ThemeContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={state.theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
