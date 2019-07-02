import React, { useState } from 'react'
import {
  Box,
  BorderBox,
  Flex,
  StyledOcticon,
  ButtonOutline,
  Heading,
  Avatar,
  Text,
  TextInput,
} from '@primer/components'

import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

export default props => {
  const globals = {
    Box,
    BorderBox,
    Flex,
    StyledOcticon,
    ButtonOutline,
    Heading,
    Avatar,
    Text,
    TextInput,
    React,
  }

  return (
    <BorderBox
      m={3}
      p={3}
      maxWidth={'1200px'}
      minHeight={800}
      mx={'auto'}
      mt={9}
      borderWidth={2}
    >
      <LiveProvider code="<div><p>hi</p></div>" scope={globals}>
        <Flex flexWrap={'wrap'} justifyContent={'space-between'}>
          <Flex flexWrap={'wrap'}>
            <BorderBox minWidth={'100%'}>
              <Text>Buttons</Text>
            </BorderBox>
            <Flex minHeight={'100%'}>
              <BorderBox style={{ flex: 1 }} mb={3} mx={4} p={1}>
                <BorderBox
                  p={0}
                  borderColor={'red.1'}
                  minHeight={'100%'}
                  minWidth={500}
                >
                  <LiveEditor style={{ minHeight: '300px' }} />
                </BorderBox>
              </BorderBox>
              <BorderBox minWidth={500} style={{ flex: 1 }} mb={3} mx={4} p={1}>
                <LivePreview />
              </BorderBox>
              <Box p={3}>
                <LiveError />
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </LiveProvider>
    </BorderBox>
  )
}
