import React from 'react'
import { BorderBox, Box, Text, StyledOcticon, Link, Heading  } from '@primer/components'
import { ChevronLeft } from '@primer/octicons-react'
import { Link as GatsbyLink } from 'gatsby'
import MastHead from './mastHead'

import useThemeContext from '../hooks/themeContext'

export const GithubLayout = ({children, timeToRead, title})=>{
  const { style } = useThemeContext()
  return (
      <BorderBox
          display={[null, null, 'flex']}
          border={0}
          borderBottom={[null, null, style !== 'dark' ? 1 : 0]}
        >
          <BorderBox
            alignSelf={'stretch'}
            bg={style === 'dark' ? 'gray.9' : 'white'}
            border={0}
            borderColor={style !== 'dark' ? 'gray.1' : ''}
            borderRight={style !== 'dark' ? 1 : 0}
            px={[4, 4, 6, 7]}
            py={6}
            width={[null,5/12, 4/12, 3/12]}
          >
            <MastHead metaData={true} />
          </BorderBox>
          <BorderBox
            width={[null, 7/12, 8/12, 9/12 ]}
            px={[null, 4, 4, 7]}
            border={0}
            borderTop={[1, 1, 0, 0]}
            bg={style === 'dark' ? 'gray.8' : 'gray.1'}
            py={6}
          >
            <Box mx={'auto'} maxWidth={900}>
            <Box
                fontSize={4}
                color={style === 'dark' ? 'white' : null}
                mb={6}
              >
                <Box ml={[2,2,null]} fontSize={4} color={style === 'dark' ? 'white' : null}>
                  <Text fontSize={5}>
                    <Box
                      as={'span'}
                      display={'flex'}
                      alignItems={'center'}
                      color={'blue.5'}
                    >
                      <Link
                        as={'a'}
                        href="/"
                        display={'flex'}
                        alignItems={'center'}
                        color={style === 'dark' ? 'white' : null}
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
                  <Heading ml={[2,2,null]} fontSize={40} fontWeight={300} lineHeight={1.25}>
                    {title}
                  </Heading>                  
                  <Text
                    ml={[2,2,null]}
                    as={'p'}
                    mb={5}
                    color={`${style === 'dark' ? 'white' : 'gray'}`}
                  >
                    <small>{timeToRead} min read</small>
                  </Text>              
                  <Box
                    className={'markdown-body'}>
              {children}
              </Box>
            </Box>
            </Box>
            </Box>
          </BorderBox>
        </BorderBox>
  )
}
