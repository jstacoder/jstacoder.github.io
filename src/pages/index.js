import React, { useContext } from 'react'
import '../components/Toggle.css'

import Layout from '../components/layout'
import useThemeContext from '../hooks/themeContext'
import MastHead from '../components/mastHead'
import Projects from '../components/projects'
import Interests from '../components/interests'
import Thoughts from '../components/thoughts'
import SEO from '../components/seo'
import useSiteMetadata from '../hooks/siteMetaData'
import { mediaQuerys } from '../theme-context'
import { border, color, space, flex } from 'styled-system'
import { px } from 'styled-components-spacing'
import { Box, BorderBox } from '@primer/components'
import styled from 'styled-components'

import { Col } from 'react-flexa'

const BoxCol = styled(Col)`
  ${color};
  ${space};
  ${border};
  ${flex};
`

const BorderTop = styled(Col)`
  ${color};
  ${space};
  border: ${props => props.theme.border};
  ${mediaQuerys.greaterThan('sm')`
    border-top: 0px;
  `}

  ${mediaQuerys.greaterThan('md')`
      ${px(7)};
   `}
`

function IndexPage() {
  const { style, theme } = useThemeContext()
  const { layout } = useSiteMetadata()
  const {
    colors: { grayDark, white },
  } = theme
  return (
    <Layout>
      <SEO />
      {layout === 'stacked' ? (
        <div className="container-lg py-6 p-responsive text-center">
          <MastHead metaData={true} />
          <Box my={6}>
            <Projects />
          </Box>
          <Box my={6}>
            <Interests />
          </Box>
          <Box my={6}>
            <Thoughts />
          </Box>
        </div>
      ) : (
        <BorderBox
          display={[null, null, 'flex']}
          border={0}
          borderBottom={[null, null, style !== 'dark' ? 1 : 0]}
        >
          <BorderBox
            alignSelf={'stretch'}
            bg={style === 'dark' ? 'gray.9' : 'white'}
            borderColor={style !== 'dark' ? 'gray.1' : ''}
            borderRight={style !== 'dark' ? 1 : 0}
            border={0}
            px={[4, 4, 6, 7]}
            py={6}
            width={{ sm: 5 / 12, md: 4 / 12, lg: 3 / 12 }}
          >
            <MastHead metaData={true} />
          </BorderBox>
          <BorderBox
            width={{ sm: 7 / 12, md: 8 / 12, lg: 9 / 12 }}
            px={{ sm: 4, md: 4, lg: 7 }}
            borderTop={{ sm: 1, md: 1, lg: 0 }}
            bg={style === 'dark' ? 'gray.8' : 'gray.1'}
            py={6}
          >
            <Box mx={'auto'} maxWidth={900}>
              <Projects />
              <Interests />
              <Thoughts />
            </Box>
          </BorderBox>
        </BorderBox>
      )}
    </Layout>
  )
}

export default IndexPage
