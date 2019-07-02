import React, { useState } from 'react'
import {
  BorderBox,
  StyledOcticon
} from '@primer/components'
import PropTypes from 'prop-types'

import { Check } from '@primer/octicons-react'

const DefaultIcon = StyledOcticon 

const defaultIconProps = {
  color:"green.6",
  ml:1,
  verticalAlign:'text-top',
  icon:Check,
  size:.75*size
}

const CustomCheckbox = ({
  checked, 
  onChange, 
  defaultChecked,
  size,
  icon:IconComponent,
  iconProps,
  ...props
  }) => {
  const [stateValue, setStateValue] = useState(defaultChecked)
  
  const value = checked !== undefined ? checked : stateValue
  
  const innerChangeValue = e => {
    setStateValue(!value)
  }
  
  const onChangeValue = onChange !== undefined ? onChange : innerChangeValue
  
  return (
  <BorderBox 
    {...props}
    onClick={onChangeValue}
    textAlign={'center'} 
    size={size} 
    mr={2}>
    {value ? 
     <IconComponent {...iconProps}/>: 
      null
     }
  </BorderBox>
  )
}

export default CustomCheckbox

CustomCheckbox.propTypes = {
  /** pass for controlled component */
  checked: PropTypes.boolean,
  /** also used to create controlled component */
  onChange: PropTypes.func,
  /** pass to let component handle state */
  defaultChecked: PropTypes.boolean,
  /** pass to change size */
  size: PropTypes.number,
  /** pass to change default icon */
  icon: PropTypes.Component,
  /** props to pass icon */
  iconProps: PropTypes.any,
}

CustomCheckbox.defaultProps = {
  size: 20,
  icon: DefaultIcon,
  iconProps: defaultIconProps,
}