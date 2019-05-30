import React, { useContext } from 'react'
import 'components/Toggle.css'

import Layout from 'components/layout'
import { ThemeContext } from '../theme-context'
import MastHead from 'components/mastHead'
import Projects from 'components/projects'
import Interests from 'components/interests'
import Thoughts from 'components/thoughts'
import SEO from 'components/seo'
import useSiteMetadata from '../hooks/siteMetaData'
import { my, py } from 'styled-components-spacing'
import styled from 'styled-components'

import { Row, Col, Container } from 'styled-bootstrap'

const My6Div = styled.div`
  ${my(6)}
`

function IndexPage() {
  const {
    state: { style },
  } = useContext(ThemeContext)
  const { layout } = useSiteMetadata()
  return (
    <Layout>
      <SEO />
      {layout === 'stacked' ? (
        <div className="container-lg py-6 p-responsive text-center">
          <MastHead metaData={true} />
          <My6Div>
            <Projects />
          </My6Div>
          <My6Div>
            <Interests />
          </My6Div>
          <My6Div>
            <Thoughts />
          </My6Div>
        </div>
      ) : (
        <div className={`d-md-flex ${style !== 'dark' && 'border-md-bottom'}`}>
          <div
            className={`flex-self-stretch ${
              style === 'dark'
                ? 'bg-gray-dark'
                : 'border-md-right border-gray-light bg-white'
            } col-md-5 col-lg-4 col-xl-3 px-4 px-md-6 px-lg-7 py-6`}
          >
            <MastHead metaData={true} />
          </div>
          <div
            className="col-md-7 col-lg-8 col-xl-9 px-4 py-6 px-lg-7 border-top border-md-top-0"
            style={{
              backgroundColor: style === 'dark' ? '#2f363d' : '#fafbfc',
            }}
          >
            <div className="mx-auto" style={{ maxWidth: '900px' }}>
              <Projects />
              <Interests />
              <Thoughts />
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default IndexPage
