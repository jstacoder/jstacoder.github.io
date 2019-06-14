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
import { spacing, typography, border } from 'styled-system'
import styled from 'styled-components'
import { Box, Flex } from '@primer/components'

import { Row, Column as Col, Container } from 'styled-bootstrap-components'

const ContainerLg = styled(Container)`
  ${spacing};
  ${typography};
`

const Column = styled(Col)`
  ${spacing};
  ${border};
`

function IndexPage() {
  const { style, theme } = useThemeContext()
  const { layout } = useSiteMetadata()
  return (
    <Layout>
      <SEO />
      {layout === 'stacked' ? (
        <ContainerLg py={6} px={3} textAlign={'center'}>
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
        </ContainerLg>
      ) : (
        <Flex
          display={{ md: 'flex' }}
          border={{ md: style === 'dark' && 'bottom' }}
        >
          <Flex.Item
            alignSelf={'stretch'}
            bg={`${
              style === 'dark' ? theme.colors.grayDark : theme.colors.white
            }`}
            border={{ md: 'right' }}
            borderColor={`${style !== 'dark' && theme.colors.gray}`}
          >
            <Column md={5} lg={4} xl={3} px={[4, 6, 7]} py={6}>
              <MastHead metaData={true} />
            </Column>
          </Flex.Item>
          <Column
            md={7}
            lg={8}
            xl={9}
            px={[4, 7]}
            py={6}
            borderTop={theme.border}
            bg={`${style === 'dark' ? '#2f363d' : '#fafbfc'}`}
          >
            <Box mx={'auto'} className={`${style}`} maxWidth={'900px'}>
              <Projects />
              <Interests />
              <Thoughts />
            </Box>
          </Column>
        </Flex>
      )}
    </Layout>
  )
}

export default IndexPage
