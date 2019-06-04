import React, { useReducer, createContext } from 'react'

export const themes = {
  light: {
    background: '#ffffff',
    iconColor: '#24292e',
    colors: {
      grey: '#787B7B',
      white: '#fff',
      black: '#111',
    },
  },
  dark: {
    background: '#2f363d',
    iconColor: '#ffffff',
    colors: {
      grey: '#545757',
      white: '#fff',
      black: '#111',
    },
  },
}

const windowGlobal = typeof window !== 'undefined' && window

const localTheme =
  (windowGlobal.localStorage && windowGlobal.localStorage.getItem('theme')) ||
  'light'

const initialState = {
  style: localTheme,
  theme: themes[localTheme],
}

const reducer = (state, action) => {
  windowGlobal.localStorage &&
    windowGlobal.localStorage.setItem('theme', action.value)
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { theme: themes[action.value], style: action.value }
    case 'CHANGE_THEME':
      return { theme: themes[action.value], style: action.value }
    default:
      return state
  }
}

const ThemeContext = createContext({
  state: initialState,
  dispatch: () => {},
})

function ThemeContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  )
}

const ThemeContextConsumer = ThemeContext.Consumer

export { ThemeContext, ThemeContextProvider, ThemeContextConsumer }
