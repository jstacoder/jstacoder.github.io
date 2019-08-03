import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import Octicon, { ChevronLeft } from '@primer/octicons-react'
import Layout from 'components/layout'
import MastHead from 'components/mastHead'
import {
  Box,
  BorderBox,
  Text,
  Heading,
  Flex,
  StyledOcticon,
  BaseStyles,
  Link,
} from '@primer/components'
import useSiteMetadata from '../../hooks/siteMetaData'
import { formatePostDate } from 'components/postCard'
import { Container, Row, Col } from 'styled-bootstrap-components'
import { space } from 'styled-system'
import { p, py, mt, mr, mb, px } from 'styled-components-spacing'
import styled, { createGlobalStyle } from 'styled-components'
import 'scss/prisim-dark.scss'
import './postTemplate.scss'
import useThemeContext from '../../hooks/themeContext'

// language=STYLED_COMPONENTS
const GlobalStyle = createGlobalStyle`
  .markdown-body blockquote {
    border-left: 5px solid grey;
    padding-left: 2em;
    
    > p {
      color: ${props => (props.style === 'dark' ? 'gainsboro' : 'grey')};
      max-width: 600px;
    }
    
    span token.function {
      color: blue;
    }
  }
  ol,ul {
    padding-left: 25px;
  }
`

const ProjectContainer = styled(Container)`
  &&& {
    text-align: center;
  }
  ${py(6)};
  ${p(3)};
`

export default ({ data }) => {
  const { style } = useThemeContext()
  const { layout } = useSiteMetadata()
  const post = data.markdownRemark
  return (
    <Layout>
      <GlobalStyle style={style} />
      <BaseStyles />
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
              className={`mb-1 ${
                style === 'dark' ? 'text-white' : 'text-gray'
              }`}
            >
              Published
            </p>
            <p
              className={`mb-5 ${
                style === 'dark' ? 'text-white' : 'text-gray'
              }`}
            >
              <small>{post.timeToRead} min read</small>
            </p>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </ProjectContainer>
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
            width={[null, 5 / 12, 4 / 12, 3 / 12]}
          >
            <MastHead metaData={true} />
          </BorderBox>
          <BorderBox
            width={[null, 7 / 12, 8 / 12, 9 / 12]}
            px={[null, 4, 4, 7]}
            borderTop={[null, 1, 1, 0]}
            bg={style === 'dark' ? 'gray.8' : 'gray.1'}
            py={6}
          >
            <Box mx={'auto'} maxWidth={900}>
              <Box
                fontSize={4}
                color={style === 'dark' ? 'white' : null}
                mb={6}
              >
                <Box fontSize={4} color={style === 'dark' ? 'white' : null}>
                  <Text fontSize={5}>
                    <Box
                      as={'span'}
                      display={'flex'}
                      alignItems={'center'}
                      color={'blue.5'}
                    >
                      <Link
                        as={GatsbyLink}
                        to="/"
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
                  <Heading fontSize={40} fontWeight={300} lineHeight={1.25}>
                    {post.frontmatter.title}
                  </Heading>
                  <Text
                    as={'p'}
                    mb={1}
                    color={`${style === 'dark' ? 'white' : 'gray'}`}
                  >
                    Published {formatePostDate(`${post.fields.postDate}`)}
                  </Text>
                  <Text
                    as={'p'}
                    mb={5}
                    color={`${style === 'dark' ? 'white' : 'gray'}`}
                  >
                    <small>{post.timeToRead} min read</small>
                  </Text>
                  <Box
                    className={'markdown-body'}
                    dangerouslySetInnerHTML={{ __html: post.html }}
                  />
                </Box>
              </Box>
            </Box>
          </BorderBox>
        </BorderBox>
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
