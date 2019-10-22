/** @jsx jsx */
import { jsx } from 'theme-ui'
import { themed } from 'theme-ui/src/themed'
import { styled } from 'theme-ui/src/styled'
import { Box, Link, StyledOcticon, Text } from '@primer/components'
import { Link as GatsbyLink } from 'gatsby'
import { ChevronLeft } from '@primer/octicons-react'
import useThemeContext from '../hooks/themeContext'

const Styled = tag => styled(tag)(themed(tag))

const StyledBox = Styled(Box)
const StyledText = Styled(Text)
const StyledLink = Styled(Link)
const OctIcon = Styled(StyledOcticon)

export const HomeLink = ({url = "/", text = "Home"}) =>{
  const { theme: { colors: { lightText, darkText}} } = useThemeContext()
  return (
     <StyledText
       sx={{
         fontSize:3,
         mx:2
       }}>
       <StyledBox
         as={'span'}
         sx={{
           display: 'flex',
           alignItems: 'center',
         }}
       >
         <StyledLink
           as={GatsbyLink}
           to={url}
           sx={{
             display:'flex',
             alignItems: 'center',
             color: lightText,
            ':hover': {
               opacity: .75,
               color: darkText,
               textDecoration:'none',
            }
         }}
         >
           <OctIcon
             icon={ChevronLeft}
             sx={{
               size: 16 ,
               verticalAlign: "middle",
               mr:  2 ,
             }}
               ariaLabel={text}
           />
           {text}
         </StyledLink>
       </StyledBox>
     </StyledText>
  )
}
