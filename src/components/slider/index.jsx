import React, { useState, useRef, useEffect } from 'react'
import { TextInput, Flex, Box, BorderBox, StyledOcticon, CircleOcticon } from '@primer/components'
import { PrimitiveDot, DiffAdded, DiffRemoved } from '@primer/octicons-react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


const Dot = styled(PrimitiveDot)``

const StyledSlider = styled.input.attrs(props=>({
    type: 'range',
    min: props.min || 10,
    max: props.max || 100,
    step: props.step || 5,
}))`
    appearance: ${props=> props.vertical ? 'slider-vertical' :'slider-horizontal'};
    width: 100%;
    height: ${props=> props.height || '5px'};
    background-color: #d3d3d3;
    outline: none;
    opacity: 0.7;
    transition: opacity .2s;

    :hover {
        opacity: 1;
    }

    ::-webkit-slider-thumb,
    ::-moz-slider-thumb {
        appearance: none;
        width: 25px;
        height: 25px;
        background-color: ${props=> props.focused ? 'blue':'#4CAF50'}; 
        cursor: pointer;
    }

    ::-moz-range-thumb,
    ::-webkit-range-thumb {
        width: 25px;
        height: 25px;
        background-color: ${props=> props.focused ? 'blue':'#4CAF50'}; 
        cursor: pointer;

        :before {
            content: ${Dot}
        }
    }
`


const Slider = ({
    min, max, step, 
    value, defaultValue, 
    onChange, onStartSlide, 
    onEndSlide, addIcons, vertical}) =>{
    const [elementValue, setElementValue] = useState(value || defaultValue)
    const [focused, setFocused] = useState(false)

    const prevValueRef = useRef(null)
    const startSlideRef = useRef(null)

    useEffect(()=>{
        prevValueRef.current = elementValue
    }, [elementValue])


    const inputRef = useRef(null)

    const isControlledComponent = defaultValue === undefined

    let oldVal = prevValueRef.current

    const handleMouseDown = () =>{
        onStartSlide(oldVal)     
        startSlideRef.current = oldVal
    }

    const handleMouseUp = () =>{
        onEndSlide(startSlideRef.current, elementValue)
    }

    const handleChange = e =>{
        const oldValue = prevValueRef.current
        setElementValue(e.target.value)
        onChange(e.target.value)
    }

    const increment = () =>{
        const value = elementValue + step
        handleChange({target: { value }})
    }

    const decrement = () =>{
        const value = elementValue - step
        console.log('decrement', value)
        if(value >= min){
            handleChange({target: {value}})
        }
    }

    return (
        <Box p={2} m={3}>
            <Flex>
                {addIcons ? <Box onClick={()=>decrement()} mt={'-5px'}>
                    <StyledOcticon 
                        mt={'-15px'} 
                        mr={2} 
                        icon={DiffRemoved} 
                        size={30}/>
                </Box> : null}
                <StyledSlider 
                    vertical={vertical}
                    height={vertical ? '100px' : null}
                    onMouseDown={handleMouseDown} 
                    onMouseUp={handleMouseUp}
                    ref={inputRef} 
                    focused={focused} 
                    min={min} 
                    max={max} 
                    step={step} 
                    value={elementValue} 
                    onChange={handleChange} /> 
                {addIcons ? <Box onClick={()=>increment()} mt={'-5px'}>
                    <StyledOcticon 
                        mt={'-15px'} 
                        ml={2} 
                        icon={DiffAdded} 
                        size={30} />
                </Box> : null}
            </Flex>
        </Box>
    )
}

Slider.propTypes = {
    /** The components value, if you want to create an uncontrolled component dont pass this, pass defaultValue */
    value: PropTypes.any,
    /** The components initial value, use this to let the component handle its own state */
    defaultValue: PropTypes.any,
    /** callback fired with value whenever the value changes */
    onChange: PropTypes.func,
    /** callback fired with current ie: prechange value when change starts */
    onStartSlide: PropTypes.func,
    /** callback fired with old value and updated value when change ends */
    onEndSlide: PropTypes.func,
    /** Min number for value */
    min: PropTypes.number,
    /** Maximum number for value */
    max: PropTypes.number,
    /** Movement on slider will increment/decrment by this amount */
    step: PropTypes.number,
    /** if true show plus and minus icons */
    addIcons: PropTypes.boolean,
    /** Should be vertical */
    vertical: PropTypes.boolean,
}

Slider.defaultProps = {
    addIcons: false,
    min: 10,
    max: 100,
    step: 5,
    onChange: value=>{},
    onStartSlide: value=>{},
    onEndSlide: (previousValue, currentValue)=>{},
}

export default Slider
