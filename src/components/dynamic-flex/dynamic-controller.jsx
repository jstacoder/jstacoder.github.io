import React, { useContext } from 'react'
import { Box, BorderBox, Flex, TextInput, Text } from '@primer/components'

import { DynamicContext } from './dynamic-context'
import { ActiveContext } from './active-context'

const DynamicController = props =>{
    const { $height, setHeight, $width, setWidth } = useContext(DynamicContext)
    const { active } = useContext(ActiveContext)

    return (
        <BorderBox>
            <BorderBox p={2} m={2}>
                <Text>Active: [{active}]</Text>
            </BorderBox>
            <Flex>
            <BorderBox style={{flex: 1}} display={'flex'}>
                <Flex flex={1}>
                <Text my={3}>Height: [{$height}]</Text>
                </Flex>
                <Flex flex={5}>
                <TextInput 
                    type="range"
                    min={20} 
                    max={500} 
                    width={1}
                    value={`${$height}`} 
                    onChange={e=> setHeight(e.target.value)}/>
                </Flex>
            </BorderBox>
            <BorderBox style={{flex: 1}} display={'flex'}>
                <Flex flex={1}>
                <Text my={3}>Width: [{$width}]</Text>
                </Flex>
                <Flex flex={5}>
                <TextInput 
                    type="range" 
                    min={20} 
                    max={500} 
                    value={`${$width}`} 
                    width={1}
                    onChange={e=> setWidth(e.target.value)} />
                </Flex>
            </BorderBox>
            </Flex>
        </BorderBox>        
    )
}

export default DynamicController
