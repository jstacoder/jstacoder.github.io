import React, { Children }  from 'react'
import { Box, BorderBox, Flex } from '@primer/components'
import PropTypes from 'prop-types'

import uuid from 'uuid/v4'

const PropCollector = ({Component, ...extraProps}) =>{
    const [props, setProps] = React.useState({})

    const addProp = (key, value) =>{
        setProps({...props, [key]: value})
    }

    const removeProp = prop => {
        const {
            [prop]: removedProp,
            ...rest
        } = props

        setProps(rest)
    }

    return <Component {...props} {...extraProps} /> 
}


export const DynamicFlexComponent = ({initial = false, initialNum = 1, ...props}) =>{
    const [num, setNum] = React.useState(initial ? 4 : 1)
    const initialState = initial ? ['1','2','3'] : []

    const numRef = React.useRef()

    numRef.current = num

    const ADD_ELEMENT = 'ADD_ELEMENT'
    const REMOVE_ELEMENT = 'REMOVE_ELEMENT'

    const removeElement = ({state, value}) =>{
        return state.filter(itm=> itm !== value)
    }

    const addElement = ({state}) => {
        const newState = [...state, `${num}`]
        const nextNum = num + 1
        setNum(nextNum)

        return newState
    }

    const reducer = (state, {type, value} = {})=>{
        const results = {
            [ADD_ELEMENT]:({state, value})=> addElement({state}),
            [REMOVE_ELEMENT]:({state, value})=> removeElement({state, value}),
        }
        if(type in results){
            return results[type]({state, value})
        }
        return state
    }

    const [childElements, dispatch] = React.useReducer(reducer, initialState)

    const addElementAction = () => dispatch({
        type: ADD_ELEMENT,
    })

    const removeElementAction = ele => dispatch({
        type: REMOVE_ELEMENT,
        value: ele,
    })

    const Container = initial ? 
        props => <Flex flexWrap='wrap' size={800} {...props}/> :
        props => <BorderBox size={30} {...props} />


    const renderChildren = () =>(
        <Container>            
            {childElements.map(child => (
                <DynamicFlexComponent 
                    initialNum={child} 
                    onClick={()=> removeElementAction(child)} 
                    key={`${initialNum}-${child}-${uuid()}`}>
                        {initialNum}
                    </DynamicFlexComponent>
            ))}
        </Container>
    )    
    const Wrapper = initial ? 
    props=>(
        <BorderBox size={200}>
            <button onClick={addElementAction}>add</button>
            <Box>
                {initialNum}
            </Box>                
            {renderChildren()}            
        </BorderBox>
        ):
        props=>(
        <React.Fragment>{renderChildren()}</React.Fragment>
    )

    return <Wrapper/>
    
}

DynamicFlexComponent.propTypes = {
    ...BorderBox.propTypes,
    flexBasis: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    flexDirection: PropTypes.string,
    alignItems: PropTypes.string,
    alignContent: PropTypes.string,
    justifyItems: PropTypes.string,
    justifyContent: PropTypes.string,
    flexWrap: PropTypes.string,
    flex: PropTypes.number,
    flexGrow: PropTypes.number,
    flexShrink: PropTypes.number,
    justifySelf: PropTypes.string,
    alignSelf: PropTypes.string,
    order: PropTypes.number,
    children: PropTypes.children,
}
