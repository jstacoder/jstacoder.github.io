import React from 'react'
import styled, {css} from 'styled-components'
import { Text } from '@primer/components'

export default styled(Text)`
  ${({completed})=> completed ? css`text-decoration: line-through` : ``};
  cursor: pointer;
`
