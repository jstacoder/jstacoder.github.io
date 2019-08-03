import React from 'react'
import styled from 'styled-components'
import { Box } from '@primer/components'

 const StyledTable = styled.table`
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
  max-width: 95%;

  td {
   color: green;
  }
`

export const Table = ({className, ...props})=>{
  return (
    <Box m={2} p={3}>
      <StyledTable 
        {...props}
        className={`table table-bordered ${className}`} />
    </Box>
  )
}
