import React, { useState } from 'react'
import { Flex, BorderBox } from '@primer/components'

import Slider from './'

export const SliderWithStartAndEndHandler = props =>{
    const [inputValue, setInputValue] = useState(20)
    const [sliding, setSliding] = useState(false)

    const onStartSlide = (value) =>{
        setSliding(true)
        console.log(`Started sliding with ${value}`)
    }

    const onEndSlide = (prevValue, nextValue) =>{
        console.log(`Ended sliding with ${nextValue} changed from ${prevValue}`)

        setInputValue(nextValue)
        setSliding(false)
    }

    return (
        <BorderBox p={4} m={2}>
            <BorderBox p={2} m={3}>
                {`${sliding ? '' : 'not '} sliding`}
            </BorderBox>
            <BorderBox p={3} mt={3} mb={3} width={'100px'} mx={'auto'}>
                {inputValue}
            </BorderBox>
            <Slider onStartSlide={onStartSlide} onEndSlide={onEndSlide} defaultValue={inputValue} />
        </BorderBox>
    )

}

export const VerticalExample = () =>{
    const [val1, setVal1] = useState(10)    
    const [val2, setVal2] = useState(30)    
    const [val3, setVal3] = useState(50)    
    const [val4, setVal4] = useState(90)    

    return ( 
      <BorderBox p={3} m={2} bg='lightBackground'>
        <Flex justifyContent='center'>
            <Flex flexDirection='column' alignItems='center'>
                <BorderBox width={1/3} border={1} borderColor='black' borderWidth={3}>
                    <Slider vertical value={val1} onChange={setVal1} /> 
                    <BorderBox p={2} m={2} bg={'lightBackground'} style={{textAlign:'center'}} border={1} borderColor='black' color='black'>
                        {val1}
                    </BorderBox> 
                </BorderBox>
            </Flex>
            <Flex flexDirection='column' alignItems='center'>
            <BorderBox width={1/3} border={1} borderColor='black' borderWidth={3}>

                <Slider vertical value={val2} onChange={setVal2} /> 
                <BorderBox p={2} m={2}  bg={'lightBackground'} style={{textAlign:'center'}} border={1} borderColor='black' color='black'>
                    {val2}
                </BorderBox> 
                </BorderBox>
            </Flex>
            <Flex flexDirection='column' alignItems='center'>
            <BorderBox width={1/3} border={1} borderColor='black' borderWidth={3}>

                <Slider vertical value={val3} onChange={setVal3} /> 
                <BorderBox p={2} m={2}  bg={'lightBackground'} style={{textAlign:'center'}} border={1} borderColor='black' color='black'>
                    {val3}
                </BorderBox> 
                </BorderBox>
            </Flex>
            <Flex flexDirection='column' alignItems='center'>
            <BorderBox width={1/3} border={1} borderColor='black' borderWidth={3}>

                <Slider vertical value={val4} onChange={setVal4} /> 
                <BorderBox p={2} m={2}  bg={'lightBackground'} style={{textAlign:'center'}} border={1} borderColor='black' color='black'>
                    {val4}
                </BorderBox> 
            </BorderBox>
            </Flex>
            <Flex flexDirection='column' alignItems='center'>
            <BorderBox width={1/3} border={1} borderColor='black' borderWidth={3}>

                <Slider vertical value={val4} onChange={setVal4} /> 
                <BorderBox p={2} m={2}  bg={'lightBackground'} style={{textAlign:'center'}} border={1} borderColor='black' color='black'>
                    {val4}
                </BorderBox> 
            </BorderBox>
            </Flex>
        </Flex>
      </BorderBox>
        )
}
