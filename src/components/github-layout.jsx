/** @jsx jsx */
import { jsx } from 'theme-ui'
import {
  BorderBox,
  Box,
  Text,
  Heading,
  Position,
  Flex,
  } from '@primer/components'
import MastHead from './mastHead'
import styled, { css } from 'styled-components'

import SEO from '../components/seo'
import { HomeLink } from '../components/home-link'
import useThemeContext from '../hooks/themeContext'
import { getComments } from './comments'
import { CommentBlock } from './comments/comment-box'

const pStyle = css`
  div {
    margin: 0;
  }
`

const Header = ({children, ...props}) =>{
  return (
    <Box {...props} as={Flex} width='100%'>
      {children}
    </Box>
  )
}


export const GithubLayout = ({ children, commentApiId, timeToRead, title, sidebar=true, backUrl, backText, path, ...props}) => {
  
  const isIndex = path === '/' || props.isIndex
  const { style } = useThemeContext()
  const mainWidth = sidebar ? [null, null, null,'60%', 9 / 12] : ['100%']
  const { theme } = useThemeContext()
  const result = getComments(commentApiId)
  result.then(({getComments})=>{
    console.log('cc',getComments)
  })
  return (

    <BorderBox
      as={Flex}
      display={[null, null, null, 'flex']}
      width={'100%'}
      sx={{
        bg: theme.colors.mainBackground,
        flexDirection: sidebar ? 'row': 'column',
        border: 0,
        borderBottom: [null, null, null, style !== 'dark' ? 1 : 0],
        minHeight: '100vh',
      }}
    >
      <SEO/>
        <BorderBox
          px={[1,1,3,4]}
          py={2}
          width={[null, '60%', '35%','25%']}
          mx={['auto', null, null]}
          sx={{
            alignSelf: 'stretch',
            bg: theme.colors.secondaryBackground,
            border: 0,
            borderRight: [null, null, null, style !== 'dark' ? 0 : 3],
            borderRadius: 0,
            
            display: sidebar ? 'flex' : 'none',
          }}
        >
          <Position 
              sx={{
                maxWidth: [null, null, '100%', '19%']
              }} 
              position={['static', null, null, 'fixed']} 
              top={'3em'} 
              left={'1em'}
             
            >
            <MastHead metaData={true} />
          </Position>
        </BorderBox>
        <Header
          display={sidebar ? 'none': 'inherit'}
        >
          <Box sx={{width:20, height: 20,border: "1px solid blue"}}>Hi</Box>
        </Header>
      <BorderBox
        width={mainWidth}
        px={[0,0,1,2]}
        border={0}
        borderTop={[1,1,1,0]}
        borderRadius={0}
        py={[0,0,1,2]}
        sx={{
          flex: sidebar ? 1 : 0,
        }}
        as={sidebar ? BorderBox : Flex}
      >
        <Box
          sx={{
            mx: 'auto',
            maxWidth: 900,
          }}
        >
          <Box
            fontSize={4}
            color={'lightText'}
            mb={2}>
            <Box                 
              my={[2, 2, null]}
              fontSize={4}
              color={'lightText'}
    
            >
              {!isIndex ? <HomeLink text={backText} url={backUrl} /> : null}
              <Heading
                theme={theme}
                pl={[2, 2, null]}
                fontSize={40}
                fontWeight={300}
                lineHeight={1.25}                
                color={'lightText'}
              >
                {title}
              </Heading>
              <Text
                theme={theme}               
                mx={[2, 2, null]}
                mb={2}                
                color={'darkText'}
                as={'p'}
              >
                {timeToRead ? (<small>{timeToRead} min read</small>) : null}
              </Text>
              <Box
                px={[0, 1, 2, 1, null]}                
                className={'markdown-body'}>
                {children}
              </Box>
            </Box>
            {commentApiId ? <CommentBlock postId={commentApiId} /> :null }
            {!isIndex ? <HomeLink text={backText} url={backUrl} /> : null}
          </Box>
        </Box>
      </BorderBox>
    </BorderBox>

  )
}
