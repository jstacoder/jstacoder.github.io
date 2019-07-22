import React, { useState, useReducer, useEffect } from 'react'
import { Box, BorderBox, Flex, Button, TextInput } from '@primer/components'

const Btn = ({text, ...props}) => <BorderBox minWidth={1} bg={'gray'} {...props}>{text}</BorderBox>

const DynamicWrapperToolbar = props => {
  return  (
    <Flex flexDirection={'row'} flexWrap={'wrap'}>
      <Btn text={'test'}/>
      <Btn text={'more'}/>
      <Btn text={'koo0'}/>
    </Flex>
  )
}


const DynamicFlex = props => {
  
  return (
    <Box minWidth={0}>
      <DynamicWrapperToolbar/>
      <BorderBox minWidth={1} minHeight={200}>
        childrten go here
      </BorderBox>
    </Box>
  )
}

export default DynamicFlex
