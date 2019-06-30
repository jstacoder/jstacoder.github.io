import React, { useReducer, createContext, useLayoutEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { generateMedia } from 'styled-media-query'
import { theme as primerTheme } from '@primer/components'

const customBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

const fontSizes = {
  6: 12,
  5: 14,
  4: 16,
  3: 18,
  2: 22,
  1: 24,
  0: 32,
  7: 40,
  8: 48,
}

export const mediaQuerys = generateMedia(customBreakpoints)

const space = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '1rem',
  4: '1.5rem',
  5: '3rem',
  6: '16px',
}

export const themes = {
  light: {
    ...primerTheme,
    fontSizes,
    borders: [...primerTheme.borders, '1px solid lightgray'],
    breakpoints: [...primerTheme.breakpoints],
    // space,
    mediaQuerys,
    background: '#ffffff',
    iconColor: '#24292e',
    colors: {
      grey: '#6a737d',
      white: '#fff',
      lightGray: '#eaecef',
      ...primerTheme.colors,
    },
    border: '1px solid #dee2e6',
  },
  dark: {
    ...primerTheme,
    fontSizes,
    borders: [...primerTheme.borders, '1px solid lightgray'],
    breakpoints: [...primerTheme.breakpoints],
    // space,
    mediaQuerys,
    background: '#2f363d',
    iconColor: '#ffffff',
    colors: {
      grey: '#586069',
      white: '#fff',
      lightGray: '#eaecef',
      darkGray: '#24292e',
      ...primerTheme.colors,
    },
    boxShadow: '0 1px 1px rgba(27,31,35,0.1)',
  },
}

Object.keys(themes).forEach(key => {
  const currentTheme = themes[key]
  if (!currentTheme.breakpoints) {
    currentTheme.breakpoints = Object.values(customBreakpoints)
  }
  console.log(currentTheme.breakpoints)
  currentTheme.breakpoints.xs = currentTheme.breakpoints[0]
  currentTheme.breakpoints.sm = currentTheme.breakpoints[1]
  currentTheme.breakpoints.md = currentTheme.breakpoints[2]
  currentTheme.breakpoints.lg = currentTheme.breakpoints[3]
})

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
