import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import TopicCard from './topicCard'
import { Heading, Text, Flex } from '@primer/components'
import useThemeContext from '../hooks/themeContext'

function Topics() {
  const {
    style,
    theme: {
      colors: { lightText, darkText },
    },
  } = useThemeContext()
  const {
    allDataYaml: { edges },
  } = useStaticQuery(
    graphql`
      query {
        allDataYaml {
          edges {
            node {
              topics {
                name
                web_url
                image_url
              }
            }
          }
        }
      }
    `
  )
  const topics = edges.filter(edge => edge.node.topics)[0].node.topics
  return (
    <>
      <Heading as={'h2'} ml={[3, 2, null]} color={lightText}>
        My Interests
      </Heading>
      <Text as={'p'} fontSize={4} mb={4} ml={[3, 2, null]} color={darkText}>
        Topics that I am currently working to learn more about.
      </Text>
      <Flex
        display={[null, 'flex']}
        flexWrap={'wrap'}
        ml={'-8px'}
        mr={'-8px'}
        mb={4}
      >
        {topics.map((topic, i) => (
          <Flex.Item
            key={i}
            flex={[null, 1 / 2, 1, 1 / 2, 3 / 4]}
            mb={3}
            mx={2}
          >
            <TopicCard topic={topic} />
          </Flex.Item>
        ))}
      </Flex>
    </>
  )
}

export default Topics
