import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Col } from 'reactstrap'

import TopicCard from 'components/topicCard'
import { ThemeContext } from '../theme-context'

function Topics() {
  const {
    state: { style },
  } = useContext(ThemeContext)
  // language=GraphQL
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
  const topics = edges[0].node.topics
  return (
    <>
      <h2 className={style === 'dark' ? 'text-white' : ''}>My Interests</h2>
      <p className={`f4 mb-4 ${style === 'dark' ? 'text-white' : 'text-gray'}`}>
        Topics that I am currently working to learn more about.
      </p>
      <div className="d-sm-flex flex-wrap gutter-condensed mb-4">
        {topics.map((topic, i) => (
          <Col sm={6} md={12} lg={6} xl={4} className={'mb-3'} key={i}>
            <TopicCard topic={topic} />
          </Col>
        ))}
      </div>
    </>
  )
}

export default Topics
