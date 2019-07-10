import React from 'react'
import { useState } from 'react'
import { Tooltip } from '@primer/components'

import { CopyIcon } from './'

const ClipBoardHelper = ({color, onClick, copyText, ...props})  => {
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
      <Box {...props} onClick={onClickClipboard} display={['none', 'none', 'none', 'block']}>
        <CopyIcon color={color}/>
      </Box>
    </Tooltip>
  )
}

export default ClipBoardHelper
