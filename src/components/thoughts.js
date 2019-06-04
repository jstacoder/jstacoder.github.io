import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import PostCard from './postCard'
import styled from 'styled-components'
import useTheme from '../hooks/useTheme'
import { Col } from 'styled-bootstrap-grid'

const DarkWhiteHeader = styled.h2`
  color: ${props => (props.dark ? props.theme.colors.white : 'inherit')};
`

const BaseDarkWhiteLightGreyText = styled.p`
  color: ${({ theme, dark }) =>
    dark ? theme.colors.white : theme.colors.gray};
`

const DarkWhiteLightGreyText = ({ className, ...props }) => (
  <BaseDarkWhiteLightGreyText {...props} className={`${className} f4 mb-4`} />
)

function Thoughts() {
  const {
    state: { style },
  } = useTheme()
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          limit: 6
          filter: { frontmatter: { published: { eq: true } } }
        ) {
          edges {
            node {
              frontmatter {
                title
                published
              }
              fields {
                slug
              }
              html
            }
          }
        }
      }
    `
  )
  const darkStyle = style === 'dark'
  return edges.length > 0 ? (
    <React.Fragment>
      <DarkWhiteHeader dark={darkStyle}>My Thoughts</DarkWhiteHeader>
      <DarkWhiteLightGreyText dark={darkStyle}>
        Articles I've written.
      </DarkWhiteLightGreyText>
      <div className="d-sm-flex flex-wrap gutter-condensed mb-4">
        {edges.map((edge, index) => (
          <Col sm={6} md={12} lg={6} xl={4} className={'mb-3'} key={index}>
            <PostCard post={edge.node} />
          </Col>
        ))}
      </div>
    </React.Fragment>
  ) : null
}

export default Thoughts
