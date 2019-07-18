import React, { useContext, useState, useRef, useEffect } from 'react'
import { Box, BorderBox, Text } from '@primer/components'
import uuid from 'uuid/v4'

import { DynamicContext } from './dynamic-context'
import { ActiveContext } from './active-context'

const DynamicElement = props =>{
    const elementId = useRef(null)
    const [storedHeight, setStoredHeight] = useState(30)
    const [storedWidth, setStoredWidth] = useState(30)

    useEffect(()=>{
        elementId.current = uuid()
    },[])



    const { active, setActive } = useContext(ActiveContext)
    const { $height, setHeight, $width, setWidth } = useContext(DynamicContext)

    const isActive = () => active === elementId.current

    useEffect(()=>{
        if(isActive()){
            setStoredHeight($height)
        }
    }, [$height])

    useEffect(()=>{
        if(isActive()){
            setStoredWidth($width)
        }
    }, [$width])

    const setElementActive = () => {
        setActive(elementId.current)
        setHeight(storedHeight)
        setWidth(storedWidth)
    }

    return (
        <BorderBox 
            onClick={setElementActive}
            height={`${storedHeight}px`} 
            width={`${storedWidth}px`} 
            m={3} 
            p={2}
            border={1}
            borderWidth={active ? '3px' : '1px'} 
            borderColor={active == elementId.current ? 'red.2' : 'blue.4'}>            
                <Text>{props.num}</Text>
        </BorderBox>
    )
}

export default DynamicElement
