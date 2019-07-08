import React from 'react'

import { Flex, BorderBox, Box } from '@primer/components'

export const Column = props => <Flex {...props} flexDirection={'column'} flexBasis={'1 0 100'} minHeight={500}/>

export const Row = props => <Flex {...props} flexBasis={'1 0 100%'} />


export const ColorBox = ({bg, color, ...props})=> <Box minHeight={200} bg={bg} color={color} p={3} {...props}>{bg}</Box>

export const ColumnExample = ({justifyContent, grow = 0, ...props}) =>(
  <BorderBox p={2} borderWidth={2}>
    <Column justifyContent={justifyContent}>
        <Flex.Item flexGrow={grow}>
        <ColorBox bg='red.3' minHeight={100} />
        </Flex.Item>
      <Flex.Item flexGrow={grow}>
        <ColorBox bg='blue.3' minHeight={100} />
      </Flex.Item>
      <Flex.Item flexGrow={grow}>
        <ColorBox bg='green.3' minHeight={100} />
      </Flex.Item>
    </Column>
  </BorderBox>
)

export const RowExample = ({justifyContent, ...props}) =>(
 <BorderBox p={2} borderWidth={2}>
    <Row p={2} minWidth={400} justifyContent={justifyContent}>
        <Column>
        <ColorBox bg='red.3'/>
          <ColorBox bg='blue.3'/>
          <ColorBox bg='green.3'/>
        </Column>
      <Column>
        <ColorBox bg='blue.3'/>
        <ColorBox bg='red.3'/>
        <ColorBox bg='green.3'/>
      </Column>
        <Column>
        <ColorBox bg='green.3'/>
          <ColorBox bg='blue.3'/>
          <ColorBox bg='red.3'/>
        </Column>
    </Row>
 </BorderBox>
   )