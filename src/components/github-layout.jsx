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


export const GithubLayout = ({ children, timeToRead, title, sidebar=true, backUrl, backText, path}) => {
  const isIndex = path === '/'
  const { style } = useThemeContext()
  const mainWidth = sidebar ? [null, '60%','60%', 9 / 12] : ['100%']
  const { theme } = useThemeContext()

  return (

    <BorderBox
      as={Flex}
      display={[null, 'flex']}
      sx={{
        bg: theme.colors.mainBackground,
        flexDirection: sidebar ? 'row': 'column',
        border: 0,
        borderBottom: [null, null, null, style !== 'dark' ? 1 : 0],
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <SEO/>
        <BorderBox
          sx={{
            alignSelf: 'stretch',
            bg: theme.colors.secondaryBackground,
            border: 0,
            borderRight: [null, null, null, style !== 'dark' ? 0 : 3],
            borderRadius: 0,
            px: [1, 1, 3, 4],
            py: 2,
            width: [null, '40%', '25%'],
            display: sidebar ? 'flex' : 'none',
          }}
        >
          <Position 
              sx={{
                maxWidth: [null, '40%', '18%']
              }} 
              position={['static', null, 'fixed']} 
              top={'3em'} 
              left={'3em'}
            >
            <MastHead metaData={true} />
          </Position>
        </BorderBox>
        <Header
          sx={{display: sidebar ? 'none': 'inherit'}}
        >
          <Box sx={{width:20, height: 20,border: "1px solid blue"}}>Hi</Box>
        </Header>
      <BorderBox
        sx={{
          width: mainWidth,
          px: [0, 0, 1, 2],
          border: 0,
          borderTop: [1, 1, 1, 0],
          borderRadius: 0,
          py: [0, 0, 1, 2],
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
            sx={{
              fontSize: 4,
              color: 'lightText',
              mb: 2
            }}>
            <Box
              sx={{
                my: [2, 2, null],
                fontSize: 4,
                color: 'lightText'
              }}
            >
              {!isIndex ? <HomeLink text={backText} url={backUrl} /> : null}
              <Heading
                theme={theme}
                sx={{
                  pl: [2, 2, null],
                  fontSize: 40,
                  fontWeight: 300,
                  lineHeight: 1.25,
                }}
                color={'lightText'}
              >
                {title}
              </Heading>
              <Text
                theme={theme}
                sx={{
                  mx: [2, 2, null],
                  mb: 2,
                  color: 'lightText'
                }}
                color={'darkText'}
                as={'p'}
              >
                {timeToRead ? (<small>{timeToRead} min read</small>) : null}
              </Text>
              <Box
                sx={{
                  px: [0, 1, 2, 1, null],
                }}
                className={'markdown-body'}>
                {children}
              </Box>
            </Box>
            {!isIndex ? <HomeLink text={backText} url={backUrl} /> : null}
          </Box>
        </Box>
      </BorderBox>
    </BorderBox>

  )
}
