import React from 'react'
import styled from 'styled-components'

 const StyledTable = styled.table`
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
  max-width: 95%;
`

export const Table = ({className, ...props})=>{
  return (
    <StyledTable className={`table table-bordered ${className}`} {...props}/>
  )
}
