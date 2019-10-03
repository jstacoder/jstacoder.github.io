import React from 'react'
import '../components/Toggle.css'

import Layout from '../components/layout'
import useThemeContext from '../hooks/themeContext'
import MastHead from '../components/mastHead'
import Projects from '../components/projects'
import Interests from '../components/interests'
import Thoughts from '../components/thoughts'
import useSiteMetadata from '../hooks/siteMetaData'
import { Box, BorderBox, Fixed } from '@primer/components'
import { useDocs, useMenus } from 'docz'
import { useAuth } from '../hooks/authContext'
import SEO from '../components/seo'

function IndexPage() {
  const { style } = useThemeContext()
  const { layout } = useSiteMetadata()
  const docs = useDocs()
  const menus = useMenus()

  console.log(docs, menus)
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
          width={'100'}
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
            width={[null, null, 5 / 12, 4 / 12, 3 / 12]}
          >
            <Box as={Fixed} top={50} left={75}>
              <MastHead metaData={true} />
            </Box>
          </BorderBox>
          <BorderBox
            width={[null, null, 7 / 12, 8 / 12, 9 / 12]}
            px={[null, 4, 4, 7]}
            border={0}
            borderTop={[1, 1, 0, 0]}
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
