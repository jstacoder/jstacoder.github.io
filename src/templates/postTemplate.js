import React, { useContext } from 'react'
import { Link, graphql } from 'gatsby'
import Octicon, { ChevronLeft } from '@githubprimer/octicons-react'
import Layout from 'components/layout'
import MastHead from 'components/mastHead'
import useSiteMetadata from '../hooks/siteMetaData'
import { ThemeContext } from '../theme-context'
import { formatePostDate } from 'components/postCard'
import { Container, Row, Col } from 'styled-bootstrap-components'
import { p, py, mt, mr, mb, px } from 'styled-components-spacing'
import styled from 'styled-components'
import '../scss/prisim-dark.scss'
// import { Flex, FlexItem } from 'styled-flex-components'

const ProjectContainer = styled(Container)`
  &&& {
    text-align: center;
  }
  ${py(6)}
  ${p('responsive')}
`

export default ({ data }) => {
  const {
    state: { style },
  } = useContext(ThemeContext)
  const { layout } = useSiteMetadata()
  const post = data.markdownRemark
  return (
    <Layout>
      {layout === 'stacked' ? (
        <ProjectContainer>
          <MastHead metaData={false} />
          <div className="container-md f4 text-left border rounded-2 bg-white p-3 p-sm-5 mt-6">
            <p className="f5">
              <span
                className="d-flex flex-items-center"
                style={{ color: '#0366d6' }}
              >
                <Octicon
                  icon={ChevronLeft}
                  size={16}
                  verticalAlign="middle"
                  ariaLabel="Home"
                  className="mr-2"
                />
                <Link to="/">Home</Link>
              </span>
            </p>
            <h1 className="f00-light lh-condensed">{post.frontmatter.title}</h1>
            <p
              className={`mb-5 ${
                style === 'dark' ? 'text-white' : 'text-gray'
              }`}
            >
              Published
            </p>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </ProjectContainer>
      ) : (
        <div
          className={`d-md-flex ${style !== 'dark' ? 'border-md-bottom' : ''}`}
        >
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
              <div
                className={`f4 ${style === 'dark' ? 'text-white' : ''} mb-6`}
              >
                <div className={`f4 ${style === 'dark' && 'text-white'}`}>
                  <p className="f5">
                    <span
                      className="d-flex flex-items-center"
                      style={{ color: '#0366d6' }}
                    >
                      <Link
                        to="/"
                        className={`d-flex flex-items-center ${style ===
                          'dark' && 'text-white'}`}
                      >
                        <Octicon
                          icon={ChevronLeft}
                          size={16}
                          verticalAlign="middle"
                          ariaLabel="Home"
                          className="mr-2"
                        />
                        Home
                      </Link>
                    </span>
                  </p>
                  <h1 className="f00-light lh-condensed">
                    {post.frontmatter.title}
                  </h1>
                  <p
                    className={`${
                      style === 'dark' ? 'text-white' : 'text-gray'
                    } mb-5`}
                  >
                    Published {formatePostDate(`${post.fields.postDate}`)}
                  </p>
                  <div dangerouslySetInnerHTML={{ __html: post.html }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      timeToRead
      fields {
        postDate
        slug
      }
    }
  }
`
