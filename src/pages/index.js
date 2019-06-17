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
import { colors, space } from 'styled-system'
import { my, py, px } from 'styled-components-spacing'
import {
  Box,
  BorderBox,
  Flex,
  StyledOcticon,
  Heading,
  Text,
  Link,
  BaseStyles,
} from '@primer/components'
import styled from 'styled-components'

import { Row, Col } from 'react-flexa'

const BorderRight = styled(Col)`
  ${colors};
  ${space};
  border-color: #eaecef;
  ${px(4)};
  
  
  ${mediaQuerys.greaterThan('md')`
     ${px(6)};
  `}
  
  ${mediaQuerys.greaterThan('lg')`
     ${px(7)};
  `}
  
  ${mediaQuerys.greaterThan('md')`
     border-right: 1px solid;
  `}
`

const BorderTop = styled(Col)`
  background-color: ${props =>
    props.themeStyle === 'dark' ? '#2f363d' : '#fafbfc'};
  ${colors};
  ${space};
  border: ${props => props.theme.border};
  ${mediaQuerys.greaterThan('md')`
    border-top: 0px;
  `}

  ${mediaQuerys.greaterThan('lg')`
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
        <Col display={{ md: 'flex' }}>
          <BorderRight
            elementType={'div'}
            alignSelf={'stretch'}
            bg={style === 'dark' ? grayDark : white}
            sm={5}
            md={4}
            lg={3}
            py={4}
          >
            <MastHead metaData={true} />
          </BorderRight>
          <BorderTop sm={7} md={8} lg={9} px={4} py={6} themeStyle={style}>
            <Box mx={'auto'} maxWidth={'900px'} className={style}>
              <Projects />
              <Interests />
              <Thoughts />
            </Box>
          </BorderTop>
        </Col>
      )}
    </Layout>
  )
}

export default IndexPage
