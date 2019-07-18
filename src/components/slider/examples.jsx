import React, { useState } from 'react'
import { BorderBox } from '@primer/components'

import Slider from './'

export const SliderWithStartAndEndHandler = props =>{
    const [inputValue, setInputValue] = useState(20)

    const onStartSlide = (value) =>{
        console.log(`Started sliding with ${value}`)
    }

    const onEndSlide = (prevValue, nextValue) =>{
        console.log(`Ended sliding with ${nextValue} changed from ${prevValue}`)

        setInputValue(nextValue)
    }

    return (
        <BorderBox p={4} m={2}>
            <BorderBox p={3} mt={3} mb={3} width={'100px'} mx={'auto'}>
                {inputValue}
            </BorderBox>
            <Slider onStartSlide={onStartSlide} onEndSlide={onEndSlide} defaultValue={inputValue} />
        </BorderBox>
    )

}
