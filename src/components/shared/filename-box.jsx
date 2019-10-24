import React from 'react'
import styled from 'styled-components'
import { BorderBox } from '@primer/components'

export const FilenameBox = styled(BorderBox)`
  border-radius: 0;
  margin-bottom: -7px;
  border-bottom: 1px solid darkslategray;
  font-family: 'Lato', monospace, Sans-Serif;
  color: ${props=> props.color || props.theme.colors.lightText};
  background-color: ${props=> props.backgroundColor || props.theme.colors.background};
`
