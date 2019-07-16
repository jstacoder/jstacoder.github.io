import React, {useState, useEffect} from 'react'
import { Dropdown, TextInput, Flex, Box, BorderBox } from '@primer/components'
import PropTypes from 'prop-types'
import { space } from 'styled-system'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

import styled from 'styled-components'


import useProps from '../../hooks/props'

const Label = styled.label`
    width: ${({width})=> width};
    ${space}
`

const Select = ({value, options, onChange})=>{
    return (
        <Box style={{flex: 1}}>
            <Dropdown title={value}>
                <Dropdown.Menu>
                {options.map(option=>
                        <Dropdown.Item 
                            color='black'
                            onClick={()=> 
                                onChange({target: { value:option }})
                            } 
                            key={option}>
                                {option}
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </Box>
    )
}

export const DynamicFlex = props =>{
    
    const {
        boxs:[boxs, setBoxs],
        flex: [flex, setFlex],
        flexGrow: [flexGrow, setFlexGrow],
        flexShrink: [flexShrink, setFlexShrink] ,
        flexDirection: [flexDirection, setFlexDirection],
        height:[height, setHeight],
        width: [width, setWidth],
        alignItems: [alignItems, setAlignItems],
        justifyContent: [justifyContent, setJustifyContent],
        flexWrap: [flexWrap, setFlexWrap],
    } = useProps([
        'height', 'width', 'flex', 
        'flexGrow', 'flexShrink','flexDirection',
        'alignItems', 'justifyContent', 'flexWrap',
        'boxs',
    ])

    useEffect(()=>{
        setBoxs(6)
    },[])
    const flexWrapOptions = [
        'wrap',
        'nowrap',
        'wrap-reverse'
    ]

    const alignItemsOptions = [
        'flex-start',
        'flex-end',
        'center',
        'stretch',
        'baseline'
    ]
    const justifyContentOptions = alignItemsOptions.concat([
        'space-between',
        'space-around',
        'space-evenly'
    ])

    const flexDirectionOptions = [
        'row',
        'column',
        'row-reverse',
        'column-reverse',    
    ]

    const changeValue = setFunc => event => {
        setFunc(event.target.value)
    }



    return (
        <div>
            <Flex justifyContent={'space-around'}>
            <Flex flexDirection='column'>
                    <label>add block</label>
                    <button onClick={()=> setBoxs(boxs+1)}>add</button>
                </Flex>
                <Flex flexDirection='column'>
                    <label>flex direction</label>
                    <Select options={flexDirectionOptions} value={flexDirection||'row'} onChange={changeValue(setFlexDirection)} />                                
                </Flex>

                <Flex flexDirection='column'>
                    <label>flex wrap</label>
                    <Select options={flexWrapOptions} value={flexWrap||'wrap'} onChange={changeValue(setFlexWrap)}/>
                </Flex>
                <Flex flexDirection='column'>
                    <label>align items</label>
                    <Select options={alignItemsOptions} value={alignItems||'stretch'} onChange={changeValue(setAlignItems)}/>
                </Flex>
                <Flex flexDirection='column'>
                    <label>justify content</label>
                    <Select options={justifyContentOptions} value={justifyContent||'stretch'} onChange={changeValue(setJustifyContent)}/>
                </Flex>

            </Flex>
            <Flex>
            <Box mb={2} mx={2} width={1/2}>
                <Box>
                    <Label mr={3} width={'6%'}>height</Label>
                </Box>
                <Box>
                    <Slider min={50} max={600} step={2} value={height!=undefined ? height : 200} onChange={(value)=> changeValue(setHeight)({target:{value}})}/>
                </Box>
            </Box>
            <Box mb={2} mx={2} width={1/2}>
                <Label mr={4} width={'6%'}>width</Label>
                <Slider min={50} max={950} step={2} value={width!=undefined ? width : 200} onChange={(value)=> changeValue(setWidth)({target:{value}})}/>
            </Box>
            </Flex>
           


            <BorderBox width={`${width||200}px`} height={`${height||200}px`}>
                <Flex 
                    alignItems={alignItems} 
                    justifyContent={justifyContent} 
                    flexWrap={flexWrap||'wrap'} 
                    flexDirection={flexDirection}
                    >
                        {Array(boxs).fill('').map((_,idx)=>
                            <BorderBox textAlign='center' size={30}>{idx}</BorderBox>
                        )}                        
                </Flex>
            </BorderBox>
        </div>
    )            
}

DynamicFlex.propTypes = {
    flex: PropTypes.number,
    flexGrow: PropTypes.number,
    flexShrink: PropTypes.number, 
    flexBasis: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    flexWrap: PropTypes.oneOf(['wrap', 'wrap-reverse', 'nowrap']),
    flexDirection: PropTypes.oneOf(['row', 'column', 'row-reverse', 'column-reverse']),
    alignItems: PropTypes.oneOf(['flex-start','flex-end','center','stretch']),
    justifyContent: PropTypes.oneOf(['flex-start', 'flex-end', 'center','space-around', 'space-between', 'space-evenly']),    
}