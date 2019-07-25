import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import PostCard from './postCard'
import { Heading, Flex, Text } from '@primer/components'
import { ThemeContext } from '../theme-context'

const Thoughts = () => {
  const {
    state: { style },
  } = useContext(ThemeContext)
  const {
    allMdx: { posts },
    allMarkdownRemark: { edges },
  } = useStaticQuery(
    graphql`
      query {
        allMdx(filter: { frontmatter: { title: { ne: "" } } }) {
          posts: edges {
            post: node {
              fields {
                slug
              }
              frontmatter {
                title
                name
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
  console.log(posts)
  return edges.length > 0 ? (
    <>
      <Heading as={'h2'} color={style === 'dark' ? 'white' : null}>
        My Thoughts
      </Heading>
      <Text
        as={'p'}
        fontSize={4}
        mb={4}
        color={style === 'dark' ? 'white' : 'gray.4'}
      >
        Articles I've written.
      </Text>
      <Flex
        display={[null, 'flex']}
        mb={4}
        ml={'-8px'}
        mr={'-8px'}
        flexWrap={'wrap'}
      >
        {/* {edges.map((edge, index) => (
          <Flex.Item mx={2} mb={3} flex={1} key={index}>
            <PostCard post={edge.node} />
          </Flex.Item>
        ))} */}
        {posts.map(({ post }, index) => (
          <Flex.Item mx={2} mb={3} flex={1} key={index}>
            <PostCard post={post} />
          </Flex.Item>
        ))}
      </Flex>
    </>
  ) : null
}

export default Thoughts
