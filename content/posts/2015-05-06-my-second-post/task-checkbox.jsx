import React from 'react'
import {
  BorderBox,
  StyledOcticon
} from '@primer/components'
import { Check } from '@primer/octicons-react'


export default ({checked}) => (
  <BorderBox textAlign={'center'} size={20} mr={2}>
    {checked ? <StyledOcticon color={"green.6"} ml={1} verticalAlign={'text-top'} icon={Check} size={15}/> : null}
  </BorderBox>
)
