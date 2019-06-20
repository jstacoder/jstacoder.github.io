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
          borderBottom={[0, null, style === 'dark' ? 1 : 0]}
        >
          <BoxCol
            xs={12}
            sm={12}
            md={4}
            lg={3}
            alignSelf={'stretch'}
            px={[2, 7, 6, 4]}
            py={[6]}
            bg={style === 'dark' ? theme.colors.darkGray : 'white'}
            borderRight={[0, 0, 1]}
          >
            <MastHead metaData={true} />
          </BoxCol>
          <BorderTop
            bg={style === 'dark' ? 'gray.9' : 'white'}
            sm={12}
            md={8}
            lg={9}
            px={[4, 6, 7]}
            py={6}
            themeStyle={style}
          >
            <Box mx={'auto'} maxWidth={'900px'} className={style}>
              <Projects />
              <Interests />
              <Thoughts />
            </Box>
          </BorderTop>
        </BorderBox>
      )}
    </Layout>
  )
}

export default IndexPage
