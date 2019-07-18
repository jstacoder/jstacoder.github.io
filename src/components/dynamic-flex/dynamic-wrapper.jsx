import React from 'react'
import { BorderBox } from '@primer/components'

import DynamicElement from './dynamic-element.jsx'
import DynamicController from './dynamic-controller.jsx'
import { DynamicContextProvider } from './dynamic-context.js'
import { ActiveContextProvider } from './active-context.js' 

const DynamicWrapper = (props) =>{
    return (
        <DynamicContextProvider>
            <ActiveContextProvider>
                <BorderBox>
                    <DynamicController/>    
                </BorderBox>            
                <BorderBox>
                    <DynamicElement num={1}/>
                    <DynamicElement num={2}/>
                    <DynamicElement num={3}/>
                    <DynamicElement num={4}/>
                </BorderBox>    
            </ActiveContextProvider>
        </DynamicContextProvider>
    )
}

export default DynamicWrapper
