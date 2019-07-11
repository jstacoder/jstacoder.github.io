import React from 'react'
import { useState } from 'react'
import { Tooltip, Box } from '@primer/components'
import { Clippy } from '@primer/octicons-react'
import PropTypes from 'prop-types'


import { CopyIcon } from './'

const ClipBoardHelper = ({color, onClick, copyText, ...props} = {})  => {
  const tooltipMessages = {
    PRE_CLICK: 'Click to copy code to clipboard',
    POST_CLICK: 'Code copied to clipboard'
  }
  
  const [tooltipText, setTooltipText] = useState(
    tooltipMessages.PRE_CLICK
  )
  
  const toggleTooltipText = () =>{
    setTooltipText(tooltipMessages.POST_CLICK)
    
    setTimeout(()=>{
      setTooltipText(tooltipMessages.PRE_CLICK)
    }, 5000)
  }
  
  const setClipboardText = text =>{
    toggleTooltipText()
    window &&
      window.navigator &&
        window.navigator.clipboard.writeText(text)
  }
  
  const onClickClipboard = e =>{
    e.preventDefault()
    setClipboardText(copyText)
    
    onClick()
  }
  
  
  
  return (
    <Tooltip text={tooltipText}>
      <Box 
          {...props} 
          onClick={onClickClipboard} 
          display={['none', 'none', 'none', 'block']}>
        <CopyIcon icon={Clippy} color={color}/>
      </Box>
    </Tooltip>
  )
}

ClipBoardHelper.PropTypes = {
  onClick: PropTypes.function, 
}

ClipBoardHelper.defaultProps = {
  onClick: ()=>{}
}

export default ClipBoardHelper
