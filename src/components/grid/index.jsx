import React, { Children, useState } from 'react'
import { Box, Flex } from '@primer/components'

export const Row = ({children}) =>{
    const [show, setShow] = useState(true)
    return show ? (
        <Box onClick={()=> setShow(false)} width="100%" bg="green.4" p={2} my={2}>
            <Box>{'<Row/>'}</Box>
            {children}
        </Box>
    ) : null
}

export const Grid = ({children}) =>{
    return (
    <Box mx={'auto'} my={'auto'} p={5} width={1/2} >
        <Flex flexDirection="column" bg="green.6" m={2} p={3}>
            <Box>{'<Grid/>'}</Box>
            {children}
        </Flex>
    </Box>
    )
}

