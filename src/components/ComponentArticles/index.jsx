import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import PostCard from '../postCard'
import { Heading, Flex, Text, Box } from '@primer/components'
import useThemeContext from '../../hooks/themeContext'

const ComponentArticles = () => {
  const {
    allMdx: { posts },    
  } = useStaticQuery(
    graphql`
      query {
        allMdx(filter: { frontmatter: { menu: { eq: "components" } } }) {
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
      }
    `
  )
  console.log(posts)
  return posts.length > 0 ? (
    <Box mt={4}>
      <Heading as={'h2'} color={'text'}>
        My Components 
      </Heading>
      <Text
        as={'p'}
        fontSize={4}
        mb={4}
        color={'darkText'}
      >
        React components I've written.
      </Text>
      <Flex
        display={[null, 'flex']}
        mb={4}
        my={'-8px'}
        flexWrap={'wrap'}
      >     
        {posts.map(({ post }, index) => (
          <Flex.Item mx={2} mb={3} flex={1} key={index}>
            <PostCard post={post} />
          </Flex.Item>
        ))}
      </Flex>
    </Box>
  ) : null
}

export default ComponentArticles
