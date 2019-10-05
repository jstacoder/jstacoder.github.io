import React from 'react'
import {
  BorderBox,
  Box,
  Text,   
  Heading,   
  Position,
  } from '@primer/components'
import MastHead from './mastHead'
import { css } from 'styled-components'
import { doczState } from 'docz'
import { system } from 'styled-system'
import styled from 'styled-components'

import SEO from '../components/seo'
import { HomeLink } from '../components/home-link'
import useThemeContext from '../hooks/themeContext'

const pStyle = css`
  div {
    margin: 0;
  }
`


export const GithubLayout = ({ children, timeToRead, title, sidebar=true, backUrl, backText, isIndex=false}) => {
  const { style } = useThemeContext()
  const mainWidth = sidebar ? [null, 7 / 12, 8 / 12, 9 / 12] : '100%'

  return (  
      
    <BorderBox
      display={[null, null, 'flex']}
      border={0}
      borderBottom={[null, null, style !== 'dark' ? 1 : 0]}
      minHeight={'100vh'}
    >
      <SEO/>
      { sidebar ? (
        <BorderBox
          alignSelf={'stretch'}
          bg={'secondaryBackground'}
          border={0}
          borderRight={style !== 'dark' ? 0 : 3}
          borderRadius={0}
          px={[4, 4, 6, 7]}
          py={6}
          width={[null, 5 / 12, 4 / 12, 3 / 12]}
        >
          <Position position={['static', 'static' ,'static','static', 'sticky']} top={50} left={75}>
            <MastHead metaData={true} />
          </Position>
        </BorderBox>
      ) : null}
      <BorderBox
        width={mainWidth}
        px={[null, 4, 4, 7]}
        border={0}
        borderTop={[1, 1, 0]}
        borderRadius={0}
        bg={'background'}
        py={6}
      >
        <Box mx={'auto'} maxWidth={900}>
          <Box fontSize={4} color={style === 'dark' ? 'white' : null} mb={6}>
            <Box
              mx={[2, 2, null]}
              fontSize={4}
            color={style === 'dark' ? 'white' : null}
            >
              {!isIndex ? <HomeLink text={backText} url={backUrl} /> : null}
              <Heading
                pl={[2, 2, null]}
                fontSize={40}
                fontWeight={300}
                lineHeight={1.25}
              >
                {title}
              </Heading>
              <Text
                mx={[2, 2, null]}
                as={'p'}
                mb={5}
                color={`${style === 'dark' ? 'white' : 'gray'}`}
              >
                {timeToRead ? (<small>{timeToRead} min read</small>) : null}
              </Text>
              <Box px={[2, 1, null]} className={'markdown-body'}>
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
