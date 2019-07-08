import React from 'react'
import {
  Box,
  Flex,
} from '@primer/components'

export const BaseBox = Box

export const BaseFlex = Flex

export const Column = props => <Flex flexDirection={'column'} {...props} />

export const Row = props => <Flex flexDirection={'row'} {...props} />

export const ColorBox = ({bg, ...props}) =><Box display={'flex'} bg={`${bg}.2`} size={50} {...props} />

export const BlueBox = props => <ColorBox bg={'blue'} {...props} />
export const GreenBox = props => <ColorBox bg={'green'} {...props} />
export const RedBox = props => <ColorBox bg={'red'} {...props} />
export const GrayBox = props => <ColorBox bg={'gray'} {...props} />

export const BaseLayout = ({children, BoxComponent = Box, ...props}) =>{
  return (
   <BoxComponent {...props} m={2} p={3}>
     <Flex justifyContent={'center'}>
       <BoxComponent m={'auto'}>
         {children}
       </BoxComponent>
     </Flex>
   </BoxComponent>
  )
}

export const ColumnLayout = props => {
  return (
   <Column width={500}>
     <Row>
       <GreenBox minWidth={500} height={100}>
         header
       </GreenBox>
     </Row>
     <Row>
       <RedBox minWidth={500} height={300}>
         content
       </RedBox>
     </Row>
     <Row>
       <BlueBox minWidth={500} height={50}>
       footer
       </BlueBox>
     </Row>
   </Column>
  )
}