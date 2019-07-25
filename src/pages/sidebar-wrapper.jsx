import React from 'react'

import { Box, Flex, CircleOcticon, Text, BorderBox, StyledOcticon } from '@primer/components'
import { ThreeBars, X as CloseIcon } from '@primer/octicons-react'

export default props =>{
    const [open, setOpen] = React.useState(true)

    const clickIcon = () =>{
        setOpen(true)
    }

    const clickSidebar = () =>{
        setOpen(false)
    }
    return (
    <Flex>
        {open ? (
            <BorderBox 
                p={3}
                pt={4}
                pl={4}
                height={'-webkit-fill-available'}             
                borderRadius={0}
                width={1/7}>
                    <Flex flexDirection='column' height="-webkit-fill-available" justifyContent='space-between'>
                    <Flex p={1} pt={0} mt={0} pl={0} ml={0} m={1}>
                        <CircleOcticon bg={'black'} color='white' onClick={clickSidebar}  icon={CloseIcon} size={20}/>
                    </Flex>
                    <Text as='p'>
                        sidebar
                    </Text>
                    <Text as='p'>
                        sidebar
                    </Text>
                    <Text as='p'>
                        sidebar
                    </Text>
                    <Text as='p'>
                        sidebar
                    </Text>
                    </Flex>
                </BorderBox>
    ) : (
        <Box p={2} onClick={clickIcon}>
            <StyledOcticon size={30} icon={ThreeBars}/> 
        </Box>
    )}
        <BorderBox 
            height={'-webkit-fill-available'} 
            borderRadius={0} 
            border={0}
            p={5}
            borderLeft={open ? 1 : 0}
            width={open ? 6/7 : '100%'}>{props.children}</BorderBox>
    </Flex>
    )
}
