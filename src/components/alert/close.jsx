import React from 'react'
import styled from 'styled-components'
import {StyledOcticon, BorderBox, Text, Flex} from '@primer/components'
import { PropTypes } from 'prop-types'
import { X } from '@primer/octicons-react'


const CloseBtn = ({dismiss, dismissed, dismissable, onClick, ...props}) => {
  const [clicked, setClicked] = React.useState(false)
  
  
  
  const handleMouseDown = () =>{
    if(clicked)
    {
      setClicked(false)
    }
  }
  const handleMouseUp = () =>{
    if(!clicked)
    {
      setClicked(true)
    }
  }
  
  const dismissAlert = () =>{
    console.log('clocked')
    if(onClick){
      onClick()
    }
    if(dismissable){
      dismiss()
    }
  }
  
  return dismissed === 'true' ? null : (
   <div onMouseOver={handleMouseUp} onMouseOut={handleMouseDown} onClick={dismissAlert} style={{display: 'inline-flex' ,backgroundColor: clicked ? 'grey' : 'transparent'}}>
     <StyledOcticon {...props} icon={X}  />
   </div>
  )
  
}

const StyledCloseButton = styled(CloseBtn)`
  &:hover {
    cursor: pointer;
  }
  &:focus-within{
    background-color: dimgray;
    opacity: 0.2%;
  }
  z-index: 1000;
  background-color: transparent;
`

const CloseButton = props =>{
  const [dismissed, setDismissed] = React.useState('false')
  const [hidden, setHidden] = React.useState(null)
  
  const dismiss = () =>{
    setDismissed('true')
  }
  
  React.useEffect(()=>{
    if(dismissed!=='false' && dismissed==='true')
    {
      setHidden(true)
    }
  }, [dismissed])
  
  console.log(hidden)
  return (hidden === null) ? <StyledCloseButton {...props} dismiss={dismiss} dismissed={dismissed} /> : null
  
}

CloseButton.propTypes = {
  /** what to do when clicked */
  onClick: PropTypes.func,
}

export const CloseButtonWrapper = props =>{
  const [count, setCount] = React.useState(0)
  
  const onClick = () =>{
    setCount(count+1)
  }
  
  return (
   <BorderBox>
   <Flex border={1} flexDirection={'column'} display={'flex'}>
     <Flex.Item>
     <Text m={4}>
       clicked {count} times
     </Text>
     </Flex.Item>
     <Flex.Item alignSelf={'flex-end'}>
       <CloseButton onClick={onClick} display={'flex-inline'} alignSelf={'flex-end'}/>
     </Flex.Item>
   </Flex>
   </BorderBox>
  )
}

export default CloseButton
