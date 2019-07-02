import React, { useState } from 'react'
import {
  BorderBox,
  StyledOcticon
} from '@primer/components'
import PropTypes from 'prop-types'

import { Check, Star } from '@primer/octicons-react'

const DefaultIcon = StyledOcticon

const defaultIconProps = props => ({
  color:"green.6",
  ml:1,
  verticalAlign:'text-top',
  icon:Check,
  size:.75*props.size
})

export const ExampleIcon = StyledOcticon

export const exampleIconProps = props =>({
  color: 'blue.5',
  verticalAlign: 'text-top',
  icon: Star,
  size: .95*props.size
})

export const CustomCheckbox = ({
  checked,
  onChange,
  defaultChecked,
  size,
  icon:IconComponent,
  provideIconProps = (props)=>({...props}),
  ...props
  }) => {
  const [stateValue, setStateValue] = useState(defaultChecked)
  
  const value = checked !== undefined ? checked : stateValue
  
  const innerChangeValue = e => {
    setStateValue(!value)
  }
  
  const onChangeValue = onChange !== undefined ? onChange : innerChangeValue
  
  const iconProps = provideIconProps({...props, size})
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
  /** function to return props to pass icon */
  provideIconProps: PropTypes.func,
}

CustomCheckbox.defaultProps = {
  size: 20,
  icon: DefaultIcon,
  provideIconProps: defaultIconProps,
}
