/** @jsx jsx */
/* eslint-disable prettier/prettier */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import PostCard from './postCard'
import { Heading, Flex, Text } from '@primer/components'
import useThemeContext from '../hooks/themeContext'

const Thoughts = () => {
  const {
    style,
    theme: {
      colors: { lightText, darkText },
    },
  } = useThemeContext()
  const {
    allMdx: { posts },
    allMarkdownRemark: { edges },
  } = useStaticQuery(
    graphql`
      query {
        allMdx(
          sort: { fields: fields___slug, order: ASC }
          filter: { frontmatter: { title: { ne: "" } } }
        ) {
          posts: edges {
            post: node {
              fields {
                slug
              }
              frontmatter {
                title
                name
                draft
              }
            }
          }
        }
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
  const isProduction = process.env.BUILD_STAGE !== 'develop'
  return edges.length > 0 ? (
    <Fragment>
      <Heading as={'h2'} sx={{ color: lightText }}>
        My Thoughts
      </Heading>
      <Text as={'p'} fontSize={4} mb={4} color={darkText}>
        Articles I've written.
      </Text>
      <Flex display={[null, 'flex']} mb={4} my={'-8px'} flexWrap={'wrap'}>
        {posts
          .filter(({ post }) => (isProduction ? !post.frontmatter.draft : true))
          .map(({ post }, index) => (
            <Flex.Item mx={2} mb={3} flex={1} key={index}>
              <PostCard isProduction={isProduction} post={post} />
            </Flex.Item>
          ))}
      </Flex>
    </Fragment>
  ) : null
}

export default Thoughts
