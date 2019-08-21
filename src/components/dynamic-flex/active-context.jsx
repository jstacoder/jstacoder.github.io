import React, { createContext, useState, useReducer } from 'react'

const SET_ACTIVE = 'set_active'

const activeReducer = (state, { type, value } = {}) => {
  switch (type) {
    case SET_ACTIVE:
      return value
    default:
      return state
  }
}

export const ActiveContext = createContext({
  active: null,
  setActive: () => {},
})

export const ActiveContextProvider = ({ children }) => {
  const [active, dispatch] = useReducer(activeReducer)

  const setActive = value => {
    dispatch({ type: SET_ACTIVE, value })
  }

  return (
    <ActiveContext.Provider value={{ active, setActive }}>
       {children}
    </ActiveContext.Provider>
  )
}
