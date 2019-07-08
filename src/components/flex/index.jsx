import React from 'react'
import {BorderBox, Box, Flex} from '@primer/components'


export default (props) => (
 <BorderBox width={300} height={300} borderRadius={0}>
  <Flex flexWrap="nowrap">
    <Flex.Item>
      <Box p={3} bg="blue.5">
        Item 1
      </Box>
    </Flex.Item>
    <Flex.Item flexGrow={3}>
      <Box p={3} bg="green.5">
        Item 2
      </Box>
    </Flex.Item>
    <Flex.Item>
      <Box p={3} bg="yellow.5">
        Item 3
      </Box>
    </Flex.Item>
  </Flex>
</BorderBox>
)