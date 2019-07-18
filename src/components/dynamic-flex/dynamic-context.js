import React, { createContext, useState } from 'react'


export const DynamicContext = createContext({
    $height:30,
    $width: 30,
    setHeight: ()=>{},
    setWidth: ()=>{},
})

export const DynamicContextProvider = ({children})=>{
    const [ $height, setHeight ] = useState(30)
    const [ $width, setWidth ] = useState(30)
    
    const value = {
        $height, 
        setHeight,
        $width,
        setWidth,
    }

    return (
        <DynamicContext.Provider value={value}>
            {children}
        </DynamicContext.Provider>
    )
}
