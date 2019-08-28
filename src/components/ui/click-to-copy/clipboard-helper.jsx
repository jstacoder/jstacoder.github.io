import React from 'react'
import { useState, useEffect } from 'react'
import { Tooltip, Box } from '@primer/components'
import PropTypes from 'prop-types'
import copy from 'copy-to-clipboard'


import { CopyIcon } from './'

const ClipBoardHelper = ({color, onClick, copyText, ...props} = {})  => {
  const tooltipMessages = {
    PRE_CLICK: 'Click to copy code to clipboard',
    POST_CLICK: 'Code copied to clipboard'
  }
  const [copied, setCopied] = useState(false)
  const [tooltipText, setTooltipText] = useState(
    tooltipMessages.PRE_CLICK
  )

  useEffect(()=>{
    const timeoutId = setTimeout(()=>{
      if(copied){
        setCopied(false)
        setTooltipText(tooltipMessages.PRE_CLICK)
      }
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [copied])  
  
  const toggleTooltipText = () =>{
    setTooltipText(tooltipMessages.POST_CLICK)       
  }
  
  const setClipboardText = text =>{
    toggleTooltipText()
    copy(text)
  }
  
  const onClickClipboard = e =>{
    e.preventDefault()
    setClipboardText(copyText)
    setCopied(true)
    onClick()
  }
  
  
  
  return (
    <Tooltip text={tooltipText}>
      <Box 
          {...props} 
          onClick={onClickClipboard} 
          display={['none', 'none', 'none', 'block']}>
        <CopyIcon color={color}/>
      </Box>
    </Tooltip>
  )
}

ClipBoardHelper.propTypes = {
  onClick: PropTypes.func,
  copyText: PropTypes.string.isRequired,
}

ClipBoardHelper.defaultProps = {
  onClick: ()=>{}
}

export default ClipBoardHelper
