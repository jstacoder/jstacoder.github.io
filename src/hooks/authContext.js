import React, { useState, createContext, useReducer, useContext } from 'react'


const LOGIN_USER = 'LOGIN_USER'
const logUserInAction = user =>({
  type: LOGOUT_USER,
  value: user,
})

const LOGOUT_USER = 'LOGOUT_USER'
const logoutUserAction = () =>({
  type: LOGOUT_USER,
})



const authReducer = (state, {type, value}={})=>{
  const results = {
    [LOGIN_USER]: value=> value,
    [LOGOUT_USER]: ()=> null,
  }
  if(type in results){
    return results[type](value, state)
  }
  return state
}

const initialState = null

const AuthContext = createContext(
  {
    currentUser: null,
    dispatch: ()=>{},
  }
)

export const AuthContextProvider = ({children})=>{
  const [currentUser, dispatch] = useReducer(authReducer, initialState)
  
  return (
    <AuthContext.Provider value={{currentUser, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}



export const useAuth = ({onLogin, onLogout} = {}) =>{
  
  const {currentUser, dispatch} = useContext(AuthContext)
  
  const getCurrentUser = () => currentUser
  
  const logUserIn = user => {
    dispatch(logUserInAction(user))
    if(onLogin){
      onLogin(user)
    }
  }
  
  const logUserOut = () => {
    dispatch(logoutUserAction())
    if(onLogout){
      onLogout()
    }
  }
  
  const isLoggedIn = () => currentUser !== null
  
  const handleLogin = ({username, password}) =>{
    console.log(process.env.GATSBY_USERNAME)
    if(username===process.env.GATSBY_USERNAME){
      console.log(process.env.GATSBY_PASSWORD)
      if(password===process.env.GATSBY_PASSWORD){
        console.log('loggin in')
        logUserIn({username})
      }
    }
  }
  
  return {
    getCurrentUser,
    logUserOut,
    isLoggedIn,
    handleLogin,
  }
}
