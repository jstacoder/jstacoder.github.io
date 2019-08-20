/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Box, Link, StyledOcticon, Text } from '@primer/components'
import { Link as GatsbyLink } from 'gatsby'
import { ChevronLeft } from '@primer/octicons-react'

export const HomeLink = props =>{
  return (
     <Text fontSize={5} mx={4}>
       <Box
         as={'span'}
         display={'flex'}
         alignItems={'center'}

       >
         <Link
           as={GatsbyLink}
           to="/"
           display={'flex'}
           alignItems={'center'}
           color={'text'}
           sx={{
            ':hover': {
               color: 'lightText',
               textDecoration:'none',
            }
         }}
         >
           <StyledOcticon
             icon={ChevronLeft}
             size={16}
             verticalAlign="middle"
             ariaLabel="Home"
             mr={2}
           />
           Home
         </Link>
       </Box>
     </Text>
  )
}
