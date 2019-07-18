import React, { createContext, useState } from 'react'

export const ActiveContext = createContext({active: null, setActive: ()=>{}})

export const ActiveContextProvider = ({children}) =>{
    const [ active, setActive ] = useState(null)

    return (
        <ActiveContext.Provider value={{active, setActive}}>  
            {children}
        </ActiveContext.Provider>
    )
}
