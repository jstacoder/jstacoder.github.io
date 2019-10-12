/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Box, Link, StyledOcticon, Text } from '@primer/components'
import { Link as GatsbyLink } from 'gatsby'
import { ChevronLeft } from '@primer/octicons-react'

export const HomeLink = ({url = "/", text = "Home"}) =>{
  return (
     <Text
       sx={{
         fontSize:5,
         mx:4
       }}>
       <Box
         as={'span'}
         sx={{
           display: 'flex',
           alignItems: 'center',
         }}
       >
         <Link
           as={GatsbyLink}
           to={url}
           sx={{
             display:'flex',
             alignItems: 'center',
             color: 'text',
            ':hover': {
               color: 'darkText',
               textDecoration:'none',
            }
         }}
         >
           <StyledOcticon
             icon={ChevronLeft}
             sx={{
               size: 16 ,
               verticalAlign: "middle",
               mr:  2 ,
             }}
               ariaLabel={text}
           />
           {text}
         </Link>
       </Box>
     </Text>
  )
}
