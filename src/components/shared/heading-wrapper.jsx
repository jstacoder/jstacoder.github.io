import React from 'react'
import styled from 'styled-components'
import { Box, Heading } from '@primer/components'

const FontHeading = styled(Heading)`
  font-family: 'Lato', monospace, Sans-Serif;
`

export const HeadingWrapper = props => <Box mb={3}><FontHeading {...props}/></Box>


